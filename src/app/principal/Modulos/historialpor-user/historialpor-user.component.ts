import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Historias } from '../../Models/Historias';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../../Servicios/users.service';

@Component({
  selector: 'app-historialpor-user',
  templateUrl: './historialpor-user.component.html',
  styleUrls: ['./historialpor-user.component.css']
})
export class HistorialporUserComponent implements OnInit {
  constructor(private usersServices: UsersService ) {

  }
  ngOnInit(): void {
    this.ListaUsuarios();
  }
  displayedColumns: string[] = ['usuario', 'table', 'idAfectado','fechaCreacion','descripcion'];
  dataSource!: MatTableDataSource<Historias>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() user!: string;




  ListaUsuarios() {
    this.usersServices.ListaHistorias(this.user).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);  
        this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al obtener Datos', error);
      }
    );
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

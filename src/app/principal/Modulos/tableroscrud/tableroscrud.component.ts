import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tableros } from '../../Models/Tableros';
import { CatalogosService } from '../../Servicios/catalogos.service';

@Component({
  selector: 'app-tableroscrud',
  templateUrl: './tableroscrud.component.html',
  styleUrls: ['./tableroscrud.component.css']
})
export class TableroscrudComponent  implements OnInit{
  constructor(private catalogoServicie: CatalogosService) {

  }
  ngOnInit(): void {
this.cargarTableros();
  }
  displayedColumns: string[] = ['nombretablero', 'nombredescarga', 'pixelesAlto', 'acciones'];
  dataSource!: MatTableDataSource<Tableros>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(componente: string, datos: Tableros): void {
    if (componente == "Acciones") {


    }
  }


  cargarTableros(): void {
    this.catalogoServicie.Tableros().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al cargar los items:', error);
      }
    );
  }

}
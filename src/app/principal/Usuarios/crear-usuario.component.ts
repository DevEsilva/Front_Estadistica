import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../Servicios/catalogos.service';
import { Datos } from '../Models/Datos';
import { AccionesComponent } from '../Modulos/acciones/acciones.component';
import { AccionesService } from '../Servicios/acciones.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit{
  
  activeButton!: string; // Índice del botón activo

  toggleColorIcono(index: string) {
    // Cambia el índice del botón activo
    this.activeButton = this.activeButton === index ? "" : index;
  }


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(public dialog: MatDialog,private catalogos: CatalogosService, private accionesServices :AccionesService) {
  }

  



  selection = new SelectionModel<Datos>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }



  ngOnInit(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Establece la fecha de hoy como valor predeterminado
    this.range.setValue({
      start: today,
      end: today
    });
    this.ListaUsuarios();

  }
  

  openDialog(componente: string, datos: Datos): void {
   if (componente == "Acciones") {

    this.accionesServices.setDocumento(datos); // Establece el valor en el servicio

      this.dialog.open(AccionesComponent, {
         
        width: '800px', // Ajusta el tamaño del modal
      });
    } 
   /* if (componente == "FormaPago") {
      this.dialog.open(FormaPagoComponent, {
        width: '800px', // Ajusta el tamaño del modal
      });
    } */
  }


  displayedColumns: string[] = ['nombre', 'usuario', 'rol','establecimiento','acciones'];
  dataSource!: MatTableDataSource<Datos>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ListaUsuarios() {
    this.catalogos.Usuarios().subscribe(
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

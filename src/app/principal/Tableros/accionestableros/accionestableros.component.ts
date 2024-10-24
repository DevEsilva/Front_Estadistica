import { ChangeDetectorRef, Component } from '@angular/core';
import { Tableros } from '../../Models/Tableros';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../Servicios/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CatalogosService } from '../../Servicios/catalogos.service';
import { Router } from '@angular/router';
import { AccionesService } from '../../Servicios/acciones.service';
import { ConfirmDialogComponent } from '../../Modulos/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-accionestableros',
  templateUrl: './accionestableros.component.html',
  styleUrls: ['./accionestableros.component.css']
})
export class AccionestablerosComponent {

  constructor(private toastr: ToastrService, private usersServices: UsersService, private dialog: MatDialog, private cdr: ChangeDetectorRef, public dialogRef: MatDialogRef<AccionestablerosComponent>, private accionesService: AccionesService, private catalogos: CatalogosService, private router: Router
  ) {

  }
  public nombredescarga!: string;
  public nombretablero!: string;
  public pixelesAlto!: string;
  public urldescarga: string | undefined;
  public urlpwb: string | undefined;
  public activo!: number|0;


  public btnHistorial = false;
  public btnCorreo = false;

  datosEditados: Tableros = {
    nombredescarga: '',
    nombretablero: '',
    pixelesAlto: '',
    urldescarga: '',
    urlpwb: '',
    activo: 0
  };
  ngAfterViewChecked(): void {

    this.cdr.detectChanges();
  }


  tableros: Tableros[] = [];


  ngOnInit(): void {

    this.nombredescarga = this.accionesService.getTablero().nombredescarga;
    this.nombretablero = this.accionesService.getTablero().nombretablero;
    this.pixelesAlto = this.accionesService.getTablero().pixelesAlto;
    this.urldescarga = this.accionesService.getTablero().urldescarga;
    this.urlpwb = this.accionesService.getTablero().urlpwb;
    this.activo = this.accionesService.getTablero().activo;
  }

  ActivarBtnHistorial() {
    this.btnHistorial =   !this.btnHistorial;
    if(this.btnHistorial){this.btnCorreo = false;}
    
  }

  ActivarBtnCorreo() {
    this.btnCorreo =   !this.btnCorreo;
    if(this.btnCorreo){this.btnHistorial = false;}

  }



  TablerosList() {
    this.catalogos.Tableros().subscribe(
      (data) => {
        this.tableros = data;
       // this.establecimiento = this.obtenerCodigoPorDescripcionEstablecimiento(this.accionesService.getDocumento().establecimiento);

      },
      (error) => {
        console.error('Error al obtener Tableros', error);
      }
    );
  }


  close(): void {
    this.dialogRef.close();
  }


  



  actualizar() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.datosEditados.activo = this.activo;
        this.datosEditados.nombredescarga = this.nombredescarga || "";
        this.datosEditados.nombretablero = this.nombretablero || "";
        this.datosEditados.pixelesAlto = this.pixelesAlto || "";
        this.datosEditados.urldescarga = this.urldescarga || "";
        this.datosEditados.urlpwb = this.urlpwb || "";


        this.catalogos.EdicionTablero(this.datosEditados).subscribe(
          (data) => {
            this.toastr.success(data.mensaje, data.descripcion, {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.close();
            this.catalogos.refreshData();
          },
          (error) => {
            this.toastr.error(error.mensaje, error.descripcion, {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
          }
        );

      }
    });

  }
}

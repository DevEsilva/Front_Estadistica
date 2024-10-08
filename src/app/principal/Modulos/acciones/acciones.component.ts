import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccionesService } from '../../Servicios/acciones.service';
import { CatalogosService } from '../../Servicios/catalogos.service';
import { Cargos } from '../../Models/Cargos';
import { Establecimientos } from '../../Models/Establecimientos';
import { Roles } from '../../Models/Roles';
import { Sexos } from '../../Models/Sexos';
import { Router } from '@angular/router';
import { UsersService } from '../../Servicios/users.service';
import { EditUsuario } from '../../Models/EditUsuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit, AfterViewChecked {

  constructor(private toastr: ToastrService, private usersServices: UsersService, private cdr: ChangeDetectorRef, public dialogRef: MatDialogRef<AccionesComponent>, private accionesService: AccionesService, private catalogos: CatalogosService, private router: Router
  ) {

  }
  public nombre!: string;
  public usuario!: string;
  public celular!: string;
  public rol: string | undefined;
  public cargo: string | undefined;
  public establecimiento!: string | undefined;
  public sexo: string | undefined;
  public correo!: string;


  datosEditados: EditUsuario = {
    nombre: '',
    establecimiento: '',
    email: '',
    usuario: '',
    sexo: '',
    cargo: '',
    rol: '',
    celular: ''
  };
  ngAfterViewChecked(): void {
 
    this.cdr.detectChanges();
  }


  cargos: Cargos[] = [];
  establecimientos: Establecimientos[] = [];
  roles: Roles[] = [];
  sexos: Sexos[] = [];


  ngOnInit(): void {
    this.Cargos();
    this.Establecimientos();
    this.Roles();
    this.Sexos();
    this.nombre = this.accionesService.getDocumento().nombre;
    this.usuario = this.accionesService.getDocumento().usuario;
    this.correo = this.accionesService.getDocumento().email;
    this.celular = this.accionesService.getDocumento().celular;

  }


  Cargos() {
    this.catalogos.Cargos().subscribe(
      (data) => {
        this.cargos = data;
        this.cargo = this.obtenerCodigoPorDescripcion(this.accionesService.getDocumento().cargo);

      },
      (error) => {
        console.error('Error al obtener Cargos', error);
      }
    );
  }

  Roles() {
    this.roles = [
      { codigo: 'admin', descripcion: 'ADMINISTRADOR' },
      { codigo: 'user', descripcion: 'USUARIO' }
    ];
    this.rol = this.obtenerCodigoPorDescripcionRol(this.accionesService.getDocumento().rol);

  }

  Establecimientos() {
    this.catalogos.Establecimientos().subscribe(
      (data) => {
        this.establecimientos = data;
        this.establecimiento = this.obtenerCodigoPorDescripcionEstablecimiento(this.accionesService.getDocumento().establecimiento);

      },
      (error) => {
        console.error('Error al obtener establecimientos', error);
      }
    );
  }

  Sexos() {
    this.catalogos.Sexos().subscribe(
      (data) => {
        this.sexos = data;
        this.sexo = this.obtenerCodigoPorDescripcionSexo(this.accionesService.getDocumento().sexo);

      },
      (error) => {
        console.error('Error al obtener Sexos', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }


  obtenerCodigoPorDescripcion(descripcion: string): string | undefined {

    const cargo = this.cargos.find(c => c.descripcion === descripcion);
    return cargo ? cargo.codigo : undefined;
  }

  obtenerCodigoPorDescripcionSexo(descripcion: string): string | undefined {

    const sexo = this.sexos.find(c => c.descripcion === descripcion);
    return sexo ? sexo.codigo : undefined;
  }

  obtenerCodigoPorDescripcionEstablecimiento(descripcion: string): string | undefined {

    const establecimiento = this.establecimientos.find(c => c.establecimiento === descripcion);
    return establecimiento ? establecimiento.codigo : undefined;
  }

  onChangeEstablecimiento(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Asegúrate de que es un HTMLSelectElement
    const selectedValue = selectElement.value;
    this.establecimiento = selectedValue;
    console.log('Establecimiento cambiado:', this.establecimiento);
  }

  private obtenerCodigoPorDescripcionRol(descripcion: string): string | undefined {

    const rol = this.roles.find(c => c.descripcion === descripcion);
    return rol ? rol.codigo : undefined;
  }

  actualizar() {

    this.datosEditados.cargo = this.cargo || "";
    this.datosEditados.celular = this.celular || "";
    this.datosEditados.email = this.correo || "";
    this.datosEditados.establecimiento = this.establecimiento || "";
    this.datosEditados.nombre = this.nombre || "";
    this.datosEditados.rol = this.rol || "";
    this.datosEditados.sexo = this.sexo || "";
    this.datosEditados.usuario = this.usuario || "";

    console.log(this.datosEditados);


    this.usersServices.edit(this.datosEditados).subscribe(
      (data) => {
        this.toastr.success(data.mensaje, data.descripcion, {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      (error) => {
        this.toastr.error(error.mensaje, error.descripcion, {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );

    this.catalogos.refreshData();

  }
}

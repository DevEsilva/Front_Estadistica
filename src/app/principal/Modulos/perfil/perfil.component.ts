import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '../../Servicios/catalogos.service';
import { Establecimientos } from '../../Models/Establecimientos';
import { Sexos } from '../../Models/Sexos';
import { Cargos } from '../../Models/Cargos';
import { Roles } from '../../Models/Roles';
import { TokenService } from '../../Servicios/token.service';
import { AuthService } from '../../Servicios/auth.service';
import { EditUsuario } from '../../Models/EditUsuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewChecked {

  myForm: FormGroup;
  myForm2: FormGroup;
  establecimientos: Establecimientos[] = [];
  sexos: Sexos[] = [];
  cargos: Cargos[] = [];
  roles: Roles[] = [];
  isRolDisabled: boolean = true;

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

  constructor(private fb: FormBuilder, private catalogos: CatalogosService, private tokenService: TokenService, private toastr: ToastrService,private authService: AuthService) {
    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      establecimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      sexo: ['', Validators.required],
      cargo: ['', Validators.required],
      rol: ['', Validators.required],
      celular: ['', Validators.required]
    });
    this.myForm2 = this.fb.group({
      newcontrasena: ['', Validators.required],
      rnewcontrasena: ['', Validators.required],
      oldcontrasena: ['', [Validators.required]]
    });
  }
  ngAfterViewChecked(): void {

  }

  ngOnInit() {

    this.Establecimientos();
    this.Sexo();
    this.Cargo();
    this.Roles();
    this.Datos();

    if (this.tokenService.getAuthorities().length == 2) {

      this.isRolDisabled = false;
    }
  }


  onSubmit() {

this.updateDatos();
  
  }

  updateDatos() {

    this.datosEditados.cargo = this.myForm.get("cargo")?.value;
    this.datosEditados.celular = this.myForm.get("celular")?.value;
    this.datosEditados.email = this.myForm.get("correo")?.value;
    this.datosEditados.establecimiento = this.myForm.get("establecimiento")?.value;
    this.datosEditados.nombre = this.myForm.get("nombre")?.value;
    this.datosEditados.rol = this.myForm.get("rol")?.value;
    this.datosEditados.sexo = this.myForm.get("sexo")?.value;
    this.datosEditados.usuario = this.myForm.get("usuario")?.value;
    this.authService.edit(this.datosEditados).subscribe(
      data => {
        this.toastr.success(data.mensaje, data.descripcion, {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    )
  }

  Establecimientos() {
    this.catalogos.Establecimientos().subscribe(
      (data) => {
        this.establecimientos = data;
      },
      (error) => {
        console.error('Error al obtener establecimientos', error);
      }
    );
  }

  Sexo() {
    this.catalogos.Sexos().subscribe(
      (data) => {
        this.sexos = data;
      },
      (error) => {
        console.error('Error al obtener Sexos', error);
      }
    );
  }

  Cargo() {
    this.catalogos.Cargos().subscribe(
      (data) => {
        this.cargos = data;
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
  private obtenerCodigoPorDescripcionRol(descripcion: string): string | undefined {

    const rol = this.roles.find(c => c.descripcion === descripcion);
    return rol ? rol.codigo : undefined;
  }
  
  Datos() {
    this.catalogos.Datos().subscribe(
      (data) => {
        this.myForm = this.fb.group({
          nombre: data.nombre,
          usuario: data.usuario,
          rol: this.obtenerCodigoPorDescripcionRol(data.rol),
          sexo: this.obtenerCodigoPorDescripcionSexo(data.sexo),
          cargo: this.obtenerCodigoPorDescripcion(data.cargo),
          celular: data.celular,
          establecimiento: this.obtenerCodigoPorDescripcionEstablecimiento(data.establecimiento),
          correo: data.email
        });
      },
      (error) => {
        console.error('Error al obtener Datos', error);
      }
    );
  }

}

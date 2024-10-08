import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/principal/Models/LoginUsuario';
import { NuevoUsuario } from 'src/app/principal/Models/NuevoUsuario';
import { AuthService } from 'src/app/principal/Servicios/auth.service';
import { TokenService } from 'src/app/principal/Servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('visible', style({
        transform: 'translateY(0%)',
        opacity: 1
      })),
      state('hidden', style({
        display: 'none',
        transform: 'translateY(100%)',
        opacity: 0,

      })),
      transition('visible => hidden', [
        animate('0.8s')
      ]),
      transition('hidden => visible', [
        animate('0.8s')
      ]),
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0,

      })),
      transition('out => in', [
        animate('1000ms ease-in-out')
      ])
    ])

  ]
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nuevoUsuario!: NuevoUsuario;
  nombreUsuario!: string;
  correoElectronico!: string;
  nombreCompleto!: string;
  CnombreUsuario!: string;
  cpasswordValue!: string;
  rcpasswordValue!: string;
  passwordValue = '';
  roles: string[] = [];
  croles: string[] = [];
  errMsj!: string;
  hidePassword: boolean = true;
  isFormulario!: boolean;
  isVisible = 'out';
  tooltipText: string = 'Ingrese su contraseña aquí';
  isFirstDivVisible = true;
  isSecondDivVisible = false;

  isModalVisible = false;

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = 'in';
    }, 100);
    
    const token = this.tokenService.getToken();
    if (token != "") {

      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token

      if (Date.now() >= tokenPayload.exp * 1000) {
        // Token ha expirado
        // this.router.navigate(['/session-expired']);
        this.isLogged = false;
      } else {
        // Token válido
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
        this.isLogged = true; // Establecer a falso por defecto, se actualizará si el usuario tiene el rol de 'ROLE_ADMIN'

      }
    } else {
      this.router.navigate(['/session-expired']);
      this.isLogged = false;
    }
  }

  vacioLogin() {
    this.nombreUsuario = '';
    this.passwordValue = '';
  }

  vacioCreate() {
    this.correoElectronico = '';
    this.nombreCompleto = '';
    this.CnombreUsuario = '';
    this.cpasswordValue = '';
    this.rcpasswordValue = '';
  }
  toggleDivs(): void {
    this.isFirstDivVisible = !this.isFirstDivVisible;
    this.isSecondDivVisible = !this.isSecondDivVisible;
    this.vacioCreate();
    this.vacioLogin();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.passwordValue);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setEstablecimiento(data.establecimiento);
        this.tokenService.setNombre(data.nombre);
        this.tokenService.setAuthorities(data.authorities);
        this.tokenService.setAvatar(data.avatar);



        this.roles = data.authorities;
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/home']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }

  onCreate(): void {

    this.croles.push("usuario");

    this.nuevoUsuario = new NuevoUsuario(this.nombreCompleto, this.CnombreUsuario, this.correoElectronico, "Desde Web", this.cpasswordValue, this.croles);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success(this.nombreUsuario + " creado satisfactoriamente", 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.vacioCreate();
        //this.router.navigate(['/home']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }
  onLogout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}

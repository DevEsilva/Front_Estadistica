import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './principal/dash/dash.component';
import { AnemiaComponent } from './principal/Tableros/Tableros.component';
import { HomeComponent } from './principal/home/home.component';
import { ReciennacidoComponent } from './principal/reciennacido/reciennacido.component';
import { LoginComponent } from './principal/login/login.component';
import { PerfilComponent } from './principal/Modulos/perfil/perfil.component';
import { SoporteCallComponent } from './principal/Modulos/soporte-call/soporte-call.component';
import { VacunometroComponent } from './principal/vacunometro/vacunometro.component';
import { CrearUsuarioComponent } from './principal/Usuarios/crear-usuario.component';
import { ProdGuardService as guard } from './principal/guards/prod-guard.service';
import { TableroscrudComponent } from './principal/Modulos/tableroscrud/tableroscrud.component';



const routes: Routes = [
  //{ path: 'listar', component: ListaProductoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  //{ path: 'home', component: LoginComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'login', component: LoginComponent },
  { path: 'vacunometro', component: VacunometroComponent },
  { path: 'Vacunometro', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'session-expired', redirectTo: 'login' },
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'dashboard',
        component: DashComponent
      },
      {
        path: 'Tableros/:itemLabel',
        component: AnemiaComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'soporte',
        component: SoporteCallComponent
      },
      {
        path: 'usuarios',
        component: CrearUsuarioComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } 
      },
      {
        path: 'tablerosCrud',
        component: TableroscrudComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } 
      },
 
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

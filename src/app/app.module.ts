import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { DashComponent } from './principal/dash/dash.component';
import { AnemiaComponent } from './principal/Tableros/Tableros.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {NgIf, JsonPipe} from '@angular/common';
import { MatExpansionModule} from '@angular/material/expansion';

import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './principal/home/home.component';
import { HeaderHomeComponent } from './principal/home/header-home/header-home.component';
import { ReciennacidoComponent } from './principal/reciennacido/reciennacido.component';
import { LoginComponent } from './principal/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './principal/Modulos/perfil/perfil.component';
import { RecoveryAccComponent } from './principal/Modulos/recovery-acc/recovery-acc.component';
import { SoporteCallComponent } from './principal/Modulos/soporte-call/soporte-call.component';
import { interceptorProvider } from './principal/interceptors/prod-interceptor.service';
import { interceptorProviderSpinner } from './principal/interceptors/SpinnerInterceptor.service';
import { AuthService } from './principal/Servicios/auth.service';
import { VacunometroComponent } from './principal/vacunometro/vacunometro.component';
import { CrearUsuarioComponent } from './principal/Usuarios/crear-usuario.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { AccionesComponent } from './principal/Modulos/acciones/acciones.component';
import { ConfirmDialogComponent } from './principal/Modulos/confirm-dialog/confirm-dialog.component';
import { HistorialporUserComponent } from './principal/Modulos/historialpor-user/historialpor-user.component';
import { CorreoComponent } from './principal/Modulos/correo/correo.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TableroscrudComponent } from './principal/Modulos/tableroscrud/tableroscrud.component';


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    DashComponent,
    AnemiaComponent,
    HomeComponent,
    HeaderHomeComponent,
    ReciennacidoComponent,
    PerfilComponent,
    RecoveryAccComponent,
    SoporteCallComponent,
    VacunometroComponent,
    CrearUsuarioComponent,
    AccionesComponent,
    ConfirmDialogComponent,
    HistorialporUserComponent,
    CorreoComponent,
    TableroscrudComponent
  ],
  imports: [
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', preventDuplicates: true, // Evita mostrar Toastr duplicados
      closeButton: true
    }),
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    RouterModule,
    MatSelectModule,
    MatDialogModule,
    MatBadgeModule,
    NgIf,
    JsonPipe,
    MatCheckboxModule,
    MatSortModule,
    MatExpansionModule
  ],
  providers: [AuthService, interceptorProvider, interceptorProviderSpinner, { provide: MatPaginatorIntl, useValue: getPaginatorIntl() },
    { provide: MAT_DATE_FORMATS, useValue: MatNativeDateModule },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getPaginatorIntl(itemsPerPageLabel: string = 'Datos por página',
) {
 const nextPageLabel: string = 'Página siguiente',
 previousPageLabel: string = 'Página anterior',
 firstPageLabel: string = 'Primera página',
 lastPageLabel: string = 'Última página';

 const paginatorIntl = new MatPaginatorIntl();
 paginatorIntl.itemsPerPageLabel = itemsPerPageLabel;
 paginatorIntl.nextPageLabel = nextPageLabel;
 paginatorIntl.previousPageLabel = previousPageLabel;
 paginatorIntl.firstPageLabel = firstPageLabel;
 paginatorIntl.lastPageLabel = lastPageLabel;

 paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
   if (length === 0 || pageSize === 0) {
     return `0 de ${length}`;
   }
   const startIndex = page * pageSize;
   const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
   return `${startIndex + 1} - ${endIndex} de ${length}`;
 };

 return paginatorIntl;
}
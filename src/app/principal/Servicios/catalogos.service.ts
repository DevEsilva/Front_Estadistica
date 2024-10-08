import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Establecimientos } from '../Models/Establecimientos';
import { Observable } from 'rxjs';
import { Datos } from '../Models/Datos';
import { Sexos } from '../Models/Sexos';
import { Cargos } from '../Models/Cargos';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CatalogosService {
  authURL = environment.apiUrl;
  private refreshSubject = new Subject<void>(); // Sujeto para manejar el refresco

  constructor(private httpClient: HttpClient) { }

  public Establecimientos() {
    return this.httpClient.get<Establecimientos[]>(`${this.authURL}catalogos/listaEstablecimientos`);

  }

  public Datos() {
    return this.httpClient.get<Datos>(`${this.authURL}catalogos/datos`);

  }

  public Sexos() {
    return this.httpClient.get<Sexos[]>(`${this.authURL}catalogos/listaSexos`);

  }

  public Cargos() {
    return this.httpClient.get<Cargos[]>(`${this.authURL}catalogos/listaCargos`);

  }

  public Usuarios() {
    return this.httpClient.get<Datos[]>(`${this.authURL}catalogos/listaUsuarios`);

  }

  refreshData() {
    this.refreshSubject.next(); // Emitir evento para refrescar
  }
}

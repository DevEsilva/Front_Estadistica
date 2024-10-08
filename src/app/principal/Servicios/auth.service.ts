import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NuevoUsuario } from '../Models/NuevoUsuario';
import { LoginUsuario } from '../Models/LoginUsuario';
import { EditUsuario } from '../Models/EditUsuario';

import { environment } from 'src/environments/environment';
import { ContrasenaDto } from '../Models/ContrasenaDto';
import { JwtDTO } from '../Models/jwt-dto';
import { Mensaje } from '../Models/Mensaje';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL+"auth/"+ 'nuevo', nuevoUsuario);
  }

  public edit(editUsuario: EditUsuario): Observable<Mensaje> {
    return this.httpClient.post<Mensaje>(this.authURL+"auth/"+ 'editar', editUsuario);
  }

  public cambiarContra(contrasena: ContrasenaDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL+"auth/"+ 'cambiarContra', contrasena);
  }


  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL+"auth/"+ 'login', loginUsuario);
  }
  
  public datos(): Observable<EditUsuario> {
    return this.httpClient.get<EditUsuario>(this.authURL+"auth/"+ 'datos', );
  }
  public health(): Observable<string> {
    return this.httpClient.get<string>(this.authURL+"auth/"+ 'health', );
  }

  

}

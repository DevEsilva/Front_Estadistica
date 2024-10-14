import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditUsuario } from '../Models/EditUsuario';
import { Mensaje } from '../Models/Mensaje';
import { Observable } from 'rxjs';
import { Historias } from '../Models/Historias';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  authURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  
  public edit(editUsuario: EditUsuario): Observable<Mensaje> {
    return this.httpClient.post<Mensaje>(this.authURL+"Users/"+ 'editar', editUsuario);
  }


  public ListaHistorias(user: string) {
    return this.httpClient.get<Historias[]>(`${this.authURL}Users/Historia`+"/"+user);

  }
}

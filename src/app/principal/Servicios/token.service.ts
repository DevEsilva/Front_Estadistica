import { Injectable } from '@angular/core';
import { Avatar } from '../Models/Avatar';


const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ESTABLECIMIENTO = "Establecimiento";
const NOMBRE = "Nombre";
const AVATAR = "Avatar";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setAvatar(avatar: Avatar): void {
    window.sessionStorage.removeItem(AVATAR);
    window.sessionStorage.setItem(AVATAR, JSON.stringify(avatar));
  }

  public getAvatar(): Avatar {
    const avatarString = sessionStorage.getItem(AVATAR);
    return avatarString ? JSON.parse(avatarString) : null;
  }


  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setNombre(nombre: string): void {
    window.sessionStorage.removeItem(NOMBRE);
    window.sessionStorage.setItem(NOMBRE, nombre);
  }

  public getNombre(): string {
    return sessionStorage.getItem(NOMBRE)!;
  }
  public setEstablecimiento(establecimiento: string): void {
    window.sessionStorage.removeItem(ESTABLECIMIENTO);
    window.sessionStorage.setItem(ESTABLECIMIENTO, establecimiento);
  }

  public getEstablecimiento(): string {
    return sessionStorage.getItem(ESTABLECIMIENTO)!;
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}

import { Injectable } from '@angular/core';
import { Datos } from '../Models/Datos';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  private documento!: Datos;

  setDocumento(value: Datos): void {
    this.documento = value;
  }

  getDocumento(): Datos {
    return this.documento;
  }
}

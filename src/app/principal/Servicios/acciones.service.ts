import { Injectable } from '@angular/core';
import { Datos } from '../Models/Datos';
import { Tableros } from '../Models/Tableros';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  private documento!: Datos;
  private tablero!: Tableros;

  setDocumento(value: Datos): void {
    this.documento = value;
  }

  getDocumento(): Datos {
    return this.documento;
  }

  setTablero(value: Tableros): void {
    this.tablero = value;
  }

  getTablero(): Tableros {
    return this.tablero;
  }

}

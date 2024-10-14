import { EventEmitter, Injectable } from '@angular/core';
import { Tableros } from '../Models/Tableros';

@Injectable({
  providedIn: 'root'
})
export class TablerosService {
  private tablero!: string;
  tableroChanged: EventEmitter<string> = new EventEmitter();


  setTablero(tablero: string) {
    this.tablero = tablero;
    this.tableroChanged.emit(this.tablero);
  }

  getTablero(): string {
    return this.tablero;
  }
}

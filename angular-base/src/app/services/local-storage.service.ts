import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  constructor() { }

  guardarItem(clave: string, valor: any): void {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  obtenerItem(clave: string): any | null {
    const item = localStorage.getItem(clave);
    if (item != null)
      return JSON.parse(item);
    else
      return item;
  }

  eliminarItem(clave: string): void {
    localStorage.removeItem(clave);
  }
}
import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { OrderByDirection, WhereFilterOp } from '@angular/fire/firestore';
import { FireauthService } from './fireauth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private usuarioActual: any;
  private usuarioEstaLogueado: boolean = false;
  private nombreColeccion: string = 'usuarios';

  constructor(private firestoreService: FirestoreService, private fireauthService: FireauthService, private router: Router) {
    this.fireauthService.cambioEstadoAuth_Observable.subscribe(async (usuario: any) => {
      let usuarioActual = await this.fireauthService.usuarioActual_Promesa;
      if (usuario) {
        this.traerItemPorId_Promesa(usuario.uid).then((x: any) => {
          if (x && usuarioActual) {
            this.usuarioEstaLogueado = true;
            this.usuarioActual = x;
          } else {
            this.usuarioEstaLogueado = false;
            this.usuarioActual = null;
          }
        });
      }
    });
  }

  //#region Log

  get UsuarioActual() {
    return this.usuarioActual;
  }

  get UsuarioEstaLogueado() {
    return this.usuarioEstaLogueado;
  }

  cerrarSesion() {
    this.fireauthService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  //#endregion

  //#region ABM

  cargarItemConIdAsignado(item: any) {
    return this.firestoreService.guardarItemConIdAsignado(this.nombreColeccion, { ...item });
  }

  cargarItemSinIdAsignado(item: any) {
    return this.firestoreService.guardarItemSinIdAsignado(this.nombreColeccion, { ...item });
  }

  modificarItem(item: any) {
    return this.firestoreService.modificarItem(this.nombreColeccion, item);
  }

  eliminarItem(id: string) {
    return this.firestoreService.eliminarItem(this.nombreColeccion, id);
  }

  //#endregion

  //#region ASYNC

  async traerItemPorId_Promesa(id: string) {
    return await this.firestoreService.traerItemPorId_Promesa(this.nombreColeccion, id);
  }

  async traerItems() {
    return await this.firestoreService.traerItems(this.nombreColeccion);
  }

  async traerItemsOrdenados(orden: OrderByDirection, columnaOrden: string) {
    return await this.firestoreService.traerItemsOrdenados(this.nombreColeccion, orden, columnaOrden);
  }

  async traerItemsFiltrados(columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any) {
    return await this.firestoreService.traerItemsFiltrados(this.nombreColeccion, columnaBuscada, filtro, valorBuscado);
  }

  async traerItems_2_Filtros(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any) {
    return await this.firestoreService.traerItems_2_Filtros(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2);
  }

  async traerItems_3_Filtros(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any) {
    return await this.firestoreService.traerItems_3_Filtros(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2,
      columnaBuscada3, filtro3, valorBuscado3);
  }

  async traerItems_4_Filtros(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any) {
    return await this.firestoreService.traerItems_4_Filtros(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2,
      columnaBuscada3, filtro3, valorBuscado3,
      columnaBuscada4, filtro4, valorBuscado4);
  }

  async traerItems_5_Filtros(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any,
    columnaBuscada5: string, filtro5: WhereFilterOp, valorBuscado5: any) {
    return await this.firestoreService.traerItems_5_Filtros(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2,
      columnaBuscada3, filtro3, valorBuscado3,
      columnaBuscada4, filtro4, valorBuscado4,
      columnaBuscada5, filtro5, valorBuscado5);
  }

  async traerItems_ArrayContains(columnaArray: string, valorBuscado: any) {
    return await this.firestoreService.traerItems_ArrayContains(this.nombreColeccion, columnaArray, valorBuscado);
  }

  async traerItems_ArrayContainsAny(columnaArray: string, valorBuscado: any) {
    return await this.firestoreService.traerItems_ArrayContainsAny(this.nombreColeccion, columnaArray, valorBuscado);
  }

  //#endregion

  //#region OBSERVABLE

  traerItemPorId_Observable(id: string) {
    return this.firestoreService.traerItemPorId_Observable(this.nombreColeccion, id);
  }

  traerItems_Observable() {
    return this.firestoreService.traerItemsConObservable(this.nombreColeccion);
  }

  traerItemsOrdenadosConObservable(orden: OrderByDirection, columnaOrden: string) {
    return this.firestoreService.traerItemsOrdenadosConObservable(this.nombreColeccion, orden, columnaOrden);
  }

  traerItemsFiltrados_Observable(columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any) {
    return this.firestoreService.traerItemsFiltradosConObservable(this.nombreColeccion, columnaBuscada, filtro, valorBuscado);
  }

  traerItems_2_Filtros_Observable(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any) {
    return this.firestoreService.traerItems_2_FiltrosConObservable(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2);
  }

  traerItems_3_Filtros_Observable(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any) {
    return this.firestoreService.traerItems_3_FiltrosConObservable(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2,
      columnaBuscada3, filtro3, valorBuscado3);
  }

  traerItems_4_Filtros_Observable(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any) {
    return this.firestoreService.traerItems_4_FiltrosConObservable(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2,
      columnaBuscada3, filtro3, valorBuscado3,
      columnaBuscada4, filtro4, valorBuscado4);
  }

  traerItems_5_Filtros_Observable(
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any,
    columnaBuscada5: string, filtro5: WhereFilterOp, valorBuscado5: any) {
    return this.firestoreService.traerItems_5_FiltrosConObservable(this.nombreColeccion,
      columnaBuscada, filtro, valorBuscado,
      columnaBuscada2, filtro2, valorBuscado2,
      columnaBuscada3, filtro3, valorBuscado3,
      columnaBuscada4, filtro4, valorBuscado4,
      columnaBuscada5, filtro5, valorBuscado5);
  }

  traerItems_ArrayContains_Observable(columnaArray: string, valorBuscado: any) {
    return this.firestoreService.traerItems_ArrayContains_Observable(this.nombreColeccion, columnaArray, valorBuscado);
  }

  traerItems_ArrayContainsAny_Observable(columnaArray: string, valorBuscado: any) {
    return this.firestoreService.traerItems_ArrayContainsAny_Observable(this.nombreColeccion, columnaArray, valorBuscado);
  }

  //#endregion
}

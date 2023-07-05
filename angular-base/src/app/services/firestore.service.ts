import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  OrderByDirection,
  WhereFilterOp,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  Query
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  //#region ABM

  /**
   * Guarda el objeto y le asigna un ID automaticamente.
   * @param nombreColeccion nombre de la tabla.
   * @param itemAGuardar objeto a guardar en la tabla.
   * @returns Promise<void>
   */
  guardarItemSinIdAsignado(nombreColeccion: string, itemAGuardar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoNuevo: DocumentReference<DocumentData> = doc(coleccion);
    itemAGuardar.id = documentoNuevo.id;
    return setDoc(documentoNuevo, itemAGuardar);
  }

  /**
   * Guarda el objeto con el ID que ya tenga asignado previamente.
   * @param nombreColeccion nombre de la tabla.
   * @param itemAGuardar objeto a guardar en la tabla.
   * @returns Promise<void>
   */
  guardarItemConIdAsignado(nombreColeccion: string, itemAGuardar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoNuevo: DocumentReference<DocumentData> = doc(coleccion, itemAGuardar.id);
    return setDoc(documentoNuevo, itemAGuardar);
  }

  modificarItem(nombreColeccion: string, itemAModificar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoOriginal: DocumentReference<DocumentData> = doc(coleccion, itemAModificar.id);
    return updateDoc(documentoOriginal, { ...itemAModificar });
  }

  eliminarItem(nombreColeccion: string, id: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoAEliminar: DocumentReference<DocumentData> = doc(coleccion, id);
    return deleteDoc(documentoAEliminar);
  }

  //#endregion

  //#region Obtener datos ASYNC

  /**    
   * Obtiene el elemento por Id. Retorna Promesa (Con el objeto. Si no lo encuentra, retorna null).
   * @param nombreColeccion nombre de la coleccion.
   * @param id Id del objeto que se desea traer.
   * @returns Promise<DocumentData | null>
   */
  async traerItemPorId_Promesa(nombreColeccion: string, id: string) {
    let items = await this.traerItemsFiltrados(nombreColeccion, 'id', '==', id);
    if (items && items.length > 0)
      return items[0];
    return null;
  }

  async traerItems(nombreColeccion: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);

    //Forma 1
    const docs = await getDocs(coleccion).then((docs) => {
      return docs;
    });
    const items: DocumentData[] = [];
    docs.forEach((item) => {
      items.push(item.data());
    });
    return items;

    //Forma 2
    // let q = query(coleccion);
    // return await this.obtenerItems(q);
  }

  async traerItemsOrdenados(nombreColeccion: string, orden: OrderByDirection, columnaOrden: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    let q = query(coleccion, orderBy(columnaOrden, orden));
    return await this.obtenerItems(q);
  }

  /**   
   * Retorna una lista de objetos filtrada segun el criterio.
   ** IMPORTANTE
   ** 'in/not in' requieren un Array con los valores buscados. 
   * @param nombreColeccion Nombre de la tabla.
   * @param columnaBuscada Columna para la busqueda.
   * @param filtro Tipo de filtro.
   * @param valorBuscado Valor buscado. 
   * @returns Promise<DocumentData[]>
   */
  async traerItemsFiltrados(nombreColeccion: string, columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    let q = query(coleccion, where(columnaBuscada, filtro, valorBuscado));
    return await this.obtenerItems(q);
  }

  async traerItems_2_Filtros(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);

    let q = query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2));

    return await this.obtenerItems(q);
  }

  async traerItems_3_Filtros(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);

    let q = query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2),
      where(columnaBuscada3, filtro3, valorBuscado3));

    return await this.obtenerItems(q);
  }

  async traerItems_4_Filtros(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);

    let q = query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2),
      where(columnaBuscada3, filtro3, valorBuscado3),
      where(columnaBuscada4, filtro4, valorBuscado4));

    return await this.obtenerItems(q);
  }

  async traerItems_5_Filtros(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any,
    columnaBuscada5: string, filtro5: WhereFilterOp, valorBuscado5: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);

    let q = query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2),
      where(columnaBuscada3, filtro3, valorBuscado3),
      where(columnaBuscada4, filtro4, valorBuscado4),
      where(columnaBuscada5, filtro5, valorBuscado5));

    return await this.obtenerItems(q);
  }

  /**
   * Obtiene una lista de elementos, los cuales contienen en su **CAMPO ARRAY**, el item **EXACTO** que se recibe por parametro.
   * @param nombreColeccion Nombre de la lista.
   * @param campoArray **CAMPO ARRAY** donde se busca el item **EXACTO**.
   * @param itemExactoQueSeBusca Item **EXACTO** que se busca en el **CAMPO ARRAY** (con todas las propiedades especificadas).
   * @returns elementos cuyo **CAMPO ARRAY** contiene el item **EXACTO** que se recibe por parametro.
   */
  async traerItems_ArrayContains(nombreColeccion: string, campoArray: string, itemExactoQueSeBusca: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    let q = query(coleccion, where(campoArray, 'array-contains', itemExactoQueSeBusca));
    return await this.obtenerItems(q);
  }

  /**
   * Obtiene una lista de elementos, los cuales contienen en su **CAMPO ARRAY**, al menos UN item **EXACTO** de los que se recibe por parametro.
   * @param nombreColeccion Nombre de la lista.
   * @param campoArray **CAMPO ARRAY** donde se busca al menos UN item **EXACTO**.
   * @param itemsExactosQueSeBuscan Items **EXACTOS** que se buscan en el **CAMPO ARRAY** (con todas las propiedades especificadas).
   * @returns elementos cuyo **CAMPO ARRAY** contiene al menos UN item **EXACTO** de los que se recibe por parametro.
   */
  async traerItems_ArrayContainsAny(nombreColeccion: string, campoArray: string, itemsExactosQueSeBuscan: any[]) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    let q = query(coleccion, where(campoArray, 'array-contains-any', itemsExactosQueSeBuscan));
    return await this.obtenerItems(q);
  }

  private async obtenerItems(query: Query<DocumentData>) {
    const docs = await getDocs(query).then((docs) => {
      return docs;
    });
    const items: DocumentData[] = [];
    docs.forEach((item) => {
      items.push(item.data());
    });
    return items;
  }

  //#endregion

  //#region Obtener datos OBSERVABLE

  /**   
   * Obtiene el elemento por Id. Retorna Observable (Con una lista de 1 item. Si no lo encuentra, retorna la lista vacia).
   * @param nombreColeccion nombre de la coleccion.
   * @param id Id del objeto que se desea traer.
   * @returns Observable<DocumentData[]>
   */
  traerItemPorId_Observable(nombreColeccion: string, id: string) {
    return this.traerItemsFiltradosConObservable(nombreColeccion, 'id', '==', id);
  }

  traerItemsConObservable(nombreColeccion: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(coleccion);
  }

  traerItemsOrdenadosConObservable(nombreColeccion: string, orden: OrderByDirection, columnaOrden: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, orderBy(columnaOrden, orden)));
  }

  /**   
   * Retorna una lista de objetos filtrada segun el criterio.
   ** IMPORTANTE
   ** 'in/not' in requieren un Array con los valores buscados. 
   * @param nombreColeccion Nombre de la tabla.
   * @param columnaBuscada Columna para la busqueda.
   * @param filtro Tipo de filtro.
   * @param valorBuscado Valor buscado. 
   * @returns Observable<DocumentData[]>
   */
  traerItemsFiltradosConObservable(nombreColeccion: string, columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, where(columnaBuscada, filtro, valorBuscado)));
  }

  traerItems_2_FiltrosConObservable(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2)));
  }

  traerItems_3_FiltrosConObservable(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2),
      where(columnaBuscada3, filtro3, valorBuscado3)));
  }

  traerItems_4_FiltrosConObservable(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2),
      where(columnaBuscada3, filtro3, valorBuscado3),
      where(columnaBuscada4, filtro4, valorBuscado4)));
  }

  traerItems_5_FiltrosConObservable(nombreColeccion: string,
    columnaBuscada: string, filtro: WhereFilterOp, valorBuscado: any,
    columnaBuscada2: string, filtro2: WhereFilterOp, valorBuscado2: any,
    columnaBuscada3: string, filtro3: WhereFilterOp, valorBuscado3: any,
    columnaBuscada4: string, filtro4: WhereFilterOp, valorBuscado4: any,
    columnaBuscada5: string, filtro5: WhereFilterOp, valorBuscado5: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion,
      where(columnaBuscada, filtro, valorBuscado),
      where(columnaBuscada2, filtro2, valorBuscado2),
      where(columnaBuscada3, filtro3, valorBuscado3),
      where(columnaBuscada4, filtro4, valorBuscado4),
      where(columnaBuscada5, filtro5, valorBuscado5)));
  }

  /**
   * Obtiene una lista de elementos, los cuales contienen en su **CAMPO ARRAY**, el item **EXACTO** que se recibe por parametro.
   * @param nombreColeccion Nombre de la lista.
   * @param campoArray **CAMPO ARRAY** donde se busca el item **EXACTO**.
   * @param itemExactoQueSeBusca Item **EXACTO** que se busca en el **CAMPO ARRAY** (con todas las propiedades especificadas).
   * @returns elementos cuyo **CAMPO ARRAY** contiene el item **EXACTO** que se recibe por parametro.
   */
  traerItems_ArrayContains_Observable(nombreColeccion: string, campoArray: string, itemExactoQueSeBusca: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, where(campoArray, 'array-contains', itemExactoQueSeBusca)));
  }

  /**
   * Obtiene una lista de elementos, los cuales contienen en su **CAMPO ARRAY**, al menos UN item **EXACTO** de los que se recibe por parametro.
   * @param nombreColeccion Nombre de la lista.
   * @param campoArray **CAMPO ARRAY** donde se busca al menos UN item **EXACTO**.
   * @param itemsExactosQueSeBuscan Items **EXACTOS** que se buscan en el **CAMPO ARRAY** (con todas las propiedades especificadas).
   * @returns elementos cuyo **CAMPO ARRAY** contiene al menos UN item **EXACTO** de los que se recibe por parametro.
   */
  traerItems_ArrayContainsAny_Observable(nombreColeccion: string, campoArray: string, itemsExactosQueSeBuscan: any[]) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, where(campoArray, 'array-contains-any', itemsExactosQueSeBuscan)));
  }

  //#endregion
}

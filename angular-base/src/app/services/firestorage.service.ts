import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, concat, defer, ignoreElements, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestorageService {
  constructor(private firestorage: AngularFireStorage) { }

  /**
   * Guarda el archivo y retorna el Observable, a traves del cual podemos obtener la URL del archivo.
   ** USO: 
   ** this.firestorageService.guardarArchivo(archivo, 'nombreCarpeta/nombreArchivo')?.subscribe(url =>{ obtengo la URL });
   * @param archivo Archivo que se guardara.
   * @param nombreArchivo Nombre del archivo.
   * @returns Observable. Al suscribirse, se obtiene la URL del archivo.
   */
  guardarArchivo(archivo: File, nombreArchivo: string): Observable<string> {
    const referenciaArchivo = this.firestorage.ref(nombreArchivo);
    const task = this.firestorage.upload(nombreArchivo, archivo);
    return concat(
      task.snapshotChanges().pipe(ignoreElements()),
      defer(() => referenciaArchivo.getDownloadURL())
    );
  }

  /**
   * Guarda el archivo y retorna una promesa.
   ** USO:
   ** (await this.firestorageService.guardarArchivo_V2(archivo, 'nombreCarpeta/nombreArchivo'))?.subscribe(url =>{ obtengo la URL });
   * @param archivo Archivo que se guardara.
   * @param nombreArchivo Nombre del archivo.
   * @returns Promesa. Null en caso de error.
   */
  async guardarArchivo_V2(archivo: File, nombreArchivo: string) {
    try {
      const referenciaArchivo = this.firestorage.ref(nombreArchivo);
      const task = await referenciaArchivo.put(archivo);
      return referenciaArchivo.getDownloadURL();
    } catch (error: any) {
      return null;
    }
  }

  /** Obtiene un archivo de Firestorage.
   * Requiere la URL del archivo: 
   ** https://firebasestorage...
   * @param url URL del archivo. 
   */
  obtenerArchivoPorURL(url: string) {
    return this.firestorage.storage.refFromURL(url);
  }

  /** Elimina un archivo de Firestorage.
  * Requiere la RUTA COMPLETA del archivo: 
  ** nombreCarpeta?/nombreArchivo
  * @param ruta Ruta del archivo. 
  */
  eliminarArchivoPorRutaAbsoluta(ruta: string) {
    const ref = this.firestorage.ref(ruta);
    return ref.delete();
  }

  /** Elimina un archivo de Firestorage.
   * Requiere la URL del archivo: 
   ** https://firebasestorage...
   * @param url URL del archivo. 
   */
  eliminarArchivoPorURL(url: string) {
    const refFromUrl = this.firestorage.storage.refFromURL(url);
    refFromUrl.delete();
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class FireauthService {
  constructor(private fireAuth: AngularFireAuth) { }

  get cambioEstadoAuth_Observable() {
    return this.fireAuth.authState;
  }

  get usuarioActual_Promesa() {
    return this.fireAuth.currentUser;
  }

  iniciarSesion(correo: string, clave: string) {
    return this.fireAuth.signInWithEmailAndPassword(correo, clave);
  }

  cerrarSesion() {
    return this.fireAuth.signOut();
  }

  registrarUsuario(correo: string, clave: string) {
    return this.fireAuth.createUserWithEmailAndPassword(correo, clave);
  }

  async registrarUsuarioConVerificacion(correo: string, clave: string): Promise<any> {
    const resultado = await this.fireAuth.createUserWithEmailAndPassword(correo, clave);
    this.enviarCorreoDeVerificacion();
    return resultado;
  }

  async enviarCorreoDeVerificacion() {
    return (await this.fireAuth.currentUser)?.sendEmailVerification();
  }

  async enviarCorreoDeVerificacion_2() {
    let auth = getAuth();
    sendEmailVerification(auth?.currentUser!)
  }
}

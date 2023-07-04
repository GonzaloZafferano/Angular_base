import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) { }

  private mostrarToast(clase: string, mensaje: string, titulo: string, duracion: number) {
    const opciones = {
      toastClass: `toast-general ${clase}`,
      timeOut: duracion,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-position',
    };

    this.toastr.show(mensaje, titulo != '' ? titulo : 'Aviso', opciones);
  }

  exito(mensaje: string, titulo: string = '', duracion: number = 3000) {
    this.mostrarToast('toast-custom-success', mensaje, titulo, duracion);
  }

  error(mensaje: string, titulo: string = '', duracion: number = 3000) {
    this.mostrarToast('toast-custom-error', mensaje, titulo, duracion);
  }

  informacion(mensaje: string, titulo: string = '', duracion: number = 3000) {
    this.mostrarToast('toast-custom-info', mensaje, titulo, duracion);
  }

  advertencia(mensaje: string, titulo: string = '', duracion: number = 3000) {
    this.mostrarToast('toast-custom-warning', mensaje, titulo, duracion);
  }
}

/**********************************************************************************************************
 *************************** RECOMENDACIONES A TENER EN CUENTA ********************************************
 **********************************************************************************************************

 * 1) Instalar: 
  npm install ngx-toastr  --save 

 * import { ToastrService } from 'ngx-toastr';

 * 2) En app.module: 
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
  import { ToastrModule } from 'ngx-toastr'; 

  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],

 * 3) En el archivo CSS global:

.toast-custom-position {
  position: fixed;
  top: 20px;
  right: 320px;
}

.toast-general {
  position: absolute; //Evita el efecto STACK de toasts.    
  min-width: 300px;
  border-radius: 20px;
  padding: 15px;
  font-size: 1.15em;
  font-weight: bold;
  color: #ffffff;
}

.toast-custom-error {
  background-color: #ba5858;
}

.toast-custom-success {
  background-color: #56a74d;
}

.toast-custom-info {
  background-color: #548796;
}

.toast-custom-warning {
  background-color: #efec39;
  color: black;
}

*/
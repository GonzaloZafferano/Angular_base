import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export type SwalType = 'Informacion' | 'Exito' | 'Error' | 'Advertencia' | 'Pregunta';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { }

  exito(mensaje: string, titulo: string = '', mostrarCancelar: boolean = false, funcionAceptar: any = null, funcionCancelar: any = null) {
    this.mostrarSwal(mensaje, titulo, 'Exito', mostrarCancelar, funcionAceptar, funcionCancelar);
  }

  error(mensaje: string, titulo: string = '', mostrarCancelar: boolean = false, funcionAceptar: any = null, funcionCancelar: any = null) {
    this.mostrarSwal(mensaje, titulo, 'Error', mostrarCancelar, funcionAceptar, funcionCancelar);
  }

  informacion(mensaje: string, titulo: string = '', mostrarCancelar: boolean = false, funcionAceptar: any = null, funcionCancelar: any = null) {
    this.mostrarSwal(mensaje, titulo, 'Informacion', mostrarCancelar, funcionAceptar, funcionCancelar);
  }

  advertencia(mensaje: string, titulo: string = '', mostrarCancelar: boolean = false, funcionAceptar: any = null, funcionCancelar: any = null) {
    this.mostrarSwal(mensaje, titulo, 'Advertencia', mostrarCancelar, funcionAceptar, funcionCancelar);
  }

  pregunta(mensaje: string, titulo: string = '', mostrarCancelar: boolean = false, funcionAceptar: any = null, funcionCancelar: any = null) {
    this.mostrarSwal(mensaje, titulo, 'Pregunta', mostrarCancelar, funcionAceptar, funcionCancelar);
  }

  private mostrarSwal(mensaje: string, titulo: string, tipoSwal: SwalType, mostrarCancelar: boolean, funcionAceptar: any, funcionCancelar: any) {
    let icono: SweetAlertIcon = 'success';
    let container = 'sw-container-exito';
    switch (tipoSwal) {
      case 'Error':
        icono = 'error'
        container = 'sw-container-error'
        break;
      case 'Advertencia':
        icono = 'warning'
        container = 'sw-container-warning';
        break;
      case 'Informacion':
        icono = 'info'
        container = 'sw-container-info'
        break;
      case 'Pregunta':
        icono = 'question'
        container = 'sw-container-question'
        break;
    }

    Swal.fire({
      title: titulo != '' ? titulo : 'AVISO',
      text: mensaje,
      icon: icono,
      allowOutsideClick: false,
      confirmButtonText: 'Aceptar',
      reverseButtons: true,
      showCancelButton: mostrarCancelar,
      cancelButtonText: 'Cancelar',
      allowEscapeKey: false,
      allowEnterKey: false,
      customClass: {
        container: container,
        title: 'sw-title',
        htmlContainer: 'sw-htmlContainer',
        popup: 'sw-popup',
        cancelButton: 'sw-cancel',
        confirmButton: 'sw-confirm',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (funcionAceptar) {
          funcionAceptar();
        }
      } else if (result.isDismissed) {
        if (funcionCancelar) {
          funcionCancelar();
        }
      }
      Swal.close();
    });
  }
}

/**********************************************************************************************************
 *************************** RECOMENDACIONES A TENER EN CUENTA ********************************************
 **********************************************************************************************************

 * npm install sweetalert2 

 * import Swal, { SweetAlertIcon } from 'sweetalert2';

 * 1) Para asignar funciones al boton Aceptar y Cancelar:
 * a) Primero, indicamos 'true' para que tenga visible el boton 'Cancelar'.
 * b) Luego, indicamos las funciones (o null) para cada boton.
  
 this.swalService.pregunta('¿Desea continuar?','', true, this.funcionAceptar, this.funcionCancelar);
 
  funcionCancelar() {
    //Codigo
  }

  funcionAceptar() {
    //Codigo
  }

  2) En el archivo CSS Global:

.sw-container-exito {
  background-color: rgba(53, 169, 32, 0.614) !important;
}

.sw-container-error {   
  background-color: rgba(255, 0, 0, 0.511) !important;
}

.sw-container-question {
  background-color: rgba(0, 255, 255, 0.541) !important;   
}

.sw-container-info {
  background-color: rgba(8, 0, 255, 0.563) !important;   
}

.sw-container-warning {
  background-color: rgba(255, 242, 0, 0.421) !important;
}

.sw-title {
  font-size: 3em !important;
  font-weight: bold !important;
  // background-color: #d17575; 
}

.sw-htmlContainer {
  font-size: 2em !important;
  font-weight: bold !important;
  // background-color: red !important; 
  // color: black !important;  
} 

.sw-popup {
  border-radius: 50px !important;
  background-color: #ffffff !important;
}

.sw-cancel {
  font-size: 2em !important;
  font-weight: bold !important;
  background-color: #d17575 !important;
}

.sw-confirm {
  font-size: 2em !important;
  font-weight: bold !important;
  background-color: #5b9654 !important;
}

*/
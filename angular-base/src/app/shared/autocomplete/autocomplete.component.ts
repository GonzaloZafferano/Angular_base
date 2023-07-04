import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  @ViewChild('inputTexto', { static: false }) inputTexto: ElementRef | undefined;

  //Eventos
  @Output() OnSeleccionElemento = new EventEmitter<any>();
  @Output() OnLimpiarBuscador = new EventEmitter<any>();

  //Funciones
  @Input() f_funcionBuscador: any;
  @Input() f_funcionPipe: any;
  @Input() f_funcionMensaje: any;

  //Textos
  @Input() t_titulo: string = 'Buscador';
  @Input() t_textoSpinner: string = 'Cargando...';

  //Estilos
  @Input() e_contenedorGeneral: string = '';
  @Input() e_contenedorBuscador: string = '';
  @Input() e_labelTitulo: string = '';
  @Input() e_contenedorInputBotones: string = '';
  @Input() e_input: string = '';
  @Input() e_boton: string = '';
  @Input() e_contenedorResultados: string = '';
  @Input() e_contenedorSpinner: string = '';
  @Input() e_spanSpinner: string = '';
  @Input() e_divSpinner: string = '';
  @Input() e_divResultado: string = '';
  @Input() e_pResultado: string = '';

  //Variables
  public cargando: boolean = false;
  public datos: any = null;

  constructor() { }

  async buscar() {
    this.cargando = true;
    if (this.f_funcionBuscador) {
      let texto = this.inputTexto?.nativeElement.value;
      this.datos = await this.f_funcionBuscador(texto);

      if (!this.datos || this.datos.length == 0) {
        if (this.f_funcionMensaje)
          this.f_funcionMensaje();
      }
    }
    this.cargando = false;
  }

  async onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      await this.buscar();
    }
  }

  pipe(item: any) {
    if (this.f_funcionPipe)
      return this.f_funcionPipe(item);
    return '';
  }

  limpiarYEmitirEvento() {
    this.limpiar();
    this.OnLimpiarBuscador.emit();
  }

  limpiar() {
    this.datos = null;

    const inputTexto = document.getElementById('inputTexto') as HTMLInputElement;
    inputTexto.value = '';
    inputTexto.disabled = false;

    (document.getElementById('btnBuscar') as HTMLButtonElement).disabled = false;
  }

  itemSeleccionado(item: any, input: HTMLInputElement) {
    this.datos = null;

    //Forma 1 (lo recibe por parametro)
    input.value = this.pipe(item);
    input.disabled = true;

    //Forma 2
    (document.getElementById('btnBuscar') as HTMLButtonElement).disabled = true;

    this.OnSeleccionElemento.emit(item);
  }
}

/**********************************************************************************************************
 *************************** RECOMENDACIONES A TENER EN CUENTA ********************************************
 **********************************************************************************************************

 * 1) Las funciones que reciba por 'parametro', SI O SI deben tener la siguiente estructura para funcionar:

  funcion_hacer_algo = () => {
    funcionalidades...
  }


 * 2) Para invocar a los metodos de este buscador, desde el exterior:
 * En el HTML:
  <app-buscador #buscador ></app-buscador>

 * En el Ts:
  @ViewChild('buscador', { static: false }) buscador: ElementRef | any;
  
 * Para invocar al metodo desde el Ts:
  funcion_cualquiera(){
    this.buscador?.limpiar();
  }  
 
 */
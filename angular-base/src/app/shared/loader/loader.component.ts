import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  //Texto
  @Input() t_texto: string = 'Cargando...';

  //Estilos
  @Input() e_divGeneral: string = '';
  @Input() e_divTexto: string = '';
  @Input() e_hTexto: string = '';
  @Input() e_divSpinner: string = '';
}

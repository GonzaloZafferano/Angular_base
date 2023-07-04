import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-loader',
  templateUrl: './mini-loader.component.html',
  styleUrls: ['./mini-loader.component.css']
})
export class MiniLoaderComponent {
  @Input() t_textoSpinner: string = 'Cargando...';
  @Input() e_contenedorSpinner: string = '';
  @Input() e_spanSpinner: string = '';
  @Input() e_divSpinner: string = '';
}

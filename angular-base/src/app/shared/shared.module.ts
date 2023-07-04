import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MiniLoaderComponent } from './mini-loader/mini-loader.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MiniLoaderComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    MiniLoaderComponent,
    AutocompleteComponent
  ]
})

export class SharedModule { }

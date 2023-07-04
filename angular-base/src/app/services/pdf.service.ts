import { Injectable } from '@angular/core';
import jsPDF, { TextOptionsLight } from "jspdf";

export class Logo {
  url: string = '';
  formato: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() { }

  descargarPDF(nombreArchivo: string, titulo: string, texto: string[], logo: Logo | null = null, fechaEmision: boolean = false) {
    const pdf = new jsPDF();

    //Titulo del PDF.
    const anchoPagina = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
    const anchoTitulo = pdf.getStringUnitWidth(titulo) * pdf.getFontSize() / pdf.internal.scaleFactor;
    const tituloX = (anchoPagina - anchoTitulo) / 2;
    let alturaTitulo = 20; //Altura del titulo.
    let alturaTexto = 30; //Altura inicial del contenido.

    //Logo.
    if (logo) {
      this.insertarLogo(pdf, logo);
      alturaTitulo = 30; //Si hay logo, la altura del titulo sera mayor.
      alturaTexto = 50; //Si hay logo, la altura inicial sera mayor.
    }

    //Se agrega el título al PDF.
    pdf.setFont('helvetica', 'bold');
    pdf.text(titulo, tituloX, alturaTitulo);
    pdf.setFont('helvetica', 'normal');
    //pdf.setFont('times', 'italic');
    //pdf.setFont('courier', 'bolditalic');

    //Contenido del PDF.
    const opcionesTexto: TextOptionsLight = {
      align: 'left',
    };

    for (let i = 0; i < texto.length; i++) {
      const anchoMaxLinea = 190; //Ancho maximo para cada linea.
      const lineasDeTexto = pdf.splitTextToSize(texto[i], anchoMaxLinea);

      // Altura de línea (segun texto).
      const alturaLinea = pdf.getTextDimensions(lineasDeTexto).h;

      //SI la altura ACTUAL donde se deberia escribir el texto, 
      //MÁS la actura del texto que se va a escribir
      //es MAYOR que la altura de la pagina, entonces necesitamos pedir otra pagina.
      if (alturaTexto + alturaLinea > pdf.internal.pageSize.height) {
        pdf.addPage(); //Agrega una nueva página  

        //Se resetea la altura del titulo y el texto en la nueva pagina.
        alturaTitulo = 20;
        alturaTexto = 30;

        //Se agrega el logo en la nueva pagina.
        if (logo) {
          this.insertarLogo(pdf, logo);
          alturaTitulo = 30; //Si hay logo, la altura del titulo sera mayor.
          alturaTexto = 50; //Si hay logo, la altura inicial sera mayor.
        }

        //Se agrega titulo en la nueva pagina.
        pdf.setFont('helvetica', 'bold');
        pdf.text(titulo, tituloX, alturaTitulo);
        pdf.setFont('helvetica', 'normal');
      }

      //Agrega las líneas de texto al PDF.
      pdf.text(lineasDeTexto, 10, alturaTexto, opcionesTexto);

      //Se setea la altura para la PROXIMA linea de texto.
      alturaTexto += 10 * lineasDeTexto.length;
    }

    if (fechaEmision) {
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Fecha de emisión: ${new Date().toLocaleString()}`, 10, alturaTexto, { align: 'justify' });
      pdf.setFont('helvetica', 'normal');
    }

    pdf.save(`${nombreArchivo}.pdf`);
  }

  private insertarLogo(pdf: jsPDF, logo: Logo) {
    if (logo) {
      const logoUrl = logo?.url;
      const opciones = { //Opciones de formato para la imagen
        format: logo?.formato, //png, jpg, etc...
        x: 170, //Posición horizontal de la imagen en el PDF.
        y: 10, //Posición vertical de la imagen en el PDF.
        width: 30, //Ancho de la imagen en el PDF.
        height: 30 //Alto de la imagen en el PDF.
      };
      //Agrega el logo al PDF.
      pdf.addImage(logoUrl, opciones.format, opciones.x, opciones.y, opciones.width, opciones.height);
    }
  }
}

/**********************************************************************************************************
*************************** RECOMENDACIONES A TENER EN CUENTA ********************************************
**********************************************************************************************************
 
* npm install jspdf --save

* import jsPDF, { TextOptionsLight } from "jspdf";

* Ejemplo de uso:

 let logo = new Logo();
 logo.url = 'carpeta/subcarpeta/imagen.png';
 logo.formato = 'png';
 
 this.pdfService.descargarPDF('nombre_archivo', titulo, contenido, logo, true);

*/
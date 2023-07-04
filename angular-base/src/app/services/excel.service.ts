import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  constructor() { }

  /**
   * Crea y descarga un archivo Excel.
   * @param nombreArchivo Nombre que tendra el archivo Excel.
   * @param nombresDeSolapas Array con los nombres de las Solapas del archivo Excel.
   * @param registrosPorSolapas Array de Datos. Cada Item del array contiene los datos de UNA solapa. 
   * @param anchosDeColumnas Anchos que tendran las columnas del Archivo.
   */
  descargarExcel(nombreArchivo: string, nombresDeSolapas: string[], registrosPorSolapas: any[], anchosDeColumnas: number[]) {
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };

    for (let i = 0; i < registrosPorSolapas.length; i++) {
      const nombreDeSolapa = nombresDeSolapas[i];
      const registrosDeSolapa = registrosPorSolapas[i];
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(registrosDeSolapa);
      worksheet['!cols'] = anchosDeColumnas.map(width => ({ width }));
      workbook.SheetNames.push(nombreDeSolapa);
      workbook.Sheets[nombreDeSolapa] = worksheet;
    }

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, nombreArchivo + '.xlsx');
  }
}

/**********************************************************************************************************
 *************************** RECOMENDACIONES A TENER EN CUENTA ********************************************
 **********************************************************************************************************

 * npm install xlsx
 * npm install @types/file-saver 
 
 * import * as XLSX from 'xlsx';

 * import { saveAs } from 'file-saver'; 
 * SI NO FUNCIONA EL IMPORT DE ARRIBA, PROBAR EL SIGUIENTE:
 * import { saveAs } from 'file-saver' as any;  

 * Ejemplo de uso:

  descargarExcel() {
    let pacientes = this.usuarios.filter(x => x.perfil == Perfil.paciente);
    let especialistas = this.usuarios.filter(x => x.perfil == Perfil.especialista);
    let administradores = this.usuarios.filter(x => x.perfil == Perfil.administrador);

    //Los NOMBRES de las propiedades seran los NOMBRES DE LAS COLUMNAS.
    let pacientesExcel = pacientes.map(x => {
      return { Id: x.id, Nombre: x.nombre, Apellido: x.apellido, Correo: x.correo, Dni: x.dni, Edad: x.edad, Perfil: 'Paciente' }
    });

    //Los NOMBRES de las propiedades seran los NOMBRES DE LAS COLUMNAS.
    let especialistasExcel = especialistas.map(x => {
      return { Id: x.id, Nombre: x.nombre, Apellido: x.apellido, Correo: x.correo, Dni: x.dni, Edad: x.edad, Perfil: 'Especialista' }
    });

    //Los NOMBRES de las propiedades seran los NOMBRES DE LAS COLUMNAS.
    let administradoresExcel = administradores.map(x => {
      return { Id: x.id, Nombre: x.nombre, Apellido: x.apellido, Correo: x.correo, Dni: x.dni, Edad: x.edad, Perfil: 'Administrador' }
    });

    this.excelService.descargarExcel(
      'Usuarios', //Nombre del Archivo.
      ['Pacientes', 'Especialistas', 'Administradores'], //Nombres de las Solapas.
      [pacientesExcel, especialistasExcel, administradoresExcel], //Datos POR Solapa.
      [40, 20, 20, 30, 10, 5, 15]); //Anchos de Columnas.  
  }

 */
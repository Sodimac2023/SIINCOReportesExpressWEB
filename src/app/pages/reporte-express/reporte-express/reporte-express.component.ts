import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReporteExpressSateService } from 'src/app/domain/service/reporte-express/reporte-express-state.service';
import { MessageService } from 'primeng/api';
import { ISolicitudConsulta } from 'src/app/domain/interface/solicitudConsulta.interface';
@Component({
  selector: 'app-reporte-express',
  templateUrl: './reporte-express.component.html',
  styleUrls: ['./reporte-express.component.scss'],
})
export class ReporteExpressComponent implements OnInit {
  public resultado: any[] = [];
  public queryForm!: FormGroup;
  public blockedDocument: boolean = false;
  public isDisabledDivAtrr: boolean = true;
  public lineNumbers: number[] = [];
  public tipoConsultaSeleccionada: string = '';
  public textQuery: string = '';
  public opcionSeleccionada = new FormControl('');
  public paginaActual: number = 1;
  public elementosPorPagina: number = 10;
  public objSolicitudConsulta: any = null;
  public tipoConsulta: {
    label: string;
    value: string;
    id: number;
    parameters: string;
  }[] = [];

  constructor(
    private fb: FormBuilder,
    private _siincoReporteExpressStateService: ReporteExpressSateService
  ) {
    this.queryForm = this.fb.group({
      // tipoConsultaSeleccionada: this.opcionSeleccionada,
      textQuery: this.textQuery,
      numeroProducto: ['', []],
      numeroTienda: ['', []],
      fechaInicio: ['', []],
      fechaFin: ['', []],
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerQuerysDisponibles();
  }
  private crearFormulario(): void {}
  exportarExcel() {
    if (this.resultado.length > 0) {
      // Convierte los datos a formato CSV usando papaparse
      const csvData = Papa.unparse(this.resultado);

      // Crea un Blob con los datos CSV y el tipo de archivo
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

      // Crea una URL para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace (link) para descargar el archivo CSV
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'datos.csv'); // Nombre del archivo CSV

      // Simula un clic en el enlace para descargar el archivo
      link.click();

      // Libera la URL del Blob
      window.URL.revokeObjectURL(url);
    }
  }
  public chkAtrrchanged(evt: any, div: number) {
    if (evt.checked) {
      switch (div) {
        case 0:
          this.isDisabledDivAtrr = false;
          break;
      }
    } else {
      switch (div) {
        case 0:
          this.isDisabledDivAtrr = true;
          break;
      }
    }
  }
  public updateLineNumbers() {
    const lines = this.textQuery.split('\n');
    this.lineNumbers = Array.from(
      { length: lines.length },
      (_, index) => index + 1
    );
  }
  // seleccionarOpcion(opcion: string) {
  //   console.log('hola munco criuel');
  //   const seleccion = this.tipoConsulta.find((item) => item.value === opcion);
  //   if (seleccion) {
  //     // Establece el textoQuery con la opción seleccionada
  //     this.queryForm.controls['textQuery'].setValue(seleccion.value);
  //     this.updateLineNumbers();
  //   }
  // }
  public seleccionarOpcion(opcion: string) {
    // Encuentra la opción seleccionada en el arreglo tipoConsulta
    const seleccion = this.tipoConsulta.find((item) => item.value === opcion);
    this.objSolicitudConsulta = seleccion;
    if (seleccion) {
      // Establece el textoQuery con la opción seleccionada
      this.textQuery = seleccion.value;
      this.updateLineNumbers();
    }
  }
  public obtenerNombresColumnas(objeto: any): string[] {
    return Object.keys(objeto);
  }
  public async obtenerQuerysDisponibles() {
    try {
      let objDatos = await this._siincoReporteExpressStateService.GetQuerys();
      if (objDatos.isSuccessful) {
        this.tipoConsulta = objDatos.result.map(
          (item: {
            nombrE_QUERY: string;
            logicA_QUERY: string;
            iD_QUERY: number;
            parametroS_QUERY: string;
          }) => ({
            label: item.nombrE_QUERY,
            value: item.logicA_QUERY,
            id: item.iD_QUERY,
            parameters: item.parametroS_QUERY,
          })
        );
        console.log('estas son las variables', this.tipoConsulta);
      } else {
        // this.showMessage(objDatos.mensaje, 'error', 'Error');
      }
      this.blockedDocument = false;
    } catch (error) {
      // this.showMessage("eRORRR", 'error', 'Error');
      this.blockedDocument = false;
    }
  }
  public async enviarSolicitudConsulta() {
    try {
      const solicitud: ISolicitudConsulta = {
        iN_ID_QUERY: this.objSolicitudConsulta.id,
        iN_PARAM01: this.objSolicitudConsulta.parameters || '',
        iN_PARAM02: '' || '',
        iN_PARAM03: '' || '',
        iN_PARAM04: '' || '',
        iN_PARAM05: '' || '',
        iN_PARAM06: '' || '',
        iN_PARAM07: '' || '',
        iN_PARAM08: '' || '',
        iN_PARAM09: '' || '',
        iN_PARAM010: '' || '',
      };
      let objDatos =
        await this._siincoReporteExpressStateService.PostEnviarSolicitudConsulta(
          solicitud
        );
      if (objDatos.isSuccessful) {
        this.resultado =  this.procesarValores(objDatos.result)

      } else {
        // this.showMessage(objDatos.mensaje, 'error', 'Error');
      }
      this.blockedDocument = false;
    } catch (error) {
      // this.showMessage("eRORRR", 'error', 'Error');
      this.blockedDocument = false;
    }
  }
 // Función para procesar los valores antes de mostrarlos
  procesarValores(data: any[]): any[] {
    return data.map((item) => {
      const processedItem: any = {};
      for (const key in item) {
        if (item[key] === null || typeof item[key] === 'object') {
          processedItem[key] = 'null';
        } else {
          processedItem[key] = item[key];
        }
      }
      return processedItem;
    });
  }
  // public showMessage(detail: string, severity: string, summary: string): void {
  //   this._messageService.add({
  //     severity: severity,
  //     summary: summary,
  //     detail: detail,
  //   });
  // }
}

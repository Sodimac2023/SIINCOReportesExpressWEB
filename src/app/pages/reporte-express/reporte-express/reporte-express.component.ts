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
import { NgxUiLoaderService } from 'ngx-ui-loader';

/**
 * Componente que maneja la generación de informes express.
 * @author fespana
 */
@Component({
  selector: 'app-reporte-express',
  templateUrl: './reporte-express.component.html',
  providers: [MessageService],
  styleUrls: ['./reporte-express.component.scss'],
})
export class ReporteExpressComponent implements OnInit {
  // Propiedades y variables miembro
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
  public noTienda: boolean = false;
  public noProducto: boolean = false;
  public rangoFecha: boolean = false;
  public tamanioNoProducto: boolean = false;
  public tamanioNoTienda: boolean = false;
  public tipoConsulta: {
    label: string;
    value: string;
    id: number;
    parameters: string;
  }[] = [];

  // Constructor
  constructor(
    private fb: FormBuilder,
    private _siincoReporteExpressStateService: ReporteExpressSateService,
    private _messageService: MessageService,
    private ngxService: NgxUiLoaderService
  ) {
    this.queryForm = this.fb.group({
      textQuery: this.textQuery,
      numeroProducto: ['', []],
      numeroTienda: ['', []],
      fechaInicio: ['', []],
      fechaFin: ['', []],
    });
  }

  // Métodos
  ngOnInit(): void {
    this.obtenerQuerysDisponibles();
  }

  /**
   * Exporta los datos actuales a un archivo CSV.
   */
  exportarExcel() {
    if (this.resultado.length > 0) {
      const csvData = Papa.unparse(this.resultado);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Datos.csv');
      link.click();
      window.URL.revokeObjectURL(url);
    }
  }

  /**
   * Maneja el cambio de estado del checkbox.
   * @param evt - Evento de cambio.
   * @param div - Número de división.
   */
  chkAtrrchanged(evt: any, div: number) {
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

  /**
   * Actualiza los números de línea en el área de texto.
   */
  updateLineNumbers() {
    const lines = this.textQuery.split('\n');
    this.lineNumbers = Array.from(
      { length: lines.length },
      (_, index) => index + 1
    );
  }

  /**
   * Selecciona una opción del menú desplegable.
   * @param opcion - Opción seleccionada.
   */
  seleccionarOpcion(opcion: string) {
    this.rangoFecha = false;
    this.noTienda = false;
    const seleccion = this.tipoConsulta.find((item) => item.value === opcion);
    this.objSolicitudConsulta = seleccion;
    const parametersString = this.objSolicitudConsulta.parameters;
    const parametersArray = parametersString
      .split(',')
      .map((param: string) => param.trim());
    parametersArray.forEach((param: string) => {
      if (param.endsWith('S')) {
        if (param.startsWith('TIENDA-')) {
          this.noTienda = true;
          this.queryForm.controls['numeroTienda'].setValidators([
            Validators.required,
            Validators.maxLength(5),
          ]);
          this.queryForm.controls['numeroTienda'].updateValueAndValidity();
        } else if (param.startsWith('SKU-')) {
          this.noProducto = true;
          this.queryForm.controls['numeroProducto'].setValidators([
            Validators.required,
            Validators.maxLength(12),
          ]);
        } else if (param.startsWith('RANGO-')) {
          this.rangoFecha = true;
          this.queryForm.controls['fechaInicio'].setValidators([
            Validators.required,
          ]);
          this.queryForm.controls['fechaInicio'].updateValueAndValidity();
          this.queryForm.controls['fechaFin'].setValidators([
            Validators.required,
          ]);
          this.queryForm.controls['fechaFin'].updateValueAndValidity();
        }
      }
    });
    if (seleccion) {
      this.textQuery = seleccion.value;
      this.updateLineNumbers();
    }
  }

  /**
   * Obtiene los nombres de las columnas del objeto.
   * @param objeto - Objeto del que se obtendrán los nombres de las columnas.
   * @returns Un array con los nombres de las columnas.
   */
  obtenerNombresColumnas(objeto: any): string[] {
    return Object.keys(objeto);
  }

  /**
   * Obtiene los tipos de consulta disponibles.
   */
  async obtenerQuerysDisponibles() {
    this.ngxService.start();
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
      } else {
        this.showMessage(objDatos.messages, 'error', 'Error');
      }
      this.ngxService.stop();
    } catch (error) {
      this.ngxService.stop();
      this.showMessage('eRORRR', 'error', 'Error');
    }
  }

  /**
   * Envía una solicitud de consulta.
   */
  async enviarSolicitudConsulta() {
    if (this.queryForm.valid) {
      this.ngxService.start();
      if (this.objSolicitudConsulta) {
        let sku = this.queryForm.controls['numeroProducto'].value || '';
        let nTienda = this.queryForm.controls['numeroTienda'].value || '';
        let fechaInicio = this.queryForm.controls['fechaInicio'].value || '';
        let fechaFin = this.queryForm.controls['fechaFin'].value || '';
        try {
          this.tamanioNoProducto = true;
          this.tamanioNoTienda = true;
          const solicitud: ISolicitudConsulta = {
            iN_ID_QUERY: this.objSolicitudConsulta.id,
            iN_PARAM01: sku.toString(),
            iN_PARAM02: nTienda.toString(),
            iN_PARAM03: fechaInicio.toString(),
            iN_PARAM04: fechaFin.toString(),
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
            this.resultado = this.procesarValores(objDatos.result);
            this.showMessage('Consulta Exitosa', 'success', 'Éxito');
          } else {
            this.showMessage(objDatos.messages, 'error', 'Error');
          }
          this.ngxService.stop();
        } catch (error) {
          this.showMessage('Error', 'error', 'Error');
          this.ngxService.stop();
        }
      } else {
        this.showMessage('Elige una consulta', 'warn', 'Advertencia');
      }
      this.ngxService.stop();
    }
  }

  /**
   * Procesa los valores de los datos obtenidos.
   * @param data - Datos a procesar.
   * @returns Un array con los datos procesados.
   */
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

  /**
   * Verifica si un campo del formulario es válido y se ha tocado.
   * @param campo - Nombre del campo a verificar.
   * @returns Verdadero si el campo no es válido y se ha tocado, falso en caso contrario.
   */
  campoNoValido(campo: string) {
    return (
      this.queryForm.get(campo)?.invalid && this.queryForm.get(campo)?.touched
    );
  }

  /**
   * Obtiene los mensajes de error para un campo específico.
   * @param nombreCampo - Nombre del campo para el cual se desean obtener los mensajes de error.
   * @returns Los mensajes de error del campo especificado.
   */
  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.queryForm.get(nombreCampo)?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['maxlength'] && nombreCampo === 'numeroProducto')
      return 'No puede superar los 12 caracteres.';
    if (errors?.['maxlength'] && nombreCampo === 'numeroTienda')
      return 'No puede superar los 5 caracteres.';
    return '';
  }

  /**
   * Muestra un mensaje en la interfaz de usuario.
   * @param detail - Detalle del mensaje.
   * @param severity - Severidad del mensaje (por ejemplo, 'success', 'error').
   * @param summary - Resumen del mensaje.
   */
  showMessage(detail: string, severity: string, summary: string): void {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}

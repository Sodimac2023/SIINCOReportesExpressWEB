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

@Component({
  selector: 'app-reporte-express',
  templateUrl: './reporte-express.component.html',
  providers: [MessageService],
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
  public noTienda: boolean = false;
  public rangoFecha: boolean = false;
  public tamanioNoProducto: boolean = false;
  public tamanioNoTienda: boolean = false;

  public tipoConsulta: {
    label: string;
    value: string;
    id: number;
    parameters: string;
  }[] = [];

  constructor(
    private fb: FormBuilder,
    private _siincoReporteExpressStateService: ReporteExpressSateService,
    private _messageService: MessageService,
    private ngxService: NgxUiLoaderService
  ) {
    this.queryForm = this.fb.group({
      textQuery: this.textQuery,
      numeroProducto: ['', [Validators.required, Validators.maxLength(12)]],
      numeroTienda: ['', []],
      fechaInicio: ['', []],
      fechaFin: ['', []],
    });
  }

  ngOnInit(): void {
    this.obtenerQuerysDisponibles();
  }

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

  updateLineNumbers() {
    const lines = this.textQuery.split('\n');
    this.lineNumbers = Array.from(
      { length: lines.length },
      (_, index) => index + 1
    );
  }

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
          // } else if (param.startsWith('SKU-')) {
          //   this.noProducto = true;
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

  obtenerNombresColumnas(objeto: any): string[] {
    return Object.keys(objeto);
  }

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

  campoNoValido(campo: string) {
    return (
      this.queryForm.get(campo)?.invalid && this.queryForm.get(campo)?.touched
    );
  }

  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.queryForm.get(nombreCampo)?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    // if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'] && nombreCampo === 'numeroProducto')
      return 'No puede superar los 12 caracteres.';
    if (errors?.['maxlength'] && nombreCampo === 'numeroTienda')
      return 'No puede superar los 5 caracteres.';
    // if (errors?.['min']) return 'Debe ser de mínimo 1';
    // if (errors?.['max'])
    //   return 'Debe ser máximo de ' + VALOR_MAXIMO_CARACTERES_CLASIFICADOR;
    // if (errors?.['pattern'] && nombreCampo === 'Descripcion')
    //   return 'No se permiten espacios ni caracteres especiales.';
    // if (errors?.['pattern'] && nombreCampo === 'TopeCaracteres')
    //   return 'No puede contener caracteres de texto.';

    return '';
  }
  showMessage(detail: string, severity: string, summary: string): void {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}

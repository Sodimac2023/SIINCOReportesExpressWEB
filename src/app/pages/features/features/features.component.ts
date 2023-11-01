import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { regex } from 'src/app/core/constant/constantes';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ICostoImportados } from 'src/app/domain/interface/costoImportados.interface';
import { FeaturesStateService } from 'src/app/domain/service/features/features-state.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  providers: [MessageService],
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  public featuresForm!: FormGroup;
  public obj!: any;
  public blockedDocument: boolean = false;
  public fechaInicial!: string;
  public fechaFinal!: string;
  public fechaDesde!: string;
  public fechaHasta!: string;
  public proveedor!: boolean;
  public readonly VALIDADORES = regex;
  public isDisabledDivAtrr: boolean = true;
  public isDisabledDivCost: boolean = true;
  public isDisabledDivCade: boolean = true;
  public costoVigente: string = '';
  public obj2!: any;
  public fechasCampania: string = '';
  public obj3!: any;
  public margenVpc!: number;
  public margenPromedio!: number;

  constructor(
    private fb: FormBuilder,
    private _messageService: MessageService,
    private _featuresStateService: FeaturesStateService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.featuresForm = this.fb.group({
      sku: ['', [Validators.required]],
      atributosBasicos: [null, []],
      descripcion: ['', []],
      estado: ['', []],
      subInventario: ['', []],
      reposicion: ['', []],
      costoReposicionCadena: [null, []],
      costo: ['', []],
      fechaInicio: ['', []],
      fechaFin: ['', []],
      unidadEmpaque: ['', []],
      proveedor: ['', []],
    });
  }

  public async obtenerDatosProducto() {
    if (this.featuresForm.controls['sku'].value) {
      this.blockedDocument = true;
      try {
        let objDatosProd = await this._featuresStateService.AsyncdatosProducto(
          this.featuresForm.controls['sku'].value
        );
        if(objDatosProd.estado){

        }else{
          this.showMessage(objDatosProd.mensaje, 'error', 'Error');
        }
        this.blockedDocument = false;

      } catch (error) {
        this.showMessage("eRORRR", 'error', 'Error');
        this.blockedDocument = false;
      }
    }
  }

  chkAtrrchanged(evt: any, div: number) {
    if (evt.checked) {
      switch (div) {
        case 0:
          this.isDisabledDivAtrr = false;
          break;
        case 1:
          this.isDisabledDivCost = false;
          break;
        case 2:
          this.isDisabledDivCade = false;
          break;
        default:
          break;
      }
    } else {
      switch (div) {
        case 0:
          this.isDisabledDivAtrr = true;
          break;
        case 1:
          this.isDisabledDivCost = true;
          break;
        case 2:
          this.isDisabledDivCade = true;
          break;
        default:
          break;
      }
    }
  }

  /**
   * Descripción: Validación de campos
   * @author fmendoza
   */
  campoNoValido(campo: string) {
    return (
      this.featuresForm.get(campo)?.invalid &&
      this.featuresForm.get(campo)?.touched
    );
  }

  /**
   * Descripción: Lista de errores del formulario features
   * @author fmendoza
   */
  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.featuresForm.get(nombreCampo)?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    // if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    // if (errors?.['maxlength']) return 'No puede superar los 250 caracteres.';
    // if (errors?.['min']) return 'Debe ser de mínimo 1';
    // if (errors?.['max'])
    //   return 'Debe ser máximo de ' + VALOR_MAXIMO_CARACTERES_CLASIFICADOR;
    // if (errors?.['pattern'] && nombreCampo === 'Descripcion')
    //   return 'No se permiten espacios ni caracteres especiales.';
    // if (errors?.['pattern'] && nombreCampo === 'TopeCaracteres')
    //   return 'No puede contener caracteres de texto.';

    return '';
  }

  /**
   * Metodo para mostrar los mensajes en toast
   * @author fmendoza
   */
  public showMessage(detail: string, severity: string, summary: string): void {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}

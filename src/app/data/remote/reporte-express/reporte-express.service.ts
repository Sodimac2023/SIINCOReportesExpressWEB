import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { firstValueFrom } from 'rxjs';
import { URLACCION, URLQUERYS } from 'src/app/core/constant/url-api';
import { ISolicitudConsulta } from 'src/app/domain/interface/solicitudConsulta.interface';
import { } from 'rxjs/operators';

/**
 * Servicio para gestionar las operaciones relacionadas con el reporte express.
 * @author fespana
 */
@Injectable({
  providedIn: 'root'
})
export class ReporteExpressService {
  public urlSiincoReporteExpress = `${environment.apiSiicoReporteExpress}/${URLQUERYS.querys}/${URLQUERYS.restapiv1}`;

  constructor(private _apiRequestService: ApiRequestService) { }

  /**
   * Obtiene los datos de consulta disponibles.
   * @returns Un objeto Promise que se resuelve con los datos de consulta.
   */
  public GetQuerys<T>(): Promise<T> {
    return firstValueFrom(
      this._apiRequestService.get<T>(`${this.urlSiincoReporteExpress}/${URLACCION.getQuerysDisponibles}`)
    );
  }

  /**
   * Envia una solicitud de consulta de reporte express.
   * @param data - Los datos de la solicitud de consulta.
   * @returns Un objeto Promise que se resuelve con la respuesta.
   */
  public PostEnviarSolicitudConsulta<T>(data: ISolicitudConsulta): Promise<T> {
    return this._apiRequestService.post<T>(`${this.urlSiincoReporteExpress}/${URLACCION.postEnviarSolicitudConsulta}`, data);
  }
}

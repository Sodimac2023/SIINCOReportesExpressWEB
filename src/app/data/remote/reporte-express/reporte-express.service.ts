import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import {firstValueFrom } from 'rxjs';
import { URLACCION, URLQUERYS } from 'src/app/core/constant/url-api';
import { ISolicitudConsulta } from 'src/app/domain/interface/solicitudConsulta.interface';
import { } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReporteExpressService {
  public urlSiincoReporteExpress = `${environment.apiSiicoReporteExpress}/${URLQUERYS.querys}/${URLQUERYS.restapiv1}`;

  constructor(  private _apiRequestService: ApiRequestService) { }

  public GetQuerys<T>(): Promise<T> {
    return firstValueFrom(
      this._apiRequestService.get<T>(`${this.urlSiincoReporteExpress}/${URLACCION.getQuerysDisponibles}`)
    );
  }

  public PostEnviarSolicitudConsulta<T>(data: ISolicitudConsulta): Promise<T> {
    return this._apiRequestService.postNew<T>(`${this.urlSiincoReporteExpress}/${URLACCION.postEnviarSolicitudConsulta}`, data);
  }
}

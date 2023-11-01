import { Injectable } from '@angular/core';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ReporteExpressService } from 'src/app/data/remote/reporte-express/reporte-express.service';
import { ISolicitudConsulta } from '../../interface/solicitudConsulta.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteExpressSateService {

  constructor(private _reporteExpressServices : ReporteExpressService) { }

  public GetQuerys(): Promise<IRespuestaApi> {
    return this._reporteExpressServices.GetQuerys();
  }

  public PostEnviarSolicitudConsulta(data: ISolicitudConsulta): Promise<IRespuestaApi> {
    return this._reporteExpressServices.PostEnviarSolicitudConsulta(data);
  }
}

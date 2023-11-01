import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { FeaturesService } from 'src/app/data/remote/features/features.service';
import { ICostoImportados } from '../../interface/costoImportados.interface';

@Injectable({
  providedIn: 'root',
})
export class FeaturesStateService {
  constructor(private _featuresService: FeaturesService) {}

  public AsyncdatosProducto(idProducto: number): Promise<IRespuestaApi> {
    return this._featuresService.AsyncdatosProducto(idProducto);
  }
  public asd(sku: number): Observable<IRespuestaApi> {
    return this._featuresService.asd(sku);
  }

  public datosProductoPIM(sku: string): Observable<IRespuestaApi> {
    return this._featuresService.datosProductoPIM(sku);
  }

  public CostoImportados(data: ICostoImportados): Observable<IRespuestaApi> {
    return this._featuresService.CostoImportados(data);
  }

  public Precios(data: ICostoImportados): Observable<IRespuestaApi> {
    return this._featuresService.Precios(data);
  }

  public MargenVpcPromedio(data: ICostoImportados): Observable<IRespuestaApi> {
    return this._featuresService.MargenVpcPromedio(data);
  }
}

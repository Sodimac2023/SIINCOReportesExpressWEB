import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ApiRequestService } from '../../../core/services/api-request.service';
import { URLCONTROLADOR, URLACCION } from '../../../core/constant/url-api';
import { environment } from '../../../../environments/environment';
import { BaseService } from 'src/app/core/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICostoImportados } from 'src/app/domain/interface/costoImportados.interface';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService extends BaseService {
  public urlMultitask = `${environment.apiMultitask}/${URLCONTROLADOR.producto}`;
  public urlPIM = `${environment.apiPIM}/${URLCONTROLADOR.restapiv2}`;
  public urlCostoImportados = `${environment.apiCostoImportados}/${URLCONTROLADOR.costo}`;
  public urlPrecios = `${environment.apiCostoImportados}/${URLCONTROLADOR.precio}`;
  public urlMargenVpcPromedio = `${environment.apiMultitask}/${URLCONTROLADOR.margen}`;

  constructor(
    private _apiRequestService: ApiRequestService,
    private http: HttpClient
  ) {
    super();
  }

  // public datosProducto<T>(idProducto: number): Observable<T> {
  //   return this._apiRequestService.get<T>(`${this.urlMultitask}/${idProducto}`);
  // }

  public AsyncdatosProducto<T>(idProducto: number): Promise<T> {
    return firstValueFrom(
      this._apiRequestService.get<T>(`${this.urlMultitask}/${idProducto}`)
    );
  }

  public asd<T>(sku: number): Observable<T> {
    return this._apiRequestService.get<T>(
      `${this.urlMultitask}/${URLACCION.getBySkuPrecio}?parametroBusqueda=${sku}`
    );
  }

  public datosProductoPIM<T>(sku: string): Observable<T> {
    // return this._apiRequestService.getPIM<T>(
    //   `${this.urlPIM}/${sku}?keyId=SKU&context=ES%20CO`
    // );
    return this.http.get<T>(`${this.urlPIM}/${sku}`, {
      headers: {
        // 'Content-Type': 'application/octet-stream',
        Authorization:
          'Basic ' + window.btoa('API DATALOG' + ':' + 'Datalog23'),
      },
      params: {
        keyId: 'SKU',
        context: 'ES CO',
      },
    });
  }

  public CostoImportados<T>(data: ICostoImportados): Observable<T> {
    return this._apiRequestService.post<T>(`${this.urlCostoImportados}`, data);
  }

  public Precios<T>(data: ICostoImportados): Observable<T> {
    return this._apiRequestService.post<T>(`${this.urlPrecios}`, data);
  }

  public MargenVpcPromedio<T>(data: ICostoImportados): Observable<T> {
    return this._apiRequestService.post<T>(
      `${this.urlMargenVpcPromedio}`,
      data
    );
  }
}

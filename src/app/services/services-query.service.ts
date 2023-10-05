import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesQueryService {

  constructor(private httpClient: HttpClient) {}

  obtenerDatosDeAPI(queryString: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { queryString: queryString };
    return this.httpClient.post<any>('https://localhost:7297/api/ConsultasWeb/ExecuteQuery', body, { headers });
  }
}

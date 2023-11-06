import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { SodimacConstant } from '../../core/constant/constantes';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  protected generateBasicHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  protected generateAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const usuarioSesion = sessionStorage.getItem('UsuarioSesion');
    if (usuarioSesion !== null) {
      headers = headers.append('User', usuarioSesion);
    }
    return headers;
  }

  protected generateOnlyAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders();

    const userHeader = window.sessionStorage.getItem(
      SodimacConstant.localStorageSet.userHeaderName
    );
    const tokenHeader = window.sessionStorage.getItem(
      SodimacConstant.localStorageSet.tokenHeaderName
    );

    if (userHeader !== null) {
      headers.set(SodimacConstant.headers.userHeaderName, userHeader);
    }

    if (tokenHeader !== null) {
      headers.set(SodimacConstant.headers.tokenHeaderName, tokenHeader);
    }
    return headers;
  }
  protected configureAuthHeadersXmlHttpRequest(request: XMLHttpRequest) {
    request.setRequestHeader('content-type', 'application/json');

    const userHeader = window.sessionStorage.getItem(
      SodimacConstant.localStorageSet.userHeaderName
    );
    const tokenHeader = window.sessionStorage.getItem(
      SodimacConstant.localStorageSet.tokenHeaderName
    );

    if (userHeader !== null) {
      request.setRequestHeader(
        SodimacConstant.headers.userHeaderName,
        userHeader
      );
    }

    if (tokenHeader !== null) {
      request.setRequestHeader(
        SodimacConstant.headers.tokenHeaderName,
        tokenHeader
      );
    }
  }
}

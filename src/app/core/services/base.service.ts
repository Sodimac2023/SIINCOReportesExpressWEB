import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { SodimacConstant } from '../../core/constant/constantes';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  /**
   * Genera encabezados básicos para las solicitudes HTTP.
   * @returns HttpHeaders con el tipo de contenido 'application/json'.
   */
  protected generateBasicHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  /**
   * Genera encabezados de autenticación para las solicitudes HTTP.
   * Agrega los encabezados de usuario si hay una sesión de usuario activa.
   * @returns HttpHeaders con encabezados de usuario si está en sesión.
   */
  protected generateAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const usuarioSesion = sessionStorage.getItem('UsuarioSesion');
    if (usuarioSesion !== null) {
      headers = headers.append('User', usuarioSesion);
    }
    return headers;
  }

  /**
   * Genera encabezados de autenticación sin encabezados adicionales.
   * Utilizado para solicitudes de autenticación.
   * @returns HttpHeaders para autenticación sin encabezados adicionales.
   */
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

  /**
   * Configura los encabezados de autenticación en una solicitud XMLHttpRequest.
   * @param request - La solicitud XMLHttpRequest en la que se configuran los encabezados.
   */
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

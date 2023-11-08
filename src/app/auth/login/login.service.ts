import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../../core/interface/user.interface';
import { BaseService } from '../../core/services/base.service';
import { environment } from 'src/environments/environment';
import * as fromResultSeguridad from '../../core/interface/result-seguridad.model';

const USER_DATA = 'USER_DATA';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(private _routerService: Router, private http: HttpClient) {
    super();
  }

  /**
   * Establece los datos del usuario en el almacenamiento de sesión.
   * @param user - Datos del usuario
   * @param empty - Indica si se deben borrar los datos actuales del usuario.
   */
  setData(
    user: fromResultSeguridad.ResultSeguridad,
    empty: boolean = false
  ): void {
    if (empty) {
      user = fromResultSeguridad.EmptyResultSeguridad();
    }
    sessionStorage.setItem(USER_DATA, JSON.stringify(user));
  }

  /**
   * Obtiene los datos del usuario almacenados en el almacenamiento de sesión.
   * @returns Los datos del usuario o un objeto vacío si no se encuentran datos.
   */
  getData(): fromResultSeguridad.ResultSeguridad {
    const userData = sessionStorage.getItem(USER_DATA);
    if (userData !== null) {
      const userDataParsed: fromResultSeguridad.ResultSeguridad =
        JSON.parse(userData);
      if (userDataParsed) {
        return userDataParsed;
      }
    }
    return fromResultSeguridad.EmptyResultSeguridad();
  }

  /**
   * Realiza una solicitud de inicio de sesión al servidor.
   * @param usuario - Datos del usuario para iniciar sesión.
   * @returns Una promesa que resuelve en el resultado de seguridad.
   */
  login(usuario: Usuario): Promise<fromResultSeguridad.ResultSeguridad> {
    const url = `${environment.urlAuthentication}AuthenticateLDAP`;
    return new Promise<fromResultSeguridad.ResultSeguridad>(
      (resolve, reject) => {
        this.http
          .post<fromResultSeguridad.ResultSeguridad>(url, usuario, {
            headers: this.generateBasicHeaders(),
          })
          .subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }

  /**
   * Obtiene el último usuario logueado.
   * @returns Una respuesta que contiene el último usuario logueado.
   */
  lastUser() {
    return this.http.get<string>(`${environment.urlAuthentication}LastUser`, {
      headers: this.generateBasicHeaders(),
    });
  }

  /**
   * Cierra la sesión del usuario y redirige al inicio de sesión.
   */
  logout() {
    sessionStorage.removeItem(USER_DATA);
    this._routerService.navigate(['/login']);
  }
}

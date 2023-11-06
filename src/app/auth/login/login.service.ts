
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { Usuario } from "../../core/interface/user.interface";
import { BaseService } from "../../core/services/base.service";
import { environment } from "src/environments/environment";
import * as fromResultSeguridad from "../../core/interface/result-seguridad.model";
import { URLCONTROLADOR } from "../../core/constant/url-api";
const USER_DATA = "USER_DATA";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  constructor(private _routerService: Router, private http: HttpClient) {
    super();
  }

  setData(
    user: fromResultSeguridad.ResultSeguridad,
    empty: boolean = false
  ): void {
    if (empty) {
      user = fromResultSeguridad.EmptyResultSeguridad();
    }
    sessionStorage.setItem(USER_DATA, JSON.stringify(user));
  }

  getData(): fromResultSeguridad.ResultSeguridad {
    const userData = sessionStorage.getItem(USER_DATA);
    if (userData !== null) {
      const userDataParsed: fromResultSeguridad.ResultSeguridad = JSON.parse(userData);
      if (userDataParsed) {
        return userDataParsed;
      }
    }
    return fromResultSeguridad.EmptyResultSeguridad();
    
  }

  login(usuario: Usuario) {
    return this.http.post<fromResultSeguridad.ResultSeguridad>(
      `${environment.urlAuthentication}AuthenticateLDAP`,
      usuario,
      { headers: this.generateBasicHeaders() }
    );
  }

  lastUser() {
    return this.http.get<string>(
      `${environment.urlApi}${URLCONTROLADOR.login}LastUser`,
      { headers: this.generateBasicHeaders() }
    );
  }

  logout() {
    sessionStorage.removeItem(USER_DATA);
    this._routerService.navigate(["/auth"]);
  }
}

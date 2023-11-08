import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from 'src/app/auth/login/login.service';

/**
 * Clase para valdiar acceso al Router
 * @author fespana
 */
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private _seguridad: LoginService) {}

  public isUserAuthenticated: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._seguridad.getData().EstadoProceso) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad(route: Route): boolean {
    return true;
  }
}

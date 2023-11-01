import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * Clase para valdiar acceso al Router
 */
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  public isUserAuthenticated: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }

  canLoad(route: Route): boolean {
    return true;
  }
}

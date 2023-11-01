import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';

@Injectable()
export class HttpAuthorizationService implements HttpInterceptor {
  constructor(private _localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem(this._localStorageService.getTokenStorage);
    let authReq = req;
    if (token) {
      token = 'Bearer ' + token.replace('"', '').replace('"', '');
      authReq = req.clone({ setHeaders: { Authorization: token } });
    }
    return next.handle(authReq).pipe(
      tap(
        (success: HttpEvent<any>) => {},
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
          }
        }
      )
    );
  }
}

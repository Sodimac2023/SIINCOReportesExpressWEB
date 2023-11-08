import { Injectable } from '@angular/core';
import { User } from 'src/app/core/interface/user.interface';
import { environment } from 'src/environments/environment';

/**
 * Servicio para gestionar el almacenamiento local (localStorage).
 * @author fespana
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage: Storage;

  constructor() {
    this._localStorage = localStorage;
  }

  /**
   * Obtiene los datos del usuario almacenados en localStorage.
   * @returns Los datos del usuario.
   */
  public getUserStorage(): User {
    let _storage: User = JSON.parse(
      this._localStorage.getItem(environment.userStorage) || ''
    );
    return _storage;
  }

  /**
   * Almacena los datos del usuario en localStorage.
   * @param value - Los datos del usuario a almacenar.
   */
  public setUserStorage(value: any) {
    this._localStorage.setItem(environment.userStorage, value);
  }

  /**
   * Obtiene el token de acceso almacenado en localStorage.
   * @returns El token de acceso.
   */
  public get getTokenStorage(): string {
    return this._localStorage.getItem(environment.tokenStorage) || '';
  }

  /**
   * Borra todos los datos almacenados en localStorage.
   */
  public clearAllLocalStorage() {
    this._localStorage.clear();
  }
}

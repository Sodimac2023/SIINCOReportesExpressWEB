import { Injectable } from '@angular/core';
import { User } from 'src/app/core/interface/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage: Storage;

  constructor() {
    this._localStorage = localStorage;
  }

  /**
   *
   * @returns
   */
  public getUserStorage(): User {
    let _storage: User = JSON.parse(
      this._localStorage.getItem(environment.userStorage) || ''
    );
    return _storage;
  }

  /**
   *
   * @param key
   * @param value
   */
  public setUserStorage(value: any) {
    this._localStorage.setItem(environment.userStorage, value);
  }

  /**
   *
   * @returns
   */
  public get getTokenStorage(): string {
    return this._localStorage.getItem(environment.tokenStorage) || '';
  }

  /**
   *
   */
  public clearAllLocalStorage() {
    this._localStorage.clear();
  }
}

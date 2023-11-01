import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();
  public menuSource$ = this.menuSource.asObservable();
  public resetSource$ = this.resetSource.asObservable();

  public onMenuStateChange(event: MenuChangeEvent): void {
    this.menuSource.next(event);
  }

  public reset(): void {
    this.resetSource.next(true);
  }
}

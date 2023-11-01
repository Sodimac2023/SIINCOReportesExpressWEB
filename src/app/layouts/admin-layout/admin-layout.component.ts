import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../core/services/ui/app.layout.service';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  public showHeader: boolean = environment.showHeader;
  public showMenu: boolean = environment.showMenu;
  public showFooter: boolean = environment.showFooter;
  public itemBreadcrumb: any;
  public itemBreadcrumb$!: Observable<any>;

  constructor(
    public _layoutService: LayoutService,
    public _activatedRoute: ActivatedRoute
  ) {}
  public items!: MenuItem[];
  public home!: MenuItem;
  ngOnInit(): void {
    this.itemBreadcrumb$ = of<any>(location);
    this.itemBreadcrumb$.subscribe({
      next: (response) => {
        // console.log('admin-layout.component LINE 26 =>', response);
      },
    });
    this.items = [
      { label: 'Seguridad' },
      { label: 'Entidades y usuarios' },
      { label: 'Tramites y privilegios' },
      { label: 'Registrar solicitud de usuario' },
    ];
    this.home = { icon: 'pi pi-home' };
  }

  public get containerClass(): any {
    return {
      'layout-theme-light': this._layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this._layoutService.config.colorScheme === 'dark',
      'layout-overlay': this._layoutService.config.menuMode === 'overlay',
      'layout-static': this._layoutService.config.menuMode === 'static',
      'layout-static-inactive':
        this._layoutService.state.staticMenuDesktopInactive &&
        this._layoutService.config.menuMode === 'static',
      'layout-overlay-active': this._layoutService.state.overlayMenuActive,
      'layout-mobile-active': this._layoutService.state.staticMenuMobileActive,
      'p-input-filled': this._layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this._layoutService.config.ripple,
    };
  }
}

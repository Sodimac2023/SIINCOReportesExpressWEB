import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayoutService } from '../../services/ui/app.layout.service';
import { MenuService } from '../../services/ui/app.menu.service';

@Component({
  selector: '[app-menuitem]',
  template: ` <!-- Contenido del menú --> `,
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
        })
      ),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuitemComponent implements OnInit, OnDestroy {
  @Input() item: any;
  @Input() index!: number;
  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;
  @Input() parentKey!: string;
  public active = false;
  public menuSourceSubscription: Subscription;
  public menuResetSubscription: Subscription;
  public key: string = '';

  constructor(
    public layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    public router: Router,
    private menuService: MenuService
  ) {
    // Suscripción para el estado del menú
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (value) => {
        Promise.resolve(null).then(() => {
          if (value.routeEvent) {
            // Actualiza el estado activo basado en la ruta
            this.active =
              value.key === this.key || value.key.startsWith(this.key + '-')
                ? true
                : false;
          } else {
            if (
              value.key !== this.key &&
              !value.key.startsWith(this.key + '-')
            ) {
              this.active = false;
            }
          }
        });
      }
    );

    // Suscripción para reiniciar el menú
    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    // Observa los eventos de navegación para actualizar el estado activo
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((params) => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  ngOnInit() {
    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);
    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  /**
   * Actualiza el estado activo basado en la ruta actual.
   */
  public updateActiveStateFromRoute(): void {
    let activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });
    if (activeRoute) {
      this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }

  /**
   * Maneja el clic en un elemento del menú.
   * Realiza acciones como ejecutar un comando, expandir/cerrar el menú desplegable, etc.
   */
  public itemClick(event: Event): void {
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }
    if (this.item.items) {
      this.active = !this.active;
    }
    this.menuService.onMenuStateChange({ key: this.key });
  }

  /**
   * Obtiene el estado de la animación del submenú (expandido o colapsado).
   */
  public get submenuAnimation(): 'collapsed' | 'expanded' {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
  }

  @HostBinding('class.active-menuitem')
  public get activeClass(): boolean {
    return this.active && !this.root;
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }
    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}

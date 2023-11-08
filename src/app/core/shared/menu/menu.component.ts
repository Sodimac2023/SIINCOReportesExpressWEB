import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/ui/app.layout.service';

/**
 * Componente de menu 
 * @author fespana
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public model: any[] = [];
  constructor(private _layoutService : LayoutService) {}

  ngOnInit(): void {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/home'],
            command: () => {
              this._layoutService.onMenuToggle();
            },
          },
        ],
      },
      {
        label: 'Reporte Express',
        items: [
          {
            label: 'Reporte Express',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/reporte-express'],
            command: () => {
              this._layoutService.onMenuToggle();
            },
          },
        ],
      },
    ];
  }

}

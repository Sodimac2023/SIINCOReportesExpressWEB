import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public model: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/home'],
          },
        ],
      },
      {
        label: 'Features',
        items: [
          {
            label: 'Features',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/features'],
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
          },
        ],
      },
    ];
  }
}

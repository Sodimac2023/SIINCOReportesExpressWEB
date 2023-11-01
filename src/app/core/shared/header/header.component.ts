import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/ui/app.layout.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public titulo: string;
  public version: string;
  constructor(public layoutService: LayoutService) {
    this.titulo = environment.titleApp;
    this.version = environment.version;
  }

  ngOnInit(): void {}
}

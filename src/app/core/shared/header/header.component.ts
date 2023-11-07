import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/ui/app.layout.service';
import { environment } from '../../../../environments/environment';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public titulo: string;
  public version: string;
  public name?:string ='';
  public cargo?:string ='';


  constructor(public layoutService: LayoutService ,private _seguridad: LoginService) {
    this.titulo = environment.titleApp;
    this.version = environment.version;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    let data = this._seguridad.getData();
    this.name = data.Data?.Name;
    this.cargo = data.Data?.Cargo;
  }
  
}

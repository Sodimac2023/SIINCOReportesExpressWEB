import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AppMenuitemComponent } from './menu/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    AppMenuitemComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule, BadgeModule],
  exports: [FooterComponent, HeaderComponent, MenuComponent],
})
export class SharedModule {}

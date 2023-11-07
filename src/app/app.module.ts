import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { LayoutsModule } from './layouts/layouts.module';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { Page404Component } from './core/page404/page404.component';
import { SharedModule } from './core/shared/shared.module';
import { HttpAuthorizationService } from './core/interceptor/http-authorization.service';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#007bff',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#007bff',
  fgsPosition: 'center-center',
  fgsSize: 80,
  fgsType: 'ball-spin-clockwise',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: 'assets/Logo.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40,40,40,0.43)',
  pbColor: '#007bff',
};
export const httpInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthorizationService,
    multi: true,
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
];

@NgModule({
  declarations: [AppComponent, Page404Component],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LayoutsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    MenuModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

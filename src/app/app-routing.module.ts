import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './core/page404/page404.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { environment } from '../environments/environment';
import { ReporteExpressComponent } from './pages/reporte-express/reporte-express/reporte-express.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: environment.featurePage,
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate :[AuthGuard],
    children: [
      {
        path: 'reporte-express',
        loadChildren: () =>
          import('./pages/reporte-express/reporte-express.module').then(
            (m) => m.ReporteExpressModule
          ),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./auth/auth.module').then(
            (m) => m.AuthModule
          ),
      },
    ],
  },
  {
    path: 'reporte-express-component',
    component: ReporteExpressComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard], 
})
export class AppRoutingModule {}

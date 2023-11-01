import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './core/page404/page404.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { environment } from '../environments/environment';
import { FeaturesComponent } from './pages/features/features/features.component';
import { ReporteExpressComponent } from './pages/reporte-express/reporte-express/reporte-express.component';

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
    children: [
      {
        path: 'features',
        loadChildren: () =>
          import('./pages/features/features.module').then(
            (m) => m.FeaturesModule
          ),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
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
    path: 'reporte-express-component',
    component: ReporteExpressComponent,
    pathMatch: 'full',
  },
  {
    path: 'skufeatures',
    component: FeaturesComponent,
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
})
export class AppRoutingModule {}

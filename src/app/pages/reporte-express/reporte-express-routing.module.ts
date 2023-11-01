import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteExpressComponent } from './reporte-express/reporte-express.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReporteExpressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteExpressRoutingModule { }

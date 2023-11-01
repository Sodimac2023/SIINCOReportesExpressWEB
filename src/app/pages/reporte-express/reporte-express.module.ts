import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteExpressComponent } from './reporte-express/reporte-express.component';
import { ReporteExpressRoutingModule } from './reporte-express-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ReporteExpressComponent],
  imports: [
    CommonModule, 
    ReporteExpressRoutingModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    BlockUIModule,
    ToastModule,
    HttpClientModule,
    NgxPaginationModule,
  ]
})
export class ReporteExpressModule {}

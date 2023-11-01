import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesComponent } from './features/features.component';
import { SharedModule } from '../../core/shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { OnlyNumbersDirective } from 'src/app/core/directive/only-numbers.directive';

@NgModule({
  declarations: [FeaturesComponent, OnlyNumbersDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FeaturesRoutingModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    BlockUIModule,
    ToastModule,
  ],
})
export class FeaturesModule {}

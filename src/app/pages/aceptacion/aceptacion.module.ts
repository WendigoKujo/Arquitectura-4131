import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceptacionPageRoutingModule } from './aceptacion-routing.module';

import { AceptacionPage } from './aceptacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceptacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AceptacionPage]
})
export class AceptacionPageModule {}

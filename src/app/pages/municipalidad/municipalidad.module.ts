import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MunicipalidadPageRoutingModule } from './municipalidad-routing.module';

import { MunicipalidadPage } from './municipalidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MunicipalidadPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MunicipalidadPage]
})
export class MunicipalidadPageModule {}

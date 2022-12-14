import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionPageRoutingModule } from './inscripcion-routing.module';

import { InscripcionPage } from './inscripcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionPageRoutingModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  declarations: [InscripcionPage]
})
export class InscripcionPageModule {}

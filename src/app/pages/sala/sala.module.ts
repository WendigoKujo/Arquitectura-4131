import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalaPageRoutingModule } from './sala-routing.module';

import { SalaPage } from './sala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SalaPage]
})
export class SalaPageModule {}

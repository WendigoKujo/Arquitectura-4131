import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunaPageRoutingModule } from './comuna-routing.module';

import { ComunaPage } from './comuna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ComunaPage]
})
export class ComunaPageModule {}

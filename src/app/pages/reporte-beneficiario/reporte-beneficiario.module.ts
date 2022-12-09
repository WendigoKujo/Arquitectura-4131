import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteBeneficiarioPageRoutingModule } from './reporte-beneficiario-routing.module';

import { ReporteBeneficiarioPage } from './reporte-beneficiario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteBeneficiarioPageRoutingModule
  ],
  declarations: [ReporteBeneficiarioPage]
})
export class ReporteBeneficiarioPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteBeneficiarioPage } from './reporte-beneficiario.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteBeneficiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteBeneficiarioPageRoutingModule {}

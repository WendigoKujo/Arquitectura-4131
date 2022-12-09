import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipalidadPage } from './municipalidad.page';

const routes: Routes = [
  {
    path: '',
    component: MunicipalidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipalidadPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceptacionPage } from './aceptacion.page';

const routes: Routes = [
  {
    path: '',
    component: AceptacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceptacionPageRoutingModule {}

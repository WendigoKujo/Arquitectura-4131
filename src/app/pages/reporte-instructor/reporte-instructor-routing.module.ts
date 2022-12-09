import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteInstructorPage } from './reporte-instructor.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteInstructorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteInstructorPageRoutingModule {}

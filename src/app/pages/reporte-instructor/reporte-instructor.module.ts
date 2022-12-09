import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteInstructorPageRoutingModule } from './reporte-instructor-routing.module';

import { ReporteInstructorPage } from './reporte-instructor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteInstructorPageRoutingModule
  ],
  declarations: [ReporteInstructorPage]
})
export class ReporteInstructorPageModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [

      {
        path: 'administrador/:id',
        loadChildren: () => import('../administrador/administrador.module').then( m => m.AdministradorPageModule)
      },
      {
        path: 'inscripcion/:id',
        loadChildren: () => import('../inscripcion/inscripcion.module').then( m => m.InscripcionPageModule)
      },
      {
        path: 'taller/:id',
        loadChildren: () => import('../taller/taller.module').then( m => m.TallerPageModule)
      },
      {
        path: 'sala',
        loadChildren: () => import('../sala/sala.module').then( m => m.SalaPageModule)
      },
      {
        path: 'municipalidad',
        loadChildren: () => import('../municipalidad/municipalidad.module').then( m => m.MunicipalidadPageModule)
      },
      {
        path: 'curso',
        loadChildren: () => import('../curso/curso.module').then( m => m.CursoPageModule)
      },
      {
        path: 'material',
        loadChildren: () => import('../material/material.module').then( m => m.MaterialPageModule)
      },
      {
        path: 'comuna',
        loadChildren: () => import('../comuna/comuna.module').then( m => m.ComunaPageModule)
      },
      {
        path: 'aceptacion',
        loadChildren: () => import('../aceptacion/aceptacion.module').then( m => m.AceptacionPageModule)
      },
      {
        path: 'opinion',
        loadChildren: () => import('../opinion/opinion.module').then( m => m.OpinionPageModule)
      },
      {
        path: 'pago',
        loadChildren: () => import('../pago/pago.module').then( m => m.PagoPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

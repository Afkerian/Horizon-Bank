import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListarClienteComponent } from './component/listar-cliente/listar-cliente.component';

import { CrearClienteComponent } from './component/crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },
  {
    path: 'crear-cliente',
    component: CrearClienteComponent
  },
  {
    path: 'editar-cliente/:id',
    component: CrearClienteComponent
  },
  {
    path: '**',
    redirectTo: '', pathMatch:'full' 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarClienteComponent } from './component/listar-cliente/listar-cliente.component';
import { CrearClienteComponente} from './component/crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: CrearClienteComponente
  },
  {
    path: 'clientes',
    component: ListarClienteComponent
  },
  {
    path: 'clientes/add',
    component: ListarClienteComponent
  },
  {
    path: 'clientes/edit/:id',
    component: ListarClienteComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
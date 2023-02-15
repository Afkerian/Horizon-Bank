import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListarClienteComponent } from './component/listar-cliente/listar-cliente.component';
<<<<<<< HEAD
import { CrearClienteComponente} from './component/crear-cliente/crear-cliente.component';
import { NavigationComponent } from './component/navigation/navigation.component';
=======

import { CrearClienteComponent } from './component/crear-cliente/crear-cliente.component';
>>>>>>> eli

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
<<<<<<< HEAD
    path: 'clientes/edit/:id',
    component: ListarClienteComponent
  },
  {
    path: 'clientes/navigation',
    component: NavigationComponent
=======
    path: '**',
    redirectTo: '', pathMatch:'full' 
>>>>>>> eli
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
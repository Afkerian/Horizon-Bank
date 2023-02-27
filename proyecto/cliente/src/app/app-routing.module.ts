import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CrearclienteComponent } from './components/crearcliente/crearcliente.component';
import { DetalleclienteComponent } from './components/detallecliente/detallecliente.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EditarclienteComponent } from './components/editarcliente/editarcliente.component';

const routes: Routes = [
  {path:'inicio',component:HomeComponent},
  //Donde estas todos los clientes
  {path:'clientes',component:ClientesComponent},
  //Me dirige a la creacion del cliente
  {path:'crear-cliente',component:CrearclienteComponent},
 
  {path:'contacto',component:ContactoComponent},
   //detalle del cliente
  {path:'cliente/:id',component:DetalleclienteComponent},
  //editar al cliente
  {path:'editar-cliente/:id',component:EditarclienteComponent},
  {path:'**',component:HomeComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

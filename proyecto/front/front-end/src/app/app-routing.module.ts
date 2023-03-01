import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";

const routes: Routes = [

  { path: 'inicio', component: InicioComponent },
  { path: '**', component: InicioComponent } //en caso de error 404, no carga
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

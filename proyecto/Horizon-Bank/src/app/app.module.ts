import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearclienteComponent } from './component/crearcliente/crearcliente.component';
import { HomeComponent } from './home/home.component';
import { EncabezadoComponent } from './component/encabezado/encabezado.component';
import { PieComponent } from './component/pie/pie.component';
import { ContactoComponent } from './component/contacto/contacto.component';
import { ClientesComponent } from './component/clientes/clientes.component';
import { DetalleclienteComponent } from './component/detallecliente/detallecliente.component';
import { EditarclienteComponent } from './component/editarcliente/editarcliente.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    CrearclienteComponent,
    HomeComponent,
    EncabezadoComponent,
    PieComponent,
    ContactoComponent,
    ClientesComponent,
    DetalleclienteComponent,
    EditarclienteComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { SesionComponent } from './sesion/sesion.component';
import { CuentaComponent } from './cuenta/cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    UsuarioComponent,
    SesionComponent,
    CuentaComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //para el modulo de rutas
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

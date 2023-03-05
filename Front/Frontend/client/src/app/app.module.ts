import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './components/registro/registro.component';
import { CBodyDirective } from './c-body.directive';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { VerUsuariosComponent } from './components/ver-usuarios/ver-usuarios.component';
import { MisCuentasComponent } from './components/mis-cuentas/mis-cuentas.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    CBodyDirective,
    UsuarioComponent,
    CuentaComponent,
    LoginComponent,
    LogoutComponent,
    CrearCuentaComponent,
    VerUsuariosComponent,
    MisCuentasComponent,
  

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

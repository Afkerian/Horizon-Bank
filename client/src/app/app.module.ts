import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'

// Componentes
import { AppComponent } from './app.component';
import { CrearClienteComponent } from './component/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './component/listar-cliente/listar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearClienteComponent,
    ListarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
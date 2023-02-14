import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { CrearClienteComponente} from './component/crear-cliente/crear-cliente.component';
import { ListarClienteComponent} from './component/listar-cliente/listar-cliente.component';

import { ClientesService } from './services/cliente.service'

@NgModule({
  declarations: [

    AppComponent,
    NavigationComponent,
    CrearClienteComponente,
    ListarClienteComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClientesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

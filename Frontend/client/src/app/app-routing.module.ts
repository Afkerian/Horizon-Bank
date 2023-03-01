import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { RegistroComponent } from "./registro/registro.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { SesionComponent } from "./sesion/sesion.component";
import { CuentaComponent } from "./cuenta/cuenta.component";


//array de rutas
const router: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'sesion', component: SesionComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: '**', component: InicioComponent } //en caso de error 404, no carga

];

//modulo de rutas, y agregar al app.module
@NgModule({
    imports: [RouterModule.forRoot(router)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
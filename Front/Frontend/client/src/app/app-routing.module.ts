import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { RegistroComponent } from "./registro/registro.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { CuentaComponent } from "./cuenta/cuenta.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";


//array de rutas
const router: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '**', component: InicioComponent } //en caso de error 404, no carga

];

//modulo de rutas, y agregar al app.module
@NgModule({
    imports: [RouterModule.forRoot(router)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
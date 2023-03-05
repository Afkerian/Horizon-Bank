import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { UsuarioComponent } from "./components/usuario/usuario.component";
import { CuentaComponent } from "./components/cuenta/cuenta.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { CrearCuentaComponent } from "./components/crear-cuenta/crear-cuenta.component";
import { VerUsuariosComponent } from "./components/ver-usuarios/ver-usuarios.component";


//array de rutas
const router: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'crear-cuenta', component: CrearCuentaComponent },
    { path: 'ver-usuarios', component: VerUsuariosComponent },
    { path: '**', component: InicioComponent } //en caso de error 404, no carga

];

//modulo de rutas, y agregar al app.module
@NgModule({
    imports: [RouterModule.forRoot(router)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
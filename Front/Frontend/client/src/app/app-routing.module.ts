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
import { TranferenciaComponent } from "./components/tranferencia/tranferencia.component";
import { VerCuentasComponent } from "./components/ver-cuentas/ver-cuentas.component";
import { MiComponenteComponent } from "./components/mi-componente/mi-componente.component";


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
    { path: 'mi-cuenta/:cedula', component: CuentaComponent },
    { path: 'transferencia/:id_cuenta', component: TranferenciaComponent},
    { path: 'ver-cuentas', component: VerCuentasComponent},
    {path: "mi-componente", component: MiComponenteComponent},
    { path: '**', component: InicioComponent } //en caso de error 404, no carga

];

//modulo de rutas, y agregar al app.module
@NgModule({
    imports: [RouterModule.forRoot(router)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
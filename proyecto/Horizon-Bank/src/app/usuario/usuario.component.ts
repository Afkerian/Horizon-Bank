import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  public nombres:string;
  public apellidos:string;
  public cedula:string;
  public email:string;
  public password:string;
  public fechaCreacion:string;

  constructor(){
    this.nombres="Nombres: "
    this.apellidos="Apellidos: "
    this.cedula="Cédula: "
    this.email="E-mail: "
    this.password="Password: "
    this.fechaCreacion="Fecha de Creación: "
  }

}

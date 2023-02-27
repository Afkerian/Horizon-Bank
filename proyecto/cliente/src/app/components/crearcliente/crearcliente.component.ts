import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { CargarService } from '../../services/cargar.service';
import { Cliente } from '../../models/cliente';
import { Global } from '../../services/global';

@Component({
  selector: 'app-crearcliente',
  templateUrl: './crearcliente.component.html',
  styleUrls: ['./crearcliente.component.css'],
  providers:[ClienteService,CargarService]
})
export class CrearclienteComponent implements OnInit {
  public titulo:string;
  public cliente:Cliente;
  public clienteGuardar:Cliente;
  public url:string;
  public status:string;
  public idGuardardo:string;
  

  constructor(
    private _clienteService:ClienteService
  ) {
    this.titulo="Ingresar un usuario";
    this.url=Global.url;
    this.cliente = new Cliente('','','','','');
    this.clienteGuardar=new Cliente('','','','','');
    this.status="";
    this.idGuardardo="";
   
   }

  ngOnInit(): void {
  }

  guardarCliente(form:NgForm){
    this._clienteService.guardarCliente(this.cliente).subscribe(
      response=>{
        if(response.cliente){
          this.clienteGuardar=response;
          this.status='success';
          console.log(response.cliente._id);
        }else{
            this.status='failed';
          }
        },
      
      error=>{
        console.log(<any>error);
      }
    );
  }

}

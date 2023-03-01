import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CargarService } from '../../services/cargar.service';
import { Cliente } from '../../models/cliente';
import { Global } from '../../services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editarcliente',
  templateUrl: '../crearcliente/crearcliente.component.html',
  styleUrls: ['./editarcliente.component.css'],
  providers:[ClienteService,CargarService]
})
export class EditarclienteComponent implements OnInit {
  public titulo:string;
  public cliente:Cliente;
  public clienteGuardar:Cliente;
  public url:string;
 
  public status:string;
  public idGuardado:string;

  constructor(
    private _clienteService:ClienteService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.titulo="EDITAR CLIENTE";
    this.url=Global.url;
    this.cliente=new Cliente("","","","","");
    this.clienteGuardar=new Cliente("","","","","");
    
    this.status='';
    this.idGuardado='';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      //console.log(id);
      this.getCliente(id);
    })
  }
  getCliente(id:String){
    this._clienteService.getCliente(id).subscribe(
      response=>{
        this.cliente=response.cliente;
        //console.log(this.cliente);
      },
      error=>{
        console.log(<any>error);
      }
    )
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
            this.clienteGuardar=response.cliente;
            this.status="success";
            form.reset();
            
          }
          
        },
        
      
      error=>{
        console.log(<any>error);
      }
    );
  }
}  

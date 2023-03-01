import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detallecliente',
  templateUrl: './detallecliente.component.html',
  styleUrls: ['./detallecliente.component.css'],
  providers:[ClienteService]
})
export class DetalleclienteComponent implements OnInit {
  public url:string;
  public cliente:Cliente;
  public confirm:boolean;

  constructor(
    private _clienteService:ClienteService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.cliente=new Cliente("","","","","");
    this.confirm=false;
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
      
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  setConfirm(confirm:boolean){
    this.confirm=confirm;
  }
  borrarCliente(id:String){
    this._clienteService.deleteCliente(id).subscribe(
      response=>{
        if(response.cliente){
          this._router.navigate(['/clientes']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}


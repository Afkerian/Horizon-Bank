import { Component, HostBinding, OnInit } from '@angular/core';

import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit{

  @HostBinding('class') classes = 'row';
  clientes: any = [];

  constructor(private clienteService: ClienteService){}

  ngOnInit(){
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getClientes().subscribe(
      res => {
        this.clientes = res;
      },
      err => console.error(err)
    )
  }

  deleteCliente(id:string){
    this.clienteService.deleteCliente(id).subscribe(
      res => {
        console.log(res);
        this.getClientes();
      },
      err => console.error(err)
    )
  }
}

import { Component } from '@angular/core';
import { Cuenta } from 'app/models/cuenta';
import { CargarService } from 'app/services/cargar.service';
import { Global } from 'app/services/global';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
  providers: [CargarService]
})
export class CuentaComponent {
  public cuentas:Array<Cuenta>=[]
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _cargarservice:CargarService
  ){
  }
  ngOnInit(): void {
    this.obtenerCuentas()
  }
  public obtenerCuentas(){
    let data:string=Global.cedula
    this._cargarservice.getCuentasCliente(data).subscribe({
      next: response => {
        let data=response
        this.cuentas=data.cuentas
        console.log(this.cuentas)
      },
      error: error => console.log("Error, no se han podido cargar los datos"),
      complete: () => console.info('complete') 
  })
  }
}

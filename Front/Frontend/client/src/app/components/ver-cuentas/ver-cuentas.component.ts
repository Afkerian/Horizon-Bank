import { Component } from '@angular/core';
import { Cuenta } from 'app/models/cuenta';
import { CargarService } from 'app/services/cargar.service';
@Component({
  selector: 'app-ver-cuentas',
  templateUrl: './ver-cuentas.component.html',
  styleUrls: ['./ver-cuentas.component.css'],
  providers: [CargarService]
})
export class VerCuentasComponent {
  public cuentas:Array<Cuenta>=[]
    constructor(
      private _cargarservice:CargarService
    ){
    }
    ngOnInit(): void {
      this.obtenerCuentas()
    }
    public obtenerCuentas(){
      this._cargarservice.getCuentas().subscribe({
        next: response => {
          let data=response
          this.cuentas=data.cuentas
        },
        error: error => console.log("Error, no se han podido cargar los datos"),
        complete: () => console.info('complete') 
    })
  }
}

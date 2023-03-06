import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Cuenta } from 'app/models/cuenta';
import { CargarService } from 'app/services/cargar.service';
import { Global } from 'app/services/global';
@Component({
  selector: 'app-tranferencia',
  templateUrl: './tranferencia.component.html',
  styleUrls: ['./tranferencia.component.css'],
  providers: [CargarService]
})
export class TranferenciaComponent  {
  public cuentaATransferir:string;
  public monto:string;
  public cuenta:string;
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _cargarservice:CargarService
  ){
    this.cuentaATransferir=""
    this.monto=""
    this.cuenta=""
  }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let cuenta=params['id_cuenta']
      this.cuenta=cuenta
    })
  }
  public tranferencia(){
    let data:any={account:this.cuenta, destination_account:this.cuentaATransferir, monto:this.monto}
    this._cargarservice.transferencia(data).subscribe({
      next: response => {
        
        let data=response
        if(data.flag){
          alert(data.message)
        }else{
          alert(data.message)
        }
        this.cuentaATransferir=""
        this.monto=""
      },
      error: error => console.log("Error, no se han podido cargar los datos"),
      complete: () => console.info('complete') 
  })
  }
}

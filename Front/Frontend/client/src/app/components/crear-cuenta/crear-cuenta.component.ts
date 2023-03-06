import { Component, OnInit } from '@angular/core';
import { CargarService } from 'app/services/cargar.service';
import { Global } from 'app/services/global';
@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
  providers: [CargarService]
})
export class CrearCuentaComponent implements OnInit{
  public nickname:string=""
  constructor(
    private _cargarservice:CargarService,
  ){
  }
  ngOnInit(): void {
  }
  public crearCuenta(){
    let data:any={nickname:this.nickname, cedula:Global.cedula}
    this._cargarservice.crearCuenta(data).subscribe({
      next: response => {
        let data=response
        if(data.flag){
          alert("¡Se ha creado tu cuenta con éxito!")
          this.nickname=""
        }
      },
      error: error => alert("Se ha generado un error: "+error),
      complete: () => console.info('complete') 
  })
  }
}

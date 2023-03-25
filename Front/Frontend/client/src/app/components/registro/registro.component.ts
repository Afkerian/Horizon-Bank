import { Component, ElementRef, OnInit,Renderer2,ViewChild } from '@angular/core';
import { CargarService } from '../../services/cargar.service';
import { Registro } from '../../models/registro';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [CargarService]
})
export class RegistroComponent implements OnInit {
  public reg: Registro;
  
  constructor(
    private _cargarservice:CargarService
  ){
    this.reg = new Registro("", "", "", "", "")
  }
  ngOnInit(): void {
  }
  guardarRegistro(){
    this._cargarservice.guardarRegistro(this.reg).subscribe({
      next: response=>{
        if(response.flag){
          alert(response.message)
        }else{
          alert("Se ha generado un error: "+response.message)
        }
      },
      error: error => alert("Se ha generado un error"+error),
      complete:()=>console.log("Complete")
    })
  }
}


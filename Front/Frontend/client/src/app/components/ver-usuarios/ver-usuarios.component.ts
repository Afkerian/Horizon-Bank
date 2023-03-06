import { Component, OnInit } from '@angular/core';
import { Registro } from 'app/models/registro';
import { CargarService } from 'app/services/cargar.service';
@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css'],
  providers: [CargarService]
})
export class VerUsuariosComponent implements OnInit{
  public usuarios:Array<Registro>=[]
  constructor(
    private _cargarservice:CargarService
  ){
    this.obtenerUsuarios()
  }
  ngOnInit(): void {
  }
  public obtenerUsuarios(){
    this._cargarservice.getUsuarios().subscribe({
      next: response => {
        let data:any=response
        this.usuarios=data.usuarios
        for(let i=0;i<this.usuarios.length;i++){
        }
      },
      error: error => console.log("Error, no se han podido cargar los datos"),
      complete: () => console.info('complete') 
  })
  }
}

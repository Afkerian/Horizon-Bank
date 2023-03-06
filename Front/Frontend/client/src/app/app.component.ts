import { Component, OnInit } from '@angular/core';
import { CargarService } from './services/cargar.service';
import { Global } from './services/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CargarService]
})
export class AppComponent implements OnInit{
  title = 'Horizon-Bank';
  public logedUserNombres=""
  public logedUserApellidos=""
  public logedUserCedula=""
  public logedUserEmail=""
  public pattern=/^\d{10}$/
  constructor(
    private _cargarservice:CargarService
  ){
    this.logedUserNombres=Global.nombres
    this.logedUserApellidos=Global.apellidos
    this.logedUserCedula=Global.cedula
    this.logedUserEmail=Global.email
  }
  ngOnInit(): void {
  }
  setUser(){
    this.logedUserNombres=Global.nombres
    this.logedUserApellidos=Global.apellidos
    this.logedUserCedula=Global.cedula
    this.logedUserEmail=Global.email
    return this.pattern.test(this.logedUserCedula);
  }
  isAdmin(){
    if(Global.cedula=="1720434115"){
      return true;
    }else{
      return false;
    }
  }
  sentAccountState(){
    if(confirm("Un estado de cuenta se enviará a tu correo, ¿estás seguro de que quieres enviarlo?")){
      
    this._cargarservice.sentAccountState(Global.cedula).subscribe({
      next: response => {
        let data=response
        alert(data.message)
      },
      error: error => console.log("Error, no se han podido cargar los datos"),
      complete: () => console.info('complete') 
  })
    }else{

    }

    
  }
}
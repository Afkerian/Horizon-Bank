import { Component, OnInit } from '@angular/core';
import { Global } from './services/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Horizon-Bank';
  public logedUserNombres=""
  public logedUserApellidos=""
  public logedUserCedula=""
  public logedUserEmail=""
  public pattern=/^\d{10}$/
  constructor(){
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
      
    }else{

    }

    
  }
}
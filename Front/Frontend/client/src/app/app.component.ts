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
  constructor(){
    this.logedUserNombres=Global.nombres
    this.logedUserApellidos=Global.apellidos
    this.logedUserCedula=Global.cedula
    this.logedUserEmail=Global.email
  }
  ngOnInit(): void {
    
  }
  

}
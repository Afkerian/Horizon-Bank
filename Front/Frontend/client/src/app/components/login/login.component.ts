import { Component, OnInit } from '@angular/core';
import { CargarService } from 'app/services/cargar.service';
import { Global } from 'app/services/global';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CargarService]
})
export class LoginComponent implements OnInit{
  public url:string=""
  
  public cedula:string=""
  public password:string=""
  
  constructor(
    private _cargarservice:CargarService,
    
  ){
    
  }
  ngOnInit(): void {
    
  }

  public login(){
    
    let data:any={cedula:this.cedula, password:this.password}
    this._cargarservice.login(data).subscribe({
      next: response => {

        if(response.flag){
          alert("Inicio de sesión exitoso")
          Global.nombres=response.nombres
          Global.apellidos=response.apellidos
          Global.cedula=response.cedula
          Global.email=response.email
          this.password=""
          this.cedula=""
          //this.router.navigate(['/inicio']);
        }else{
          alert("Se ha producido un error: "+response.message)
        }
        
      },
      error: error => alert("Se ha generado un error: "+error),
      complete: () => console.info('complete') 
  })
  }

}

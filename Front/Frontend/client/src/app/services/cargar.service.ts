import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Global } from "./global";
import { Observable } from 'rxjs';
import { Registro } from "app/models/registro";
import { Sesion } from "app/models/sesion";


@Injectable()
export class CargarService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url
    }

    guardarRegistro(registro:Registro):Observable<any>{
        let params=JSON.stringify(registro);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'APIRegistrarUsuario',params,{headers:headers});
    }

    login(sesion:any):Observable<any>{
        let params=JSON.stringify(sesion);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'APILogin',params,{headers:headers});
    }
}

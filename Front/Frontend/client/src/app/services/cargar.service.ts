import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

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

    crearCuenta(datosCuenta:any):Observable<any>{
        let params=JSON.stringify(datosCuenta);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'APIRegistrarCuenta',params, {headers:headers});
    }

    getUsuarios():Observable<any>{
        
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.get(this.url+'APIObtenerUsuarios',{headers:headers});
    }

    getCuentasCliente(cedula:string):Observable<any>{
        let queryParams = new HttpParams();
        queryParams = queryParams.append("cedula",cedula);
        
        return this._http.get(this.url+'APIObtenerCuentasCliente',{params:queryParams});
    }

    transferencia(transferencia:any):Observable<any>{
        let params=JSON.stringify(transferencia);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'APITransferenciaLocal',params, {headers:headers});
    }

    getCuentas():Observable<any>{
        
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.get(this.url+'APIObtenerCuentas', {headers:headers});
    }
    
}

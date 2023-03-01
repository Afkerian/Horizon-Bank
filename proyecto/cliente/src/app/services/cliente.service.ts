import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Cliente} from '../models/cliente';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class ClienteService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
//ver todos los clientes
//http://localhost:3600/clientes
getClientes():Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'clientes',{headers:headers});
}
//guardar cliente
//http://localhost:3600/guardar-cliente
guardarCliente(cliente:Cliente):Observable<any>{
    let params=JSON.stringify(cliente);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'guardar-cliente',params,{headers:headers});
}
//ver clientes
//http://localhost:3600/cliente/:id
getCliente(id:String):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cliente/'+id,{headers:headers});
}
//editar cliente
//http://localhost:3600/cliente/:id
updateCliente(cliente:Cliente):Observable<any>{
    let params=JSON.stringify(cliente);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'cliente/'+cliente._id,params,{headers:headers});
}
//eliminar cliente
//http://localhost:3600/cliente/:id
deleteCliente(id:String):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'cliente/'+id,{headers:headers});
}
}
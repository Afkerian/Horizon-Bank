export class Cliente {
    id?: number;
    nombre?: string;
    apellido?: string;
    tipoCuenta?: string;
    monto?: number;
    
    constructor (nombre: string, apellido: string, tipoCuenta: string, monto: number){
        this.nombre =nombre;
        this.apellido = apellido;
        this.tipoCuenta = tipoCuenta;
        this.monto = monto;
        
    }
}

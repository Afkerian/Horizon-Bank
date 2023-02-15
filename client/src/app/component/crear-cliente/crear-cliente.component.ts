import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../../src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  //styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  clienteForm: FormGroup;
  titulo = 'Crear Cliente';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _clienteService: ClienteService,
              private aRouter: ActivatedRoute) { 
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipocuenta: ['', Validators.required],
      monto: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarCliente() {

    const CLIENTE: Cliente = {
      nombre: this.clienteForm.get('nombre')?.value,
      apellido: this.clienteForm.get('apellido')?.value,
      tipoCuenta: this.clienteForm.get('tipo de cuenta')?.value,
      monto: this.clienteForm.get('monto')?.value,
    }

    console.log(CLIENTE);
    this._clienteService.guardarCliente(CLIENTE).subscribe(data => {
      this.toastr.success('Cliente registrado con exito!','Cliente Registrado');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.clienteForm.reset();
    })

  
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar cliente';
      this._clienteService.obtenerCliente(this.id).subscribe(data => {
        this.clienteForm.setValue({
         nombre: data.nombre,
         apellido: data.apellido,
          tipocueta: data.tipocuenta,
          monto: data.monto,
        })
      })
    }
  }

}
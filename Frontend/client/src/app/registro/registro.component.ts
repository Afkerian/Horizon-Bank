import { Component, ElementRef, OnInit,Renderer2,ViewChild } from '@angular/core';
import { Registro } from '../models/registro';
import { Informacion } from '../models/informacion';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],


})
export class RegistroComponent implements OnInit {
  public reg: Registro;
  public inf: Informacion;

  mostrar=false;

  constructor() {
    this.reg = new Registro('', '', '', '', '', '')
    this.inf = new Informacion('','')
  }
  ngOnInit(): void {

  }
}


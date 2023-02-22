import { Component, OnInit } from '@angular/core';
import { Sesion } from '../models/sesion';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  public ses: Sesion;


  mostrar=false;

  constructor() {
    this.ses = new Sesion('', '','')
  }
  ngOnInit(): void {

  }
}

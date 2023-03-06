import { Component, OnInit } from '@angular/core';
import { Global } from 'app/services/global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [Router]
})
export class LogoutComponent implements OnInit{
  constructor(
    private router: Router
  ){
  }
  ngOnInit(): void {
    Global.nombres=""
    Global.apellidos=""
    Global.email=""
    Global.cedula=""
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
public isLoggedin:string=localStorage.getItem('isLoggedin')
  public uname:any=localStorage.getItem('name')
  constructor( public router: Router) {
   
  }
  ngOnInit(): void {
  
  }

}

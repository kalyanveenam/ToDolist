import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedin: boolean = localStorage.getItem('isLoggedin') == 'true';

  constructor( public router: Router) {
   
  }
  ngOnInit(): void {
  
  }
  logout() {
    // this.http.logout().subscribe((Response) => {
      localStorage.clear();
     
    };
  
}

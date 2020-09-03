import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;
  constructor() {}
  isMenuOpened: boolean = true;
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  ngOnInit(): void {}
  selected = 'option2';
  toggleNavbar() {
    console.log('toggled' + this.isMenuOpened);
    this.isMenuOpened = !this.isMenuOpened;
  }
}

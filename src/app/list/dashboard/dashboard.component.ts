import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  task: Task = {
    name: 'Get Tablets',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Asthaphen', completed: false, color: 'primary'},
      {name: 'Ascoril', completed: false, color: 'primary'},
      {name: 'Unicontin', completed: false, color: 'primary'}
    ]
  };
  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }
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

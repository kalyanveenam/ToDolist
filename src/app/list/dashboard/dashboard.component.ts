import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {SocketService} from '../../socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  providers:[SocketService]
})
export class DashboardComponent implements OnInit {
 public authToken: any=localStorage.getItem('authToken');
 public userList:any=[];
 public userNotification;
 onlineUsers=[];
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
  constructor(public SocketService: SocketService,private _snackBar: MatSnackBar) {
    this.getOnlineUsers();

  }
  
  isMenuOpened: boolean = true;
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  ngOnInit(): void {
    this.verifyUserConfirmation();
    this.getOnlineUsers();
  }
public verifyUserConfirmation:any=()=>{
  this.SocketService.verifyUser().subscribe((data)=>{
    console.log(this.authToken)
    this.SocketService.setUser(this.authToken);
    this.getOnlineUsers();
    this.offlineUser();
  })
}
  selected = 'option2';
  toggleNavbar() {
    console.log('toggled' + this.isMenuOpened);
    this.isMenuOpened = !this.isMenuOpened;
  }
  getOnlineUsers(){
this.SocketService.welcomeUser(localStorage.getItem('id')).subscribe((data)=>{
  this.userNotification=data;
  console.log("hi:"+this.userNotification)
})
this.SocketService.userOnline().subscribe((data)=>{
console.log(data)
this._snackBar.open(data,'User online', {
  duration: 2000,
});
})
    this.SocketService.userList().subscribe((user)=>{
    
      this.userList = [];
      for (let x in user) {
        let tmp = { 'user': x, 'name': user[x] }
        this.userList.push(tmp);
      }
      console.log(this.userList)
 
    
    })
  }
  offlineUser(){
    this.SocketService.userOffline().subscribe((user)=>{
      this._snackBar.open(user,'User offline', {
        duration: 2000,
      });
      console.log(user)
    })
  }
}

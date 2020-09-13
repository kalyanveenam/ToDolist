import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SocketService } from 'src/app/socket.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hidden = false;

  @Input() uname: any;
 public userList;
  public friends;
  public isLoggedin;
  //public uname:any=localStorage.getItem('name')

  public isSent:any=localStorage.getItem('isSent')
  constructor( public router: Router, public Http: HttpService,public dialog: MatDialog,public SocketService:SocketService) {
    this.isLoggedin = (localStorage.getItem('isLoggedin') == "true")
    this.friends = [];
  }
     

  public getAcceptedFriends(){
    let currUser = localStorage.getItem('id');
 
    this.Http.getAcceptedFriends().subscribe((result)=>{
    
          console.log('acc ' +JSON.stringify(result));
          for(let i in result['data']){
            if(result['data'][i]['fromUser']==currUser){
              let friend = {};
              friend['id'] = result['data'][i]['toUser'];
              friend['name']= result['data'][i]['recieverName'];
              this.friends.push(friend);
            }
            else if(result['data'][i]['toUser']==currUser){
              let friend = {};
              friend['id'] = result['data'][i]['fromUser'];
              friend['name']= result['data'][i]['senderName'];
              this.friends.push(friend);
            }
          }
          console.log('my friends are '+JSON.stringify(this.friends));
    })
  }
  ngOnInit(): void {
    console.log('friends in nav '+JSON.stringify(this.friends));
    this.isLoggedin = (localStorage.getItem('isLoggedin') == "true");
    this.friends=[];
    this.userList =[];
    this.getAcceptedFriends();
    this.getUserList();

  }
  public lout() {
    this.isLoggedin = false;
    this.router.navigate(['/user']);
    localStorage.clear();

  }
  isCompleted(){
    return false;
  }
public sendFriendRequest(to,recieverId){
 console.log("coming here"+to+"hi"+recieverId);
 this.Http.sendRequest(to,recieverId).subscribe((result)=>{
   console.log(result)
   const dialogRef = this.dialog.open(DialogComponent);

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
 })
})
}
public getUserList(){
this.SocketService.userList().subscribe((user) => {

  this.userList = [];
  for (var x in user) {
    if (!this.isUserExists(this.userList, user[x]['userId']) && user[x]['userId']!=localStorage.getItem('id') && !this.isFriend(this.friends,user[x]['userId']))
      this.userList.push(user[x]);
  }
  console.log('hi ' + JSON.stringify(this.userList));
})
}
public isUserExists(userList, id) {
  if (userList.length == 0)
    return false;
  else {
    for (var x in userList) {
      console.log('uid is '+userList[x]['userId']+' and '+localStorage.getItem('id'));
      if (userList[x]['userId'] == id)
        return true;
    }
    return false;
  }
}
public isFriend(friends, id) {
  if (friends.length == 0)
    return false;
  else {
    for (var x in friends) {
      if (friends[x]['id'] == id)
        return true;
    }
    return false;
  }
}
}

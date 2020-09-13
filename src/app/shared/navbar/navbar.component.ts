import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hidden = false;

  @Input() uname: any;
  @Input() userlist: any;
  public isLoggedin;
  //public uname:any=localStorage.getItem('name')

  public isSent:any=localStorage.getItem('isSent')
  constructor( public router: Router, public Http: HttpService,public dialog: MatDialog) {
    this.isLoggedin = (localStorage.getItem('isLoggedin') == "true")
  }
  ngOnInit(): void {
    this.isLoggedin = (localStorage.getItem('isLoggedin') == "true")
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
 // console.log("coming here"+to+"hi"+recieverId);
 this.Http.sendRequest(to,recieverId).subscribe((result)=>{
   console.log(result)
   const dialogRef = this.dialog.open(DialogComponent);

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
 })
})
}

}

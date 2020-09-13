import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
public isFp:boolean;
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.isFp=false;
  }
public forgPwd(){
  this.isFp = true;
}
}

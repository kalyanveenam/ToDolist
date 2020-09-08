import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 public isValidCredentials:boolean=false;
 public userNotFound;
  constructor(private http: HttpService, private Router: Router,private spinner: NgxSpinnerService) { }
  get emailControl() {
    return this.loginForm.get('email')
  }
  get passwordControl() {
    return this.loginForm.get('password')
  }
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d).{8,}$')
    ])
  });
  public email;
  onSubmit=()=>{
    this.spinner.show();
    var value = this.loginForm.value;
    this.http.signin(value.email,value.password).subscribe(
      (result)=>{
        localStorage.setItem('authToken',result['data']['token']['token'])
        localStorage.setItem('id',result['data']['userDetails']['_id'])
      console.log(result['data']['token'])
      
        this.spinner.hide();
    this.Router.navigate(['/list'])
    
    },
    (error)=>{
      this.spinner.hide();
      this.userNotFound=error.error.error.data;
      console.log(error.error.error.data)
      this.isValidCredentials=true;
    }
    
    
    )
    console.log(value)

  }
  ngOnInit(): void {
  }

}

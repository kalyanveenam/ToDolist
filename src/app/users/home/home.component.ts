import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
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

  ngOnInit(): void {
  }

}

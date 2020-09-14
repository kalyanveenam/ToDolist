import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  HttpService
} from 'src/app/http.service';
import {
  NgxSpinnerService
} from 'ngx-spinner';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    public httpService: HttpService,
    public router: Router,
    private spinner: NgxSpinnerService) {}

  get primEmail() {
    return this.userEmails.get('email')
  }
  get textControl() {
    return this.userEmails.get('name')
  }
  get phoneNumberControl() {
    return this.userEmails.get('phoneno');
  }
  get passwordValidator() {
    return this.userEmails.get('password');
  }
  userEmails = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    phoneno: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+){1}91){1}[1-9]{1}[0-9]{9}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d).{8,}$')
    ])
  });
  ngOnInit(): void {}
  onSubmit() {


    let signupdata = this.userEmails.value;

    this.spinner.show();
    this.httpService
      .signup(
        signupdata.name,
        signupdata.email,
        signupdata.password,
        signupdata.phoneno
      )
      .subscribe(
        (response) => {
          this.spinner.hide();

          if (response['error'] == true) {

          } else {

            this.router.navigate(['user']);
          }
        },
        (error) => {
          this.spinner.hide();


        }
      );
  }
}

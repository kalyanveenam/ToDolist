import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public prod = 'https://todolistbe.herokuapp.com/api/v1';
  public dev = 'http://localhost:3000/api/v1';
  public baseUrl = this.prod;
  constructor(public _http: HttpClient) {}
  public logout() {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.post(
      this.baseUrl + '/user/logout',
      {},
      {
        headers: header,
      }
    );
  }
  public signin(username, password) {
    return this._http.post(
      this.baseUrl + '/user/login',
      { email: username, password: password },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  public signup(name, email, password, phoneno) {
    
    return this._http.post(
      this.baseUrl + '/user/signup',
      JSON.stringify({
        name: name,
        email: email,
        password: password,
        phoneNo: phoneno,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public prod = 'https://btracker-backend.herokuapp.com/api/v1';
  public dev = 'http://localhost:3003/api/v1';
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
}

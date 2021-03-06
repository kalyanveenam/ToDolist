import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public prod = 'https://todolistbe.herokuapp.com/api/v1';
  public dev = 'http://localhost:3001/api/v1';
  public baseUrl = this.prod;
  constructor(public _http: HttpClient) {}
  public logout() {
    let header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.post(
      this.baseUrl + '/user/logout', {}, {
        headers: header,
      }
    );
  }
  public signin(username, password) {
    return this._http.post(
      this.baseUrl + '/user/login', {
        email: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
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
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
  public getLists() {

    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');

    return this._http.get(this.baseUrl + '/get/list', {
      headers: header
    });
  }
  
  public getAcceptedFriends(){
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-type'] = 'application/json';
    return this._http.get(this.baseUrl + '/friends/accepted', {
      headers: header
    });
  }
  public getListsById(id) {

    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');

    return this._http.get(this.baseUrl + '/get/listbyid?id='+id, {
      headers: header
    });
  }
  
  
  public createList(payload) {
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-Type'] = 'application/json';

    return this._http.post(
      this.baseUrl + '/create/list',
      payload, {
        headers: header
      }
    );
  }
  public updateList(payload,id) {
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-type'] = 'application/json';
    return this._http.put(
      this.baseUrl + '/update/list?id='+id,
      payload, {
        headers: header
      }
    );
  }
  public sendRequest(to, recieverName) {
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-type'] = 'application/json';
    return this._http.post(
      this.baseUrl + '/send/request', {
        to: to,
        recieverName: recieverName
      }, {
        headers: header
      }
    );
  }
  public getRequestStatus(){
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-type'] = 'application/json';
    return this._http.get(this.baseUrl + '/list/friends?status=pending', {
      headers: header
    });
  }

  public forgotPassword(email) {
    const endpoint = this.baseUrl + '/forgotPassword';
    return this._http.post(endpoint, { email: email });
  }
  public getFriends(){
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-type'] = 'application/json';
    return this._http.get(this.baseUrl + '/list/friends?status=accept', {
      headers: header
    });
  }
  public updateRequest(userId){
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-type'] = 'application/json';
    return this._http.put(
      this.baseUrl + '/update/status?status=accept',
      {userId:userId}, {
        headers: header
      }
    );
  }
  public getAllUsers(){
    let header = {};
    header['Authorization'] = localStorage.getItem('authToken');
    header['Content-type'] = 'application/json';
    return this._http.get(this.baseUrl + '/get/users', {
      headers: header
    });
  }
}
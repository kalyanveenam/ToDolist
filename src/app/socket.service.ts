import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public prod = 'https://todolistbe.herokuapp.com';
  public dev = 'http://localhost:3001';
  public baseUrl = this.dev;
  private socket;
  constructor(public http: HttpClient) {
    this.socket=io('http://localhost:3001')
   }
   public verifyUser=()=>{
     return Observable.create((observer)=>{
       this.socket.on('verifyUser',(data)=>{
         observer.next(data);
       })
     })
   }
   public setUser=(authToken)=>{
     this.socket.emit("set-user",authToken)
   }
   public userOffline=()=>{
    return Observable.create((observer)=>{
      this.socket.on('userOffline',(data)=>{
        observer.next(data);
      })
    })
  }
 
   public userList=()=>{
    return Observable.create((observer)=>{
      this.socket.on('userlist',(data)=>{
        observer.next(data);
      })
    })
  }
  public welcomeUser=(userid)=>{
    return Observable.create((observer)=>{
      this.socket.on(userid,(data)=>{
        observer.next(data);
      })
    })
  }
  public userOnline=()=>{
    return Observable.create((observer)=>{
      this.socket.on('userOnline',(data)=>{
        observer.next(data);
      })
    })
  }
  public disconnectUser = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next()
      })
    })
  }    
}

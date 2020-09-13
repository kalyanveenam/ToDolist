import { Component, OnInit } from '@angular/core';
import {
  HttpService
} from 'src/app/http.service';
@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }
  acceptRequest(){

}
}

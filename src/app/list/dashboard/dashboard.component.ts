import {
  Component,
  OnInit
} from '@angular/core';
import {
  ThemePalette
} from '@angular/material/core';
import {
  SocketService
} from '../../socket.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  HttpService
} from 'src/app/http.service';
import {
  NgxSpinnerService
} from "ngx-spinner";
import {
  MatDialog
} from '@angular/material/dialog';
import {
  FriendRequestComponent
} from '../friend-request/friend-request.component';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks ? : Task[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SocketService]
})
export class DashboardComponent implements OnInit {
  public authToken: any = localStorage.getItem('authToken');
  public userList: any = [];
  public userNotification;
  public myFriends: any;
  onlineUsers = [];
  uname: any = localStorage.getItem('name')
  allComplete: boolean = false;
  panelOpenState = false;

  constructor(public SocketService: SocketService, private _snackBar: MatSnackBar, private http: HttpService, private spinner: NgxSpinnerService, public dialog: MatDialog) {
    this.getOnlineUsers();
  }
  public lists;
  public tasks;
  public isEdit = false;
  public allTasks = [];
  isMenuOpened: boolean = true;
  activeOpenState = true;
  public pendingRequests;
  public friends;
  ngOnInit(): void {
    this.getLists();
    this.activeOpenState = true;
    this.verifyUserConfirmation();
    this.getOnlineUsers();
    this.friends = [];
    this.getFriendStatus();
    this.getAcceptedFriends();
  }
  public getAcceptedFriends() {
    let currUser = localStorage.getItem('id');

    this.http.getAcceptedFriends().subscribe((result) => {


      for (let i in result['data']) {
        if (result['data'][i]['fromUser'] == currUser) {
          let friend = {};
          friend['id'] = result['data'][i]['toUser'];
          friend['name'] = result['data'][i]['recieverName'];
          this.friends.push(friend);
        } else if (result['data'][i]['toUser'] == currUser) {
          let friend = {};
          friend['id'] = result['data'][i]['fromUser'];
          friend['name'] = result['data'][i]['senderName'];
          this.friends.push(friend);
        }
      }

    })
  }
  public verifyUserConfirmation: any = () => {
    this.SocketService.verifyUser().subscribe((data) => {

      this.SocketService.setUser(this.authToken);
      this.getOnlineUsers();
      this.offlineUser();
    })
  }
  public editView() {
    this.isEdit = true;
  }
  selected = '';
  toggleNavbar() {

    this.isMenuOpened = !this.isMenuOpened;
  }
  getOnlineUsers() {
    this.SocketService.welcomeUser(localStorage.getItem('id')).subscribe((data) => {
      this.userNotification = data;

    })
    this.SocketService.userOnline().subscribe((data) => {

      this._snackBar.open(data, 'User online', {
        duration: 2000,
      });
    })
    this.SocketService.userList().subscribe((user) => {

      this.userList = [];
      for (let x in user) {
        if (!this.isUserExists(this.userList, user[x]['userId']) && user[x]['userId'] != localStorage.getItem('id'))
          this.userList.push(user[x]);
      }

    })
  }
  public isUserExists(userList, id) {
    if (userList.length == 0)
      return false;
    else {
      for (let x in userList) {

        if (userList[x]['userId'] == id)
          return true;
      }
      return false;
    }
  }

  offlineUser() {
    this.SocketService.userOffline().subscribe((user) => {
      this._snackBar.open(user, 'User offline', {
        duration: 2000,
      });

    })
  }
  public getLists() {
    this.http.getLists().subscribe((response) => {
      this.lists = (response["data"])

      for (let i = 0; i < this.lists.length; i++) {

        this.tasks = response["data"][i].tasks;

        this.allTasks.push(this.tasks)
      }


    });
  }
  public getTasks(list) {
    return list.tasks;
  }

  public getSubTasks(task) {

    return task.subtask;
  }

  public update(form) {

    let dirtyValues = {};

    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.update(currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });



    let changes = [];
    for (let i in dirtyValues) {
      let change = {};
      let splitted = i.toString().split('_');

      change['type'] = splitted[0];
      change['list_id'] = splitted[1];
      if (splitted[2])
        change['task_id'] = splitted[2];
      if (splitted[3])
        change['subtask_id'] = splitted[3];
      change['value'] = dirtyValues[i];
      change['field'] = 'title';
      changes.push(change);
    }


    this.http.updateList(changes).subscribe((result) => {

      this.getLists();
      this.isEdit = false;
    })
  }
  public updateCheckbox(event, listid, taskid, subtaskid, type) {

    let changes = [];
    let change = {};
    change['type'] = type;
    change['list_id'] = listid;
    if (type = 'subtask') {
      change['task_id'] = taskid;
      change['subtask_id'] = subtaskid;
    }
    if (type = 'task') {
      change['task_id'] = taskid;
    }
    change['field'] = 'completed';
    change['value'] = event.checked;
    changes.push(change);

    this.http.updateList(changes).subscribe((result) => {

      this.getLists();

    })
  }
  public delete(listid, taskid, subtaskid, type) {
    let changes = [];
    let change = {};
    change['type'] = type;
    change['list_id'] = listid;
    if (type = 'subtask') {
      change['task_id'] = taskid;
      change['subtask_id'] = subtaskid;
    }
    if (type = 'task') {
      change['task_id'] = taskid;
    }
    change['field'] = 'delete';
    change['value'] = 'delete';
    changes.push(change);

    this.http.updateList(changes).subscribe((result) => {

      this.getLists();
    })
  }
  public getFriendStatus() {
    this.http.getRequestStatus().subscribe((result) => {

      this.pendingRequests = result['data']

    })
  }
  public acceptReq(data) {

    this.http.updateRequest(data.fromUser).subscribe((result) => {

    })

  }
  public getFriends() {
    this.http.getFriends().subscribe((res) => {

      this.myFriends = res['data'];
    })

  }
  public getFriendsListById(data) {

    this.http.getListsById(data.id).subscribe((res) => {

    })

  }

}

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
import { MatDialog } from '@angular/material/dialog';
import { FriendRequestComponent } from '../friend-request/friend-request.component';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
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
  ngOnInit(): void {
    this.getLists();
    this.activeOpenState = true;
    this.verifyUserConfirmation();
    this.getOnlineUsers();
    this.getFriendStatus();
    this.getFriends();
  }
  public verifyUserConfirmation: any = () => {
    this.SocketService.verifyUser().subscribe((data) => {
      console.log(this.authToken)
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
    console.log('toggled' + this.isMenuOpened);
    this.isMenuOpened = !this.isMenuOpened;
  }
  getOnlineUsers() {
    this.SocketService.welcomeUser(localStorage.getItem('id')).subscribe((data) => {
      this.userNotification = data;
      console.log("hi:" + this.userNotification)
    })
    this.SocketService.userOnline().subscribe((data) => {
      console.log(data)
      this._snackBar.open(data, 'User online', {
        duration: 2000,
      });
    })
    this.SocketService.userList().subscribe((user) => {

      this.userList = [];
      for (var x in user) {
        if (!this.isUserExists(this.userList, user[x]['userId']))
          this.userList.push(user[x]);
      }
      console.log('hi ' + JSON.stringify(this.userList));
    })
  }
  public isUserExists(userList, id) {
    if (userList.length == 0)
      return false;
    else {
      for (var x in userList) {
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
      console.log(user)
    })
  }
  public getLists() {
    this.http.getLists().subscribe((response) => {
      this.lists = (response["data"])
      console.log('lists are ' + this.lists);
      for (let i = 0; i < this.lists.length; i++) {
        console.log(response['data'])
        this.tasks = response["data"][i].tasks;

        this.allTasks.push(this.tasks)
      }

      //   console.log(this.tasks)
    });
  }
  public getTasks(list) {
    return list.tasks;
  }

  public getSubTasks(task) {

    return task.subtask;
  }

  public update(form) {
    console.log(form);
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

    console.log(dirtyValues);

    var changes = [];
    for (var i in dirtyValues) {
      var change = {};
      var splitted = i.toString().split('_');
      console.log(splitted);
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

    console.log('changes are ' + JSON.stringify(changes));
    this.http.updateList(changes).subscribe((result) => {
      console.log(result);
      this.getLists();
      this.isEdit = false;
    })
  }
  public updateCheckbox(event, listid, taskid, subtaskid, type) {
    console.log(event.checked + 'd' + listid);
    var changes = [];
    var change = {};
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
    console.log(JSON.stringify(changes));
    this.http.updateList(changes).subscribe((result) => {
      console.log(result);
      this.getLists();

    })
  }
  public delete(listid, taskid, subtaskid, type) {
    var changes = [];
    var change = {};
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
    console.log(JSON.stringify(changes));
    this.http.updateList(changes).subscribe((result) => {
      console.log(result);
      this.getLists();
    })
  }
  public getFriendStatus() {
    this.http.getRequestStatus().subscribe((result) => {

      this.pendingRequests = result['data']
      console.log(this.pendingRequests)
    })
  }
  public acceptReq(data) {
    console.log(JSON.stringify(data.fromUser))
    this.http.updateRequest(data.fromUser).subscribe((result) => {
      console.log(result);

    })

    // const dialogRef = this.dialog.open(FriendRequestComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }
  public getFriends() {
    this.http.getFriends().subscribe((res) => {
      console.log("raa" + JSON.stringify(res));
      this.myFriends = res['data'];
    })

  }
  public getFriendsListById(data) {
    console.log(data)
    this.http.getListsById(data).subscribe((res) => {
      console.log(res);
    })

  }

}

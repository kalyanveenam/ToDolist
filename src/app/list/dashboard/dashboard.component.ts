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
  onlineUsers = [];
  // task: Task = {
  //   name: 'Get Tablets',
  //   completed: false,
  //   color: 'primary',
  //   subtasks: [{
  //       name: 'Asthaphen',
  //       completed: false,
  //       color: 'primary'
  //     },
  //     {
  //       name: 'Ascoril',
  //       completed: false,
  //       color: 'primary'
  //     },
  //     {
  //       name: 'Unicontin',
  //       completed: false,
  //       color: 'primary'
  //     }
  //   ]
  // };
  allComplete: boolean = false;

  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  // }

  panelOpenState = false;
  constructor(public SocketService: SocketService, private _snackBar: MatSnackBar, private http: HttpService, private spinner: NgxSpinnerService) {
    this.getOnlineUsers();

  }
 public lists;
 public tasks;
 public isEdit =false;
 public allTasks=[];
  isMenuOpened: boolean = true;
  activeOpenState = true;
 
  ngOnInit(): void {
    this.getLists();
    this.activeOpenState = true;
    this.verifyUserConfirmation();
    this.getOnlineUsers();
  }
  public verifyUserConfirmation: any = () => {
    this.SocketService.verifyUser().subscribe((data) => {
      console.log(this.authToken)
      this.SocketService.setUser(this.authToken);
      this.getOnlineUsers();
      this.offlineUser();
    })
  }
public editView(){
  this.isEdit=true;
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
      for (let x in user) {
        let tmp = {
          'user': x,
          'name': user[x]
        }
        this.userList.push(tmp);
      }
    
    })
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
this.lists=(response["data"])
console.log('lists are '+this.lists);
   for (let i=0;i<this.lists.length;i++){
  console.log(response['data'])
    this.tasks=   response["data"][i].tasks;

 this.allTasks.push(this.tasks)
   }

 //   console.log(this.tasks)
    });
  }
  public getTasks(list){
return list.tasks;
  }
  
  public getSubTasks(task){
   
    return task.subtask;
  }

  public update(form)
  {
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
    for(var i in dirtyValues){
      var change = {};
      var splitted = i.toString().split('_');
      console.log(splitted);
      if(splitted[0]=='task')
      {
      change['type']='task';
      change['list_id']=splitted[1];
      change['task_id']=splitted[2];
      }
      
      else if(splitted[0]=='list')
      {
      change['type']='list';
      change['list_id']=splitted[1];
      }
      else if(splitted[0]=='subtask')
      {
      change['type']='subtask';
      change['list_id']=splitted[1];
      change['task_id']=splitted[2];
      change['subtask_id']=splitted[3];
      }
      change['value']= dirtyValues[i];
      changes.push(change);
    }
    console.log('changes are '+JSON.stringify(changes));

  }

  
}

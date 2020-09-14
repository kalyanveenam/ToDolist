import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})

export class CreateListComponent implements OnInit {
  //public tasks:mytasks[];
  mytasks = [];
  public subtasks = [];
  public subtask = {};
  constructor(private http: HttpService, private router:Router, private socket: SocketService) {
 

  }
  ngOnInit() {
  }
  public addTask() {
    this.mytasks.push(this.mytasks.length);
  }
  public addSubTask(task) {
    let found = false;
    for (let subtask in this.subtasks) {
      if (this.subtasks[subtask]['task'] == task) {
        this.subtasks[subtask]['stid'].push(this.subtasks[subtask]['stid'].length);
        found = true;
      }
    }
    if (!found) {
      let newSubTask = {};
      newSubTask['task'] = task;
      newSubTask['stid'] = [0];
      this.subtasks.push(newSubTask);
    }
  }
  
  public getSubtasks(task) {
    for (let subtask in this.subtasks) {
      if (this.subtasks[subtask]['task'] == task) {
        return this.subtasks[subtask]['stid'];
      }
    }
    return [];
  }

  public createList(data) {
    
    let payload = {};
    payload['title'] = data.value['title'];
    let tasks = [];
    for (let i in this.mytasks) {
      let task = {};
      task['title'] = data.value['task_title_' + i];
      task['description'] = data.value['task_desc_' + i];
      let subtasks = [];
      let subtasklength = this.getSubtaskLengthByTask(i);
      for (let j = 0; j < subtasklength; j++) {
        let subtask = {};
        subtask['description'] = data.value['subtask_' + i + "_" + j];
        subtasks.push(subtask);
      }
      task['subtask'] = subtasks;
      tasks.push(task);
    }
    payload['tasks'] = tasks;
    payload['owner']=localStorage.getItem('id')
    
       this.http.createList(payload).subscribe((data)=>{
 
         this.socket.createdList("Sample notification")
         this.socket.listCreated().subscribe((data) => {
       
        
        })
         this.router.navigate(['/dashboard'])
       })
    
  }

  public getSubtaskLengthByTask(task) {
    for (let subtask in this.subtasks) {
      if (this.subtasks[subtask]['task'] == task) {
        return this.subtasks[subtask]['stid'].length;
      }
    }
  }
}

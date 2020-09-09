import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';

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
  constructor(private http: HttpService, private router:Router) {
 

  }
  ngOnInit() {
  }
  public addTask() {
    this.mytasks.push(this.mytasks.length);
  }
  public addSubTask(task) {
    var found = false;
    for (var subtask in this.subtasks) {
      if (this.subtasks[subtask]['task'] == task) {
        this.subtasks[subtask]['stid'].push(this.subtasks[subtask]['stid'].length);
        found = true;
      }
    }
    if (!found) {
      var newSubTask = {};
      newSubTask['task'] = task;
      newSubTask['stid'] = [0];
      this.subtasks.push(newSubTask);
    }
  }
  
  public getSubtasks(task) {
    for (var subtask in this.subtasks) {
      if (this.subtasks[subtask]['task'] == task) {
        return this.subtasks[subtask]['stid'];
      }
    }
    return [];
  }

  public createList(data) {
    console.log(data.value);
    var payload = {};
    payload['title'] = data.value['title'];
    var tasks = [];
    for (var i in this.mytasks) {
      var task = {};
      task['title'] = data.value['task_title_' + i];
      task['description'] = data.value['task_desc_' + i];
      var subtasks = [];
      var subtasklength = this.getSubtaskLengthByTask(i);
      for (var j = 0; j < subtasklength; j++) {
        var subtask = {};
        subtask['description'] = data.value['subtask_' + i + "_" + j];
        subtasks.push(subtask);
      }
      task['subtask'] = subtasks;
      tasks.push(task);
    }
    payload['tasks'] = tasks;
    payload['owner']=localStorage.getItem('id')
    console.log(JSON.stringify(payload));
       this.http.createList(payload).subscribe((data)=>{
         console.log(data)
         this.router.navigate(['/dashboard'])
       })
    
  }

  public getSubtaskLengthByTask(task) {
    for (var subtask in this.subtasks) {
      if (this.subtasks[subtask]['task'] == task) {
        return this.subtasks[subtask]['stid'].length;
      }
    }
  }
}

import { Component, OnInit , QueryList , ViewChildren } from '@angular/core';
import { Task } from '../task';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  @ViewChildren(TaskComponent) taskComps: QueryList<TaskComponent>;

  tasks: Task[] = [];

  taskName: string;
  taskDescription: string;

  taskSelect: Task;
 
  addTask() {
      let tempTask: Task = {
        id: this.createUUID(),
        name: this.taskName,
        description: this.taskDescription
      }
      this.tasks.push(tempTask);
  }
  deleteTask(taskComponent: TaskComponent) {
      this.tasks = this.tasks.filter(t => t.id !== taskComponent.taskObj.id);
  }

  createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[x,y]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
  }

  selectedTask(taskComponent: TaskComponent) {
    this.clearSelected();
    taskComponent.isSelected = true;
    this.taskSelect = taskComponent.taskObj;
  }

  clearSelected() {
    this.taskComps.forEach((task) => {
      task.isSelected = false;
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}

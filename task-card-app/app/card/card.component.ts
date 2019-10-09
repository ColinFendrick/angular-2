import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../model/task';

@Component({
  moduleId: module.id,
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent {
  @Input() task: Task;
  @Output() onDelete = new EventEmitter();

  statusToggle():void {
    this.task.completed = !this.task.completed;
  }

  deleteTask():void {
    this.onDelete.emit(this.task.id);
  }
}

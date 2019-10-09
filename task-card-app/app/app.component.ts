import { Component } from '@angular/core';

import { Task } from './model/task';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    private tasks: Task[] = [];

    private currentTask = new Task(null, false, this.tasks.length);

    addTask():void {
        let task = new Task(
            this.currentTask.content,
            this.currentTask.completed,
            this.currentTask.id
        );
        this.tasks.push(task);
        this.currentTask = new Task(null, false, this.tasks.length);
    }

    deleteTask(id: number):void {
        console.log(
            this.tasks.find(task => task.id === id)
        )
    }

    execOnDelete($event: any):void {
        const taskIdToRemove = this.tasks.findIndex(({ id }) => id === $event);
        this.tasks.splice(taskIdToRemove, 1);
    }
}

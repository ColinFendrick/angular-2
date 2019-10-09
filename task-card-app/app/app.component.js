"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var task_1 = require('./model/task');
var AppComponent = (function () {
    function AppComponent() {
        this.tasks = [];
        this.currentTask = new task_1.Task(null, false, this.tasks.length);
    }
    AppComponent.prototype.addTask = function () {
        var task = new task_1.Task(this.currentTask.content, this.currentTask.completed, this.currentTask.id);
        this.tasks.push(task);
        this.currentTask = new task_1.Task(null, false, this.tasks.length);
    };
    AppComponent.prototype.deleteTask = function (id) {
        console.log(this.tasks.find(function (task) { return task.id === id; }));
    };
    AppComponent.prototype.execOnDelete = function ($event) {
        var taskIdToRemove = this.tasks.findIndex(function (_a) {
            var id = _a.id;
            return id === $event;
        });
        this.tasks.splice(taskIdToRemove, 1);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
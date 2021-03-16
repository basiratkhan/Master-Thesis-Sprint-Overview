import { SprintOverviewService } from '../services/sprint-overview.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { SprintOverview } from '../models/sprintoverview.model';

@Component({
    selector: 'app-sprint-overview',
    animations: [
        trigger('changePosition', [
            state('true', style({
            left: '{{position}}',
        }), {params: {position: '0%'}}),
        transition('* => true', [
            animate(2000)
        ]),
      ])
    ],
    templateUrl: './sprint-overview.component.html',
    styleUrls: ['./sprint-overview.component.css']
})

export class SprintOverviewComponent implements OnInit {

    private sprintOverview: SprintOverview[];
    public taskList: any[] = [];
    public taskDividerList: any[] = [{ state: 'To Do' }, { state: 'In Progress' }, { state: 'Done' }];
    public shapes: any[]  = ['assets/img/circle.jpg', 'assets/img/diamond.jpg', 'assets/img/stripedSquare.jpg', 'assets/img/triangle.jpg',
             'assets/img/rectangle.jpg', 'assets/img/square.jpg', 'assets/img/right-triangle.jpg'];
    private users: any[] = [];
    public triggerValue: boolean = true;
    private backgroundColor: string = '';

    constructor(private httpClient: HttpClient, private sprintOverviewService: SprintOverviewService) {
    }

    public ngOnInit(): void {
        this.sprintOverviewService.getSprintData().subscribe(res => {
            this.sprintOverview = res;
            if (this.sprintOverview) {
                this.sprintOverview = this.assignPositionOnScreenStateWise(this.sprintOverview);
                this.taskList = this.sprintOverview;
                this.getSprintResultParsing(this.sprintOverview);
            }
        });
        interval(3000).subscribe(() => {
            setTimeout(() => {
                this.sprintOverviewService.getSprintData().subscribe(res => {
                  this.sprintOverview = res;
                      if (this.sprintOverview) {
                          this.assignPositionOnScreenStateWiseAfterInterval(this.sprintOverview);
                          this.getSprintResultParsing(this.sprintOverview);
                      }
                });
            }, 4000);
        });
    }

    private randomIntFromInterval(min, max): any { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min) + '%';
    }

    private getSprintResultParsing(res: any): void {
        this.assigningUsersUniqueShapes();
        this.mappingUsersAssignedShapesAgainstAssignedTasks();
        this.assigningBackgroundColor();
        setTimeout(() => {
            document.getElementById('mainDiv').style.backgroundColor = this.backgroundColor;
        }, 200);
    }

    private assignPositionOnScreenStateWiseAfterInterval(newTaskList: any[]): void {
        const length = newTaskList.length;
        const additionalTasks: any[] = [];
        for (let i = 0; i < length; i++) {
            const task = this.taskList.find(x => x.uniqueIdentifier === newTaskList[i].uniqueIdentifier);
            if (task && task.state !== newTaskList[i].state) {
                if (newTaskList[i].state === 'To Do') {
                    newTaskList[i].left = this.randomIntFromInterval(1, 23);
                    for (let j = 0; j < this.taskList.length; j++) {
                        if (task.uniqueIdentifier === this.taskList[j].uniqueIdentifier) {
                            newTaskList[i].top = this.taskList[j].top;
                            this.taskList[j] = newTaskList[i];
                            break;
                        }
                    }
                } else if (newTaskList[i].state === 'In Progress') {
                    newTaskList[i].left = this.randomIntFromInterval(33, 57);
                    for (let j = 0; j < this.taskList.length; j++) {
                        if (task.uniqueIdentifier === this.taskList[j].uniqueIdentifier) {
                            newTaskList[i].top = this.taskList[j].top;
                            this.taskList[j] = newTaskList[i];
                            break;
                        }
                    }
                } else if (newTaskList[i].state === 'Done') {
                    newTaskList[i].left = this.randomIntFromInterval(67, 88);
                    for (let j = 0; j < this.taskList.length; j++) {
                        if (task.uniqueIdentifier === this.taskList[j].uniqueIdentifier) {
                            newTaskList[i].top = this.taskList[j].top;
                            this.taskList[j] = newTaskList[i];
                            break;
                        }
                    }
                }
            } else if (!task) {
                if (newTaskList[i].state === 'To Do') {
                    newTaskList[i].left = this.randomIntFromInterval(1, 23);
                } else if (newTaskList[i].state === 'In Progress') {
                    newTaskList[i].left = this.randomIntFromInterval(33, 57);
                } else if (newTaskList[i].state === 'Done') {
                    newTaskList[i].left = this.randomIntFromInterval(67, 88);
                }
                additionalTasks.push(newTaskList[i]);
            }
        }
        for (let i = 0; i < additionalTasks.length; i++) {
            this.taskList.push(additionalTasks[i]);
        }
    }

    private assignPositionOnScreenStateWise(newTaskList: any[]): any {
        const length = newTaskList.length;
        const additionalTasks: any[] = [];
        for (let i = 0; i < length; i++) {
            const task = this.taskList.find(x => x.uniqueIdentifier === newTaskList[i].uniqueIdentifier);
            if (task) {
                newTaskList[i].left = task.left;
                newTaskList[i].top = task.top;
            } else if (!task || (task && task.state !== newTaskList[i].state)) {
                if (newTaskList[i].state === 'To Do') {
                    newTaskList[i].left = this.randomIntFromInterval(1, 23);
                    newTaskList[i].top = this.randomIntFromInterval(5, 75);
                } else if (newTaskList[i].state === 'In Progress') {
                    newTaskList[i].left = this.randomIntFromInterval(33, 57);
                    newTaskList[i].top = this.randomIntFromInterval(5, 75);
                } else if (newTaskList[i].state === 'Done') {
                    newTaskList[i].left = this.randomIntFromInterval(67, 88);
                    newTaskList[i].top = this.randomIntFromInterval(5, 75);
                }
            }
        }
        return newTaskList;
    }

    private assigningUsersUniqueShapes(): void {
        const self = this;
        this.taskList.map(val => {
            const obj = self.users.find(x => x.name === val.assignedTo);
            if (!obj && val.assignedTo) {
                self.users.push({ name: val.assignedTo });
            }
        });
        for (let i = 0; i < self.users.length; i++) {
            self.users[i].shape = this.shapes[i];
        }
    }

    private mappingUsersAssignedShapesAgainstAssignedTasks(): void {
        const self = this;
        for (let i = 0; i < self.users.length; i++) {
            for (let j = 0; j < this.taskList.length; j++) {
                if (this.taskList[j].assignedTo === self.users[i].name) {
                    this.taskList[j].shape = self.users[i].shape;
                } else if (!this.taskList[j].assignedTo) {
                    this.taskList[j].shape = 'assets/img/right-triangle.jpg';
                }
            }
        }
    }

    private assigningBackgroundColor(): void {
        const takLength = this.taskList.length;
        const completedTaskLength = this.taskList.filter(x => x.state === 'Done').length;
        const completedPercentage = completedTaskLength / takLength * 100;
        if (completedPercentage < 33) {
            this.backgroundColor = '#f5bcc6';
        } else if (completedPercentage > 33 && completedPercentage < 66) {
            this.backgroundColor = '#9ab7d3';
        } else if (completedPercentage > 66) {
            this.backgroundColor = '#6ed0b4';
        }
    }
}

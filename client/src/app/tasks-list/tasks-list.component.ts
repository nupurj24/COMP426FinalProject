import { Component, OnInit, WritableSignal } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Tasks List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="tasks$()">
          <ng-container matColumnDef="col-title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let element">{{ element.title }}</td>
          </ng-container>
          <ng-container matColumnDef="col-description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let element">{{ element.description }}</td>
          </ng-container>
          <ng-container matColumnDef="col-level">
            <th mat-header-cell *matHeaderCellDef>Level</th>
            <td mat-cell *matCellDef="let element">{{ element.level }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteTask(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Task
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class TasksListComponent implements OnInit {
  tasks$ = {} as WritableSignal<Task[]>;
  displayedColumns: string[] = [
    'col-title',
    'col-description',
    'col-level',
    'col-action',
  ];

  constructor(private tasksService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe({
      next: () => this.fetchTasks(),
    });
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.tasks$;
    this.tasksService.getTasks();
  }
}

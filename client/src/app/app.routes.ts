import { Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './add-task/add-task.component'; 
import { EditTaskComponent } from './edit-task/edit-task.component'; 

export const routes: Routes = [
  { path: '', component: TasksListComponent, title: 'Tasks List' },
  { path: 'new', component: AddTaskComponent }, 
  { path: 'edit/:id', component: EditTaskComponent }, 
];
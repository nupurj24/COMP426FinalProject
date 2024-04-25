import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksListComponent, MatToolbarModule, WeatherWidgetComponent],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Tar Heel Task Tracker</span>
    </mat-toolbar>
    <main>
      <router-outlet />
      <app-weather-widget></app-weather-widget>
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}
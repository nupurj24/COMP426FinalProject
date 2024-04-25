import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [MatCardModule], 
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Weather Info</mat-card-title>
        <mat-card-subtitle>Details about the current weather</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Weather details will be displayed here.</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
    }
  `]
})
export class WeatherWidgetComponent {

}


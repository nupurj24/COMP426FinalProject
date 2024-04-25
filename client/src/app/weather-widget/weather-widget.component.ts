import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [HttpClientModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Weather in {{ location?.name }}</mat-card-title>
        <mat-card-subtitle>{{ location?.region }}, {{ location?.country }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div>
          <img [src]="iconUrl" alt="Weather Icon">
          <p>{{ weather?.condition?.text }} : {{ temperature }} °F</p>
        </div>
        <p>{{ message }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
    }
    img {
      width: 50px;  
      height: auto;
    }
  `]
})
export class WeatherWidgetComponent implements OnInit {
  private apiKey: string = '002cae4477b94ac18a822713242504';
  private baseUrl: string = 'http://api.weatherapi.com/v1';
  weather: any;
  location: any;
  message: string = '';
  temperature: number = 0;
  iconUrl: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCurrentWeather('27514'); 
  }

  getCurrentWeather(location: string) {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${location}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.weather = data.current;
        this.location = data.location;
        this.temperature = this.convertToFahrenheit(this.weather.temp_c);
        this.iconUrl = this.weather.condition.icon; 
        this.setMessage(this.weather);
      },
      error: (err) => {
        console.error('Failed to get weather data', err);
      }
    });
  }

  convertToFahrenheit(celsius: number): number {
    return Math.floor((celsius * (9 / 5)) + 32);
  }
  setMessage(weather: any) {
    if (this.temperature < 60) { 
      this.message = "It is a little chilly right now, might want to bring a jacket!";
    } else if (weather.condition.text.toLowerCase().includes("rain")) {
      this.message = "It's rainy, you might want to bring an umbrella!";
    } else if (weather.condition.text.toLowerCase().includes("snow")) {
      this.message = "Snowy day, stay warm and drive safely!";
    } else if (weather.condition.text.toLowerCase().includes("clear")) {
      this.message = "Clear skies right now. Great time to be outdoors!";
    } else if (weather.condition.text.toLowerCase().includes("cloud")) {
      this.message = "It's a bit cloudy. Good day for a walk!";
    } else if (this.temperature > 90) {
      this.message = "It's really hot out there, stay hydrated!";
    } else if (weather.condition.text.toLowerCase().includes("fog")) {
      this.message = "Foggy conditions, be careful while driving!";
    } else if (weather.condition.text.toLowerCase().includes("thunderstorm")) {
      this.message = "Thunderstorms possible, better stay indoors!";
    } else if (weather.condition.text.toLowerCase().includes("mist")) {
      this.message = "Misty weather, perfect for some moody pictures!";
    } else if (weather.condition.text.toLowerCase().includes("sleet")) {
      this.message = "Sleet is likely, watch your step outside!";
    } else {
      this.message = "It looks like a nice day out!";
    }
  }
}

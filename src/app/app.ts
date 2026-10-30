import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fetchWeatherApi } from 'openmeteo';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { WeatherResponseDaily } from './weather-model';
import { WeatherComponent } from './weather-component/weather-component';

@Component({
  imports: [WeatherComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('WeatherApp');
  now: Date = new Date()
}

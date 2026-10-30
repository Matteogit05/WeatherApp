import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Component, input, signal, inject } from '@angular/core';
import { WeatherResponseDaily } from '../weather-model';
import { WeatherService } from '../weather-service';
import { DailyGraph } from '../daily-graph/daily-graph';

@Component({
  imports: [DailyGraph],
  selector: 'app-weather-component',
  styleUrl: './weather-component.css',
  templateUrl: './weather-component.html',
})
export class WeatherComponent {
  lat = input.required<number>()
  lon = input.required<number>()
  weatherService = inject(WeatherService)

  rDaily = this.weatherService.getDataDaily(this.lat, this.lon)
}
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Component, input, signal, inject, computed } from '@angular/core';
import { WeatherResponseDaily } from '../models/weather-model';
import { WeatherService } from '../weather-service';
import { DailyGraph } from '../daily-graph/daily-graph';
import { Card } from '../card/card';

@Component({
  imports: [DailyGraph, Card],
  selector: 'app-weather-component',
  styleUrl: './weather-component.css',
  templateUrl: './weather-component.html',
})
export class WeatherComponent {
  lat = input.required<number>()
  lon = input.required<number>()
  
  weatherService = inject(WeatherService)
  rDaily = this.weatherService.getDataDaily(this.lat, this.lon)
  rWeekly = this.weatherService.getDataWeekly(this.lat, this.lon)
  weatherLabel = computed(()=> {
    return this.weatherCodeMap[this.rDaily.value()!.hourly.weather_code[0]]
  })

  days = [0, 1, 2, 3, 4, 5, 6]

  formatTime(isoDate: string): string {
    return isoDate.slice(11, 16)
  }

  formatDateTime(isoDate?: string): string {
    if (!isoDate) {
      return ''
    }

    return `${isoDate.slice(8, 10)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)}, ${isoDate.slice(11, 16)}`
  }

  weatherCodeMap: Record<string, string> = {
    "0": "Clear sky",
    "1": "Mainly clear",
    "2": "Partly cloudy",
    "3": "Overcast",
    "45": "Fog",
    "48": "Depositing rime fog",
    "51": "Light drizzle",
    "53": "Moderate drizzle",
    "55": "Dense drizzle",
    "56": "Light freezing drizzle",
    "57": "Dense freezing drizzle",
    "61": "Slight rain",
    "63": "Moderate rain",
    "65": "Heavy rain",
    "66": "Light freezing rain",
    "67": "Heavy freezing rain",
    "71": "Slight snowfall",
    "73": "Moderate snowfall",
    "75": "Heavy snowfall",
    "77": "Snow grains",
    "80": "Slight rain showers",
    "81": "Moderate rain showers",
    "82": "Violent rain showers",
    "85": "Slight snow showers",
    "86": "Heavy snow showers",
    "95": "Thunderstorm",
    "96": "Thunderstorm with slight hail",
    "97": "Heavy thunderstorm",
    "99": "Thunderstorm with heavy hail"
  }
}
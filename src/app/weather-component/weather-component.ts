import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Component, input, signal, inject, computed, InputSignal } from '@angular/core';
import { WeatherResponse } from '../models/weather-model';
import { WeatherService } from '../services/weather-service';
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
  index = 0
  
  weatherService = inject(WeatherService)
  response = this.weatherService.getData(this.lat, this.lon)

  weatherCode = computed(() => {
    return this.response.value()!.daily.weather_code
  })
  currentTemperature = computed(() => {
    return this.response.value()!.current.temperature_2m
  })
  maxTemperature = computed(() => {
    return this.response.value()!.daily.temperature_2m_max
  })
  minTemperature = computed(() => {
    return this.response.value()!.daily.temperature_2m_min
  })
  precProb = computed(() => {
    return this.response.value()!.daily.precipitation_probability_max
  })
  sunrise = computed(() => {
    return this.response.value()!.daily.sunrise
  })
  sunset = computed(() => {
    return this.response.value()!.daily.sunset
  })
  currentTime = computed(() => {
    return this.response.value()!.current.time
  })
  date = computed(() => {
    return this.response.value()!.daily.time
  })

  receiveIndex(evt: number) {
    this.index = evt
  }

  days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

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
    "56": "Freezing drizzle",
    "57": "Freezing drizzle",
    "61": "Slight rain",
    "63": "Moderate rain",
    "65": "Heavy rain",
    "66": "Freezing rain",
    "67": "Freezing rain",
    "71": "Slight snowfall",
    "73": "Moderate snowfall",
    "75": "Heavy snowfall",
    "77": "Snow grains",
    "80": "Slight showers",
    "81": "Moderate showers",
    "82": "Violent showers",
    "85": "Snow showers",
    "86": "Snow showers",
    "95": "Thunderstorm",
    "96": "Thunderstorm with hail",
    "97": "Heavy thunderstorm",
    "99": "Thunderstorm with hail"
  }
  
  formatTime(isoDate: string): string {
    return isoDate.slice(11, 16)
  }

  formatDateTime(isoDate?: string): string {
    if (!isoDate) {
      return ''
    }
    return `${isoDate.slice(8, 10)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)} ${isoDate.slice(11, 16)}`
  }
}
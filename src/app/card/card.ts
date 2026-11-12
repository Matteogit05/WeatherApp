import { Component, input, computed, output, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeatherResponse } from '../models/weather-model';
import { RouterLink } from '@angular/router';
import { WeatherCodeMapper } from '../services/wc-mapper';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  weatherData = input<WeatherResponse>()
  index = input.required<number>()

  broadcaster = output<any>()

  weatherCodeMapper = inject(WeatherCodeMapper)

  weatherCode = computed(() => this.weatherCodeMapper.getWeatherCode(this.weatherData()!.daily.weather_code[this.index()]))
  precProb = computed(() => this.weatherData()!.daily.precipitation_probability_max[this.index()])
  maxTemperature = computed(() => this.weatherData()!.daily.temperature_2m_max[this.index()])
  minTemperature = computed(() => this.weatherData()!.daily.temperature_2m_min[this.index()])
  weekDate = computed(() => this.weatherData()!.daily.time[this.index()])

  onClick(){
    this.broadcaster.emit(this.index())
    console.log('event emitted')
  }
}

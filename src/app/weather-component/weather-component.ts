import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Component, input, signal, inject, computed, InputSignal, ElementRef, viewChild } from '@angular/core';
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

  carousel = viewChild<ElementRef<HTMLDivElement>>('carouselContainer')
  canScrollLeft = signal(false)
  canScrollRight = signal(true)
  
  weatherService = inject(WeatherService)
  response = this.weatherService.getData(this.lat, this.lon)

  weatherCode = computed(() => this.response.value()!.daily.weather_code)
  currentWeatherCode = computed(() => this.response.value()!.current.weather_code)
  currentTemperature = computed(() => this.response.value()!.current.temperature_2m)
  maxTemperature = computed(() => this.response.value()!.daily.temperature_2m_max)
  minTemperature = computed(() => this.response.value()!.daily.temperature_2m_min)
  precProb = computed(() => this.response.value()!.daily.precipitation_probability_max)
  sunrise = computed(() => this.response.value()!.daily.sunrise)
  sunset = computed(() => this.response.value()!.daily.sunset)
  currentTime = computed(() => this.response.value()!.current.time)
  date = computed(() => this.response.value()!.daily.time)

  days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  receiveIndex(evt: number) {
    this.index = evt
  }

  scrollCarousel(direction: number) {
    const container = this.carousel()?.nativeElement
    if (!container) return

    const cardElement = container.querySelector('app-card') as HTMLElement
    if (!cardElement) return

    const cardWidth = cardElement.offsetWidth
    const gap = 16
    const scrollAmount = (cardWidth + gap) * 3 * direction

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  checkScroll() {
    const container = this.carousel()?.nativeElement
    if (!container) return

    this.canScrollLeft.set(container.scrollLeft > 0)
    const maxScroll = container.scrollWidth - container.clientWidth
    this.canScrollRight.set(Math.ceil(container.scrollLeft) < maxScroll)
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
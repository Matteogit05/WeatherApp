import { Component, input, signal, inject, computed, ElementRef, viewChild } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { DailyGraph } from '../daily-graph/daily-graph';
import { Card } from '../card/card';
import { Formatter } from '../services/formatter';
import { WeatherCodeMapper } from '../services/wc-mapper';

@Component({
  imports: [DailyGraph, Card],
  selector: 'app-weather-component',
  styleUrl: './weather-component.css',
  templateUrl: './weather-component.html',
})
export class WeatherComponent {
  lat = input.required<number>()
  lon = input.required<number>()
  index = signal(0)

  formatter = inject(Formatter)
  weatherCodeMapper = inject(WeatherCodeMapper)

  carousel = viewChild<ElementRef<HTMLDivElement>>('carouselContainer')
  canScrollLeft = signal(false)
  canScrollRight = signal(true)

  weatherService = inject(WeatherService)
  response = this.weatherService.getData(this.lat, this.lon)

  weatherCode = computed(() => this.weatherCodeMapper.getWeatherCode(this.response.value()!.daily.weather_code[this.index()]))
  currentWeatherCode = computed(() => this.weatherCodeMapper.getWeatherCode(this.response.value()!.current.weather_code))
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
    this.index.set(evt)
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
}

import { Component, inject, computed, signal, WritableSignal, effect } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { debounceTime, map, Subject, switchMap, tap } from 'rxjs'
import { WeatherService } from '../services/weather-service'
import { StorageService } from '../services/storage-service'
import { ActivatedRoute, RouterLink, Router } from '@angular/router'
import { DatePipe } from '@angular/common'
import { WeatherCodeMapper } from '../services/wc-mapper'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { DetailedResponse } from '../models/weather-model'

@Component({
  imports: [DatePipe, RouterLink, MatTooltipModule, MatButtonModule],
  selector: 'app-detail',
  styleUrl: './detail.css',
  templateUrl: './detail.html',
})
export class Detail {
  private navigator = inject(Router)
  private weatherService = inject(WeatherService)
  private sessionStorage = inject(StorageService)
  private weatherCodeMapper = inject(WeatherCodeMapper)
  private route = inject(ActivatedRoute)

  isLoading = signal(true)
  isDataInRange = signal(true)
  detailsData: WritableSignal<DetailedResponse | null> = signal(null)

  private detailedResponse$: Subject<void> = new Subject<void>()

  lat = computed(() => this.sessionStorage.coordinates().latitude)
  lon = computed(() => this.sessionStorage.coordinates().longitude)

  date = toSignal(this.route.paramMap.pipe(map((paramMap) => paramMap.get('day'))), {
    initialValue: null
  })

  readonly dates = this.buildDates()
  readonly dateIndex = computed(() => this.dates.indexOf(this.date() ?? ''))

  canGoBack = computed(() => this.dateIndex() > 0)
  canGoForward = computed(() => this.dateIndex() >= 0 && this.dateIndex() < this.dates.length - 1)

  time = computed(() => this.detailsData()!.daily.time)
  weatherCode = computed(() =>
    this.weatherCodeMapper.getWeatherCode(this.detailsData()!.daily.weather_code[0]),
  )
  maxTemperature = computed(() => this.detailsData()?.daily.temperature_2m_max)
  minTemperature = computed(() => this.detailsData()!.daily.temperature_2m_min)

  sunrise = computed(() => this.detailsData()!.daily.sunrise)
  sunset = computed(() => this.detailsData()!.daily.sunset)
  daylight = computed(() => {
    const totalSeconds = this.detailsData()!.daily.daylight_duration
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    return `${hours}h ${minutes.toString().padStart(2, '0')}min`
  })
  moonrise = computed(() => this.detailsData()!.daily.moonrise)
  moonset = computed(() => this.detailsData()!.daily.moonset)
  moonPhase = computed(() => {
    const fraction = this.detailsData()!.daily.moon_phase
    const phases = [
      'New Moon',
      'Waxing crescent',
      'First quarter',
      'Waxing gibbous',
      'Full Moon',
      'Waning gibbous',
      'Last quarter',
      'Waning crescent',
      'New Moon',
    ]

    return phases[Math.round(fraction * 8)]
  })
  precProb = computed(() => this.detailsData()!.daily.precipitation_probability_max)
  rainSum = computed(() => this.detailsData()!.daily.rain_sum)
  windSpeed = computed(() => this.detailsData()!.daily.wind_speed_10m_mean)
  windDirection = computed(() => {
    const degrees = this.detailsData()!.daily.wind_direction_10m_dominant[0]
    const normalizedDegrees = ((degrees % 360) + 360) % 360
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

    return directions[Math.round(normalizedDegrees / 45) % directions.length]
  })
  relativeHumidity = computed(() => this.detailsData()!.daily.relative_humidity_2m_mean)
  surfacePressure = computed(() => this.detailsData()!.daily.surface_pressure_mean)
  visibilityMean = computed(() =>
    (this.detailsData()!.daily.visibility_mean[0] / 1000).toString().slice(0, 3),
  )
  cloudCover = computed(() => this.detailsData()!.daily.cloud_cover_mean)

  constructor() {
    effect(() => {
      if (this.dates.includes(this.date()!)) {
        this.detailedResponse$.next()
      } else {
        this.isDataInRange.set(false)
        this.isLoading.set(false)
      }
    })
    this.detailedResponse$
      .pipe(
        tap(() => this.isLoading.set(true)),
        debounceTime(500),
        switchMap(() => this.weatherService.getDetailDataObs(this.lat, this.lon, this.date))
      )
      .subscribe((value) => {
        this.detailsData.set(value)
        this.isLoading.set(false)
      })
  }

  private buildDates(): string[] {
    const currentDate = new Date()

    return Array.from({ length: 15 }, (_, offset) => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + offset,
      )

      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    })
  }

  previous() {
    if (this.canGoBack()) {
      this.navigator.navigate(['/detail', this.dates[this.dateIndex() - 1]])
    }
  }

  next() {
    if (this.canGoForward()) {
      this.navigator.navigate(['/detail', this.dates[this.dateIndex() + 1]])
    }
  }
}

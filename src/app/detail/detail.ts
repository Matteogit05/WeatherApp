import { Component, inject, computed, signal } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { StorageService } from '../services/storage-service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-detail',
  styleUrl: './detail.css',
  templateUrl: './detail.html',
})
export class Detail {
  private weatherService = inject(WeatherService)
  private sessionStorage = inject(StorageService)
  private route = inject(ActivatedRoute)

  lat = computed(() => this.sessionStorage.coordinates().latitude)
  lon = computed(() => this.sessionStorage.coordinates().longitude)

  date = this.route.snapshot.paramMap.get('day')

  detailedResponse = this.weatherService.getDetailData(this.lat, this.lon, this.date!)

  time = computed(() => this.detailedResponse.value()!.daily.time[0])
  weatherCode = computed(() => this.detailedResponse.value()!.daily.weather_code)
  maxTemperature = computed(() => this.detailedResponse.value()!.daily.temperature_2m_max)
  minTemperature = computed(() => this.detailedResponse.value()!.daily.temperature_2m_min)

  daylightDuration = computed(() => this.detailedResponse.value()!.daily.daylight_duration)
  sunrise = computed(() => this.detailedResponse.value()!.daily.sunrise)
  sunset = computed(() => this.detailedResponse.value()!.daily.sunset)
  moonrise = computed(() => this.detailedResponse.value()!.daily.moonrise)
  moonset = computed(() => this.detailedResponse.value()!.daily.moonset)
  moonphase = computed(() => this.detailedResponse.value()!.daily.moonphase)
  precProb = computed(() => this.detailedResponse.value()!.daily.precipitation_probability_max)
  windSpeed = computed(() => this.detailedResponse.value()!.daily.wind_speed_10m_max)
  windDirection = computed(() => this.detailedResponse.value()!.daily.wind_direction_10m_dominant)
  relativeHumidity = computed(() => this.detailedResponse.value()!.daily.relative_humidity_2m_max)
  surfacePressure = computed(() => this.detailedResponse.value()!.daily.surface_pressure_max)
  visibilityMean = computed(() => this.detailedResponse.value()!.daily.visibilty_mean)
}

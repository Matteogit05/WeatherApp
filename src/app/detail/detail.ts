import { Component, inject, computed, signal } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { StorageService } from '../services/storage-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WeatherCodeMapper } from '../services/wc-mapper';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-detail',
  styleUrl: './detail.css',
  templateUrl: './detail.html',
})
export class Detail {
  private weatherService = inject(WeatherService)
  private sessionStorage = inject(StorageService)
  private weatherCodeMapper = inject(WeatherCodeMapper)
  private route = inject(ActivatedRoute)

  lat = computed(() => this.sessionStorage.coordinates().latitude)
  lon = computed(() => this.sessionStorage.coordinates().longitude)

  date = this.route.snapshot.paramMap.get('day')

  detailedResponse = this.weatherService.getDetailData(this.lat, this.lon, this.date!)

  time = computed(() => this.detailedResponse.value()!.daily.time[0])
  weatherCode = computed(() => this.weatherCodeMapper.getWeatherCode(this.detailedResponse.value()!.daily.weather_code[0]))
  maxTemperature = computed(() => this.detailedResponse.value()!.daily.temperature_2m_max)
  minTemperature = computed(() => this.detailedResponse.value()!.daily.temperature_2m_min)

  sunrise = computed(() => this.detailedResponse.value()!.daily.sunrise[0])
  sunset = computed(() => this.detailedResponse.value()!.daily.sunset[0])
  daylight = computed(() => (this.detailedResponse.value()!.daily.daylight_duration / 3600).toString().slice(0, 4))
  moonrise = computed(() => this.detailedResponse.value()!.daily.moonrise[0])
  moonset = computed(() => this.detailedResponse.value()!.daily.moonset[0])
  moonphase = computed(() => this.detailedResponse.value()!.daily.moon_phase)
  precProb = computed(() => this.detailedResponse.value()!.daily.precipitation_probability_max)
  rainSum = computed(() => this.detailedResponse.value()!.daily.rain_sum)
  windSpeed = computed(() => this.detailedResponse.value()!.daily.wind_speed_10m_mean)
  windDirection = computed(() => this.detailedResponse.value()!.daily.wind_direction_10m_dominant)
  relativeHumidity = computed(() => this.detailedResponse.value()!.daily.relative_humidity_2m_mean)
  surfacePressure = computed(() => this.detailedResponse.value()!.daily.surface_pressure_mean)
  visibilityMean = computed(() => (this.detailedResponse.value()!.daily.visibility_mean[0] / 1000).toString().slice(0, 3))
  cloudCover = computed(() => this.detailedResponse.value()!.daily.cloud_cover_mean)
}
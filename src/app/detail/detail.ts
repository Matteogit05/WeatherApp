import { Component, inject, computed, signal, WritableSignal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map, Subject, switchMap, tap } from 'rxjs';
import { WeatherService } from '../services/weather-service';
import { StorageService } from '../services/storage-service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WeatherCodeMapper } from '../services/wc-mapper';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'
import { DetailedResponse } from '../models/weather-model';

@Component({
  imports: [DatePipe, RouterLink, MatTooltipModule, MatButtonModule],
  selector: 'app-detail',
  styleUrl: './detail.css',
  templateUrl: './detail.html',
})
export class Detail {
  private navigator = inject(Router)
  private weatherService = inject(WeatherService);
  private sessionStorage = inject(StorageService);
  private weatherCodeMapper = inject(WeatherCodeMapper);
  private route = inject(ActivatedRoute);

  isLoading = signal(true);
  detailsData: WritableSignal<DetailedResponse | null> = signal(null);

  private detailedResponse$: Subject<void> = new Subject<void>();

  lat = computed(() => this.sessionStorage.coordinates().latitude);
  lon = computed(() => this.sessionStorage.coordinates().longitude);

  date = toSignal(this.route.paramMap.pipe(map((paramMap) => {
    const val = paramMap.get('day')
    return Number(val)
  })));

  canGoBack = computed(() => this.date() != 0)
  canGoForward = computed(() => this.date() != 14)

  time = computed(() => this.detailsData()!.daily.time[this.date()!]);
  weatherCode = computed(() =>
    this.weatherCodeMapper.getWeatherCode(this.detailsData()!.daily.weather_code[this.date()!]),
  );
  maxTemperature = computed(() => this.detailsData()?.daily.temperature_2m_max[this.date()!]);
  minTemperature = computed(() => this.detailsData()!.daily.temperature_2m_min[this.date()!]);

  sunrise = computed(() => this.detailsData()!.daily.sunrise[this.date()!]);
  sunset = computed(() => this.detailsData()!.daily.sunset[this.date()!]);
  daylight = computed(() => {
    const totalSeconds = this.detailsData()!.daily.daylight_duration[this.date()!];
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
  });
  moonrise = computed(() => this.detailsData()!.daily.moonrise[this.date()!]);
  moonset = computed(() => this.detailsData()!.daily.moonset[this.date()!]);
  moonPhase = computed(() => {
    const fraction = this.detailsData()!.daily.moon_phase[this.date()!];
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
    ];

    return phases[Math.round(fraction * 8)];
  });
  precProb = computed(() => this.detailsData()!.daily.precipitation_probability_max[this.date()!]);
  rainSum = computed(() => this.detailsData()!.daily.rain_sum[this.date()!]);
  windSpeed = computed(() => this.detailsData()!.daily.wind_speed_10m_mean[this.date()!]);
  windDirection = computed(() => {
    const degrees = this.detailsData()!.daily.wind_direction_10m_dominant[this.date()!];
    const normalizedDegrees = ((degrees % 360) + 360) % 360;
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    return directions[Math.round(normalizedDegrees / 45) % directions.length];
  });
  relativeHumidity = computed(() => this.detailsData()!.daily.relative_humidity_2m_mean[this.date()!]);
  surfacePressure = computed(() => this.detailsData()!.daily.surface_pressure_mean[this.date()!]);
  visibilityMean = computed(() =>
    (this.detailsData()!.daily.visibility_mean[this.date()!] / 1000).toString().slice(0, 3),
  );
  cloudCover = computed(() => this.detailsData()!.daily.cloud_cover_mean[this.date()!])

  constructor() {
    /*effect(() => {
      this.date()
      this.detailedResponse$.next()
    })*/
    this.detailedResponse$
      .pipe(
        switchMap(() => this.weatherService.getDetailDataObs(this.lat, this.lon)),
        tap(() => this.isLoading.set(true)),
        debounceTime(500)
      )
      .subscribe((value) => {
        this.detailsData.set(value);
        this.isLoading.set(false);
      })
    this.detailedResponse$.next();
  }

  next() {
    this.navigator.navigate(['/detail', this.date()! + 1]);
  }

  previous() {
    this.navigator.navigate(['/detail', this.date()! - 1])
  }
}

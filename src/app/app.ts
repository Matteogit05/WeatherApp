import { Component, signal, inject, WritableSignal, computed } from '@angular/core';
import { form, FormRoot, FormField, required } from '@angular/forms/signals'
import { RouterOutlet } from '@angular/router';
import { fetchWeatherApi } from 'openmeteo';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { WeatherResponseDaily } from './models/weather-model';
import { WeatherComponent } from './weather-component/weather-component';
import { Coordinate } from './models/coordinate-model';
import { StorageService } from './storage-service';

@Component({
  imports: [WeatherComponent, FormRoot, FormField],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('WeatherApp');
  sessionStorage = inject(StorageService)

  now: Date = new Date()

  la = computed(() => this.sessionStorage.coordinates().latitude)
  lo = computed(() => this.sessionStorage.coordinates().longitude)

  readonly model = signal<Coordinate>({
    latitude: this.la(),
    longitude: this.lo()
  })

  coordForm = form(this.model, path => {
    required(path.latitude, {message: 'Latitude is required'})
    required(path.longitude, {message: 'Longitude is required'})
  }, {
    submission: {
      action: async frm => {
        this.sessionStorage.coordinates.set({
          latitude: frm().value().latitude,
          longitude: frm().value().longitude
        })
      }
    }
  })
}

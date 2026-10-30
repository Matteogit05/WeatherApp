import { Component, signal, inject, WritableSignal } from '@angular/core';
import { form, FormRoot, FormField, required } from '@angular/forms/signals'
import { RouterOutlet } from '@angular/router';
import { fetchWeatherApi } from 'openmeteo';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { WeatherResponseDaily } from './models/weather-model';
import { WeatherComponent } from './weather-component/weather-component';
import { Coordinate } from './models/coordinate-model';

@Component({
  imports: [WeatherComponent, FormRoot, FormField],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('WeatherApp');
  now: Date = new Date()

  la = 43.1122
  lo = 12.3888

  readonly model = signal<Coordinate>({
    latitude: 40,
    longitude: 40
  })

  coordForm = form(this.model, path => {
    required(path.latitude, {message: 'Latitude is required'})
    required(path.longitude, {message: 'Longitude is required'})
  }, {
    submission: {
      action: async frm => {
        this.la = frm().value().latitude
        this.lo = frm().value().longitude
      }
    }
  })
}

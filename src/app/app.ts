import { Component, signal, inject, WritableSignal, computed } from '@angular/core';
import { form, FormRoot, FormField, required } from '@angular/forms/signals'
import { RouterOutlet } from '@angular/router';
import { fetchWeatherApi } from 'openmeteo';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { WeatherResponse } from './models/weather-model';
import { WeatherComponent } from './weather-component/weather-component';
import { Coordinate } from './models/coordinate-model';
import { StorageService } from './services/storage-service';
import { Form } from './form/form';
import { MatDialog } from '@angular/material/dialog'

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private sessionStorage = inject(StorageService)

  latitude = computed(() => this.sessionStorage.coordinates().latitude)
  longitude = computed(() => this.sessionStorage.coordinates().longitude)
}

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
  imports: [WeatherComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('WeatherApp');
  sessionStorage = inject(StorageService)
  modal = inject(MatDialog)

  now: Date = new Date()

  la = computed(() => this.sessionStorage.coordinates().latitude)
  lo = computed(() => this.sessionStorage.coordinates().longitude)

  openModal() {
    const modalRef = this.modal.open(Form)
  }
}

import { Component, input, signal, computed, inject } from '@angular/core';
import { StorageService } from '../services/storage-service';
import { MatDialog } from '@angular/material/dialog';
import { Form } from '../form/form';
import { WeatherComponent } from '../weather-component/weather-component';

@Component({
  imports: [WeatherComponent],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
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

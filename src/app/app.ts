import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { StorageService } from './services/storage-service';
import { Form } from './form/form';
import { MatDialog } from '@angular/material/dialog'
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  imports: [RouterOutlet, RouterLink, MatTooltipModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private sessionStorage = inject(StorageService)
  private modal = inject(MatDialog)

  latitude = computed(() => this.sessionStorage.coordinates().latitude)
  longitude = computed(() => this.sessionStorage.coordinates().longitude)

  openModal() {
    this.modal.open(Form)
  }
}

import { Component, input, inject, signal } from '@angular/core';
import { Coordinate } from '../models/coordinate-model';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { StorageService } from '../services/storage-service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  imports: [FormRoot, FormField, MatButtonModule],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form {
  sessionStorage = inject(StorageService)
  readonly modalRef = inject(MatDialogRef<Form>)

  la = input(0)
  lo = input(0)

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
        this.modalRef.close()
      }
    }
  })

  onNoClick() {
    this.modalRef.close()
  }
}

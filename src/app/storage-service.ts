import { isPlatformBrowser } from '@angular/common';
import { effect, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { Coordinate } from './models/coordinate-model';

@Service()
export class StorageService {
    private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
    private defaultCoords: Coordinate = {
        latitude: 43.1122,
        longitude: 12.3888
    }
    readonly coordinates = signal<Coordinate>(this.getInitialCoords())

    constructor() {
        effect(() => {
            const coords = this.coordinates()
            if (this.isBrowser) {
                sessionStorage.setItem('weather_coords', JSON.stringify(coords))
            }
        })
    }

    private getInitialCoords(): Coordinate {
        if (this.isBrowser) {
            const stored = sessionStorage.getItem('weather_coords')
            if (stored) {
                try {
                    return JSON.parse(stored)
                }
                catch (err) {
                    console.log(`Error: ${err}`)
                }
            }
        }
        return this.defaultCoords
    }
}
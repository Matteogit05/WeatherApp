import { Service } from '@angular/core';

@Service()
export class Formatter {
    formatTime(isoDate: string): string {
        return isoDate.slice(11, 16)
    }

    formatDateTime(isoDate?: string): string {
        if (!isoDate) {
        return ''
        }
        return `${isoDate.slice(8, 10)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)} ${isoDate.slice(11, 16)}`
    }
}

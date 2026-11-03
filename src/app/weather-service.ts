import { httpResource, HttpResourceRef } from '@angular/common/http';
import { InputSignal, Service } from '@angular/core';
import { WeatherResponseDaily, WeatherResponseWeekly } from './models/weather-model';

@Service()
export class WeatherService {
    getDataDaily(lat: InputSignal<number>, lon: InputSignal<number>) {
        const resDaily = httpResource<WeatherResponseDaily>(() => `https://api.open-meteo.com/v1/forecast?latitude=${lat()}&longitude=${lon()}&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,rain,weather_code,cloud_cover&current=temperature_2m&models=ecmwf_ifs&timezone=auto&forecast_days=1`)
        
        return resDaily
    }

    getDataWeekly(lat: InputSignal<number>, lon: InputSignal<number>) {
        const resWeekly = httpResource<WeatherResponseWeekly>(() => `https://api.open-meteo.com/v1/forecast?latitude=${lat()}&longitude=${lon()}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&models=ecmwf_ifs&timezone=auto`)

        return resWeekly
    }
}
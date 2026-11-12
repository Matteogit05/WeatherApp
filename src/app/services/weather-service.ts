import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Input, InputSignal, Service, Signal } from '@angular/core';
import { DetailedResponse, WeatherResponse } from '../models/weather-model';

@Service()
export class WeatherService {
    getData(lat: InputSignal<number>, lon: InputSignal<number>) {
        const res = httpResource<WeatherResponse>(() => `https://api.open-meteo.com/v1/forecast?latitude=${lat()}&longitude=${lon()}&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,rain,weather_code,cloud_cover&current=temperature_2m,weather_code&models=ecmwf_ifs&timezone=auto&forecast_days=15`)
        
        return res
    }

    getDetailData(lat: Signal<number>, lon: Signal<number>, date: string) {
        const res = httpResource<DetailedResponse>(() => `https://api.open-meteo.com/v1/forecast?latitude=${lat()}&longitude=${lon()}&daily=weather_code,temperature_2m_max,temperature_2m_min,daylight_duration,sunset,sunrise,moonrise,moonset,moon_phase,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max,surface_pressure_max,visibility_mean&models=ecmwf_ifs&timezone=auto&start_date=${date}&end_date=${date}`)

        return res
    }
}
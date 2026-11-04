import { Data } from "@angular/router"

export interface WeatherResponseDaily{
  daily: {
    sunrise: string,
    sunset: string,
    weather_code: number,
    temperature_2m_max: number,
    temperature_2m_min: number,
    precipitation_probability_max: number
  }
  hourly: {
    temperature_2m: number[],
    precipitation_probability: [],
    rain: [],
    weather_code: number[],
    cloud_cover: [],
    time: string[]
  }
  current: {
    temperature_2m: number,
    time: string
  }
  timezone: string
  forecast_days: number
}

export interface WeatherResponseWeekly {
  daily: {
    weather_code: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[]
    precipitation_probability_max: any,
    time: string[]
  }
  timezone: string
}
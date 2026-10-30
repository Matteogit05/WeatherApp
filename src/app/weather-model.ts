export interface WeatherResponseDaily{
  daily: {
    sunrise: string[],
    sunset: string[],
    weather_code: number,
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_probability_max: any
  }
  hourly: {
    temperature_2m: number[],
    precipitation_probability: [],
    rain: [],
    weather_code: number[],
    cloud_cover: []
  }
  current: {
    temperature_2m: number
  }
  timezone: string
  forecast_days: number
}
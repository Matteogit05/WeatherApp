export interface WeatherResponse{
  daily: {
    sunrise: string[],
    sunset: string[],
    weather_code: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_probability_max: number[],
    time: string[]
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
}
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
    time: string,
    weather_code: number
  }
}

export interface DetailedResponse {
  daily: {
    time: string[],
    weather_code: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    daylight_duration: number[],
    sunrise: string[],
    sunset: string[],
    moonrise: string[],
    moonset: string[],
    moonphase: number[],
    precipitation_probability_max: number[],
    wind_speed_10m_max: number[],
    wind_direction_10m_dominant: number[],
    relative_humidity_2m_max: number[],
    surface_pressure_max: number[],
    visibilty_mean: number[]
  }
}
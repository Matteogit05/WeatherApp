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
    sunrise: string[],
    sunset: string[],
    daylight_duration: number,
    moonrise: string[],
    moonset: string[],
    moon_phase: number,
    precipitation_probability_max: number[],
    rain_sum: number,
    wind_direction_10m_dominant: number[],
    visibility_mean: number[],
    cloud_cover_mean: number[],
    relative_humidity_2m_mean: number[],
    surface_pressure_mean: number[],
    wind_speed_10m_mean: number[]
  }
}

/*
  "daily_units": {
    "time": "iso8601",
    "weather_code": "wmo code",
    "rain_sum": "mm",
    "temperature_2m_max": "°C",
    "temperature_2m_min": "°C",
    "daylight_duration": "s",
    "sunset": "iso8601",
    "sunrise": "iso8601",
    "moonrise": "iso8601",
    "moonset": "iso8601",
    "moon_phase": "fraction",
    "precipitation_probability_max": "%",
    "wind_direction_10m_dominant": "°",
    "visibility_mean": "m",
    "cloud_cover_mean": "%",
    "relative_humidity_2m_mean": "%",
    "surface_pressure_mean": "hPa",
    "wind_speed_10m_mean": "km/h"
  },
*/
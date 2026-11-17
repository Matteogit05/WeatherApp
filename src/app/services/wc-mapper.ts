import { Service } from '@angular/core';

@Service()
export class WeatherCodeMapper {
    weatherCodeMap: Record<string, string> = {
        "0": "Clear sky",
        "1": "Mainly clear",
        "2": "Partly cloudy",
        "3": "Overcast",
        "45": "Fog",
        "48": "Depositing rime fog",
        "51": "Light drizzle",
        "53": "Moderate drizzle",
        "55": "Dense drizzle",
        "56": "Freezing drizzle",
        "57": "Freezing drizzle",
        "61": "Slight rain",
        "63": "Moderate rain",
        "65": "Heavy rain",
        "66": "Freezing rain",
        "67": "Freezing rain",
        "71": "Slight snowfall",
        "73": "Moderate snowfall",
        "75": "Heavy snowfall",
        "77": "Snow grains",
        "80": "Slight showers",
        "81": "Moderate showers",
        "82": "Violent showers",
        "85": "Snow showers",
        "86": "Snow showers",
        "95": "Thunderstorm",
        "96": "Thunderstorm with hail",
        "97": "Heavy thunderstorm",
        "99": "Thunderstorm with hail"
    }
    
    getWeatherCode(code: number) {
        return this.weatherCodeMap[code]
    }
}

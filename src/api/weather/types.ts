/* eslint-disable @typescript-eslint/no-namespace */
type WeatherDesc = Array<{
  id: number
  main: string
  description: string
  icon: string
}>

export type GetWeatherByLocationParams = {
  lat: number
  lon: number
}

export type GetWeatherByLocationResponse = {
  lat: number
  lon: number
  timezone: 'Europe/Moscow'
  timezone_offset: number
  current: {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: WeatherDesc
  }
  minutely: Array<{
    dt: number
    precipitation: number
  }>
  hourly: Array<{
    dt: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: WeatherDesc
    pop: number
  }>
  daily: Array<{
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: {
      day: number
      min: number
      max: number
      night: number
      eve: number
      morn: number
    }
    feels_like: {
      day: number
      night: number
      eve: number
      morn: number
    }
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: WeatherDesc
    clouds: number
    pop: number
    snow: number
    uvi: number
  }>
}

export type GetCityNameByLocationResponse = Array<{
  name: string
  local_names: {
    ru?: string
  }
}>

export type Weather = GetWeatherByLocationResponse

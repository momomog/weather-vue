import axios from 'axios'
import {
  //@ts-ignore
  GetCityNameByLocationResponse,
  GetWeatherByLocationParams,
  GetWeatherByLocationResponse,
} from '@/api/weather/types'

const axiosInstance = axios.create({
  baseURL: '/weather',
  timeout: 10000,
})
const key = '5763846055e992c5f47c21ba66337e91'
export const baseImageUrl = 'https://openweathermap.org/img/wn/'

export const weatherApi = {
  getWeatherByLocation: ({ lat, lon }: GetWeatherByLocationParams) =>
    axiosInstance.get<GetWeatherByLocationResponse>('/data/2.5/onecall', {
      params: {
        lat,
        lon,
        lang: 'ru',
        units: 'metric',
        exclude: 'minutely',
        appid: key,
      },
    }),
  getCityNameByLocation: ({ lat, lon }: GetWeatherByLocationParams) =>
    axiosInstance.get<GetCityNameByLocationResponse>('/geo/1.0/reverse', {
      params: {
        lat,
        lon,
        limit: 5,
        appid: key,
      },
    }),
}

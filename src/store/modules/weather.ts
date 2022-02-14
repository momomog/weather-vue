import { Module } from 'vuex'
import { RootState } from '@/store'
import { Mutations } from '@/store/mutation-types'
import { Actions } from '@/store/action-types'
import { weatherApi } from '@/api/weather/api'
import { Nullable } from '@/store/modules/user'
import { StatusCodes } from '@/store/common-types'
import { Weather } from '@/api/weather/types'

type WeatherData = {
  cityName: string
} & Weather

export type WeatherState = {
  data: Nullable<WeatherData>
  status: StatusCodes
  errorMessage: string
}

export const weather: Module<WeatherState, RootState> = {
  // namespaced: true,
  state: {
    data: null,
    status: StatusCodes.initial,
    errorMessage: '',
  },
  getters: {
    cityName(state) {
      return state.data?.cityName
    },
    currentWeather(state) {
      return state.data?.current
    },
    dailyWeather(state) {
      return state.data?.daily
    },
    hourlyWeather(state) {
      return state.data?.hourly
    },
  },
  actions: {
    [Actions.getWeather]({ commit }, payload: Array<number>) {
      commit(Mutations.weatherError, '')
      commit(Mutations.weatherStatus, StatusCodes.loading)
      Promise.all([
        weatherApi.getWeatherByLocation({ lat: payload[0], lon: payload[1] }),
        weatherApi.getCityNameByLocation({ lat: payload[0], lon: payload[1] }),
      ])
        .then(([weather, city]) => {
          const state = {
            ...weather.data,
            cityName: city.data[0]?.local_names?.ru || city.data[0].name,
          }
          commit(Mutations.setWeather, state)
          commit(Mutations.weatherStatus, StatusCodes.ready)
        })
        .catch(e => commit(Mutations.weatherError, e.message))
    },
  },
  mutations: {
    [Mutations.setWeather](state, weather: WeatherData) {
      state.data = weather
    },
    [Mutations.weatherStatus](state, status: StatusCodes) {
      state.status = status
    },
    [Mutations.weatherError](state, errorMessage: string) {
      state.status = StatusCodes.error
      state.errorMessage = errorMessage
    },
  },
}

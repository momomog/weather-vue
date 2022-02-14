import { createStore } from 'vuex'
import { modal, ModalState } from '@/store/modules/modal'
import { user, UserState } from '@/store/modules/user'
import { weather, WeatherState } from '@/store/modules/weather'

export type RootState = {
  modal: ModalState
  user: UserState
  weather: WeatherState
}

export const store = createStore<RootState>({
  modules: {
    modal,
    user,
    weather,
  },
})

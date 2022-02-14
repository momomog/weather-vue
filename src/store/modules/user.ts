import { LoginParams, UserType } from '@/api/user/types'
import { Module } from 'vuex'
import { RootState } from '@/store'
import { userApi } from '@/api/user/api'
import { Mutations } from '@/store/mutation-types'
import { Actions } from '@/store/action-types'
import { StatusCodes } from '@/store/common-types'

export type Nullable<T> = T | null

export type User = Nullable<UserType>
type Source = 'user' | 'location'

export type UserState = {
  user: {
    data: User
    status: StatusCodes
    errorMessage: string
  }
  location: {
    data: Array<number>
    status: StatusCodes
    errorMessage: string
  }
}

export const user: Module<UserState, RootState> = {
  // namespaced: true,
  state: {
    user: {
      data: null,
      status: StatusCodes.initial,
      errorMessage: '',
    },
    location: {
      data: [],
      status: StatusCodes.initial,
      errorMessage: '',
    },
  },
  actions: {
    [Actions.login]({ commit }, params: LoginParams) {
      commit(Mutations.userError, { source: 'user', message: '' })
      commit(Mutations.userStatus, { status: StatusCodes.loading, source: 'user' })
      userApi
        .login(params)
        .then(user => {
          commit(Mutations.setUser, user)
          commit(Mutations.toggleModal)
          commit(Mutations.userStatus, { status: StatusCodes.ready, source: 'user' })
        })
        .catch(e => {
          commit(Mutations.userError, { source: 'user', message: e.message })
        })
    },
    [Actions.getUserLocation]({ commit }) {
      if (navigator.geolocation) {
        commit(Mutations.userStatus, { status: StatusCodes.loading, source: 'location' })
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            commit(Mutations.userStatus, { status: StatusCodes.ready, source: 'location' })
            commit(Mutations.setLocation, [coords.latitude, coords.longitude])
          },
          err => commit(Mutations.userError, { message: err.message, source: 'location' })
        )
      } else {
        commit(Mutations.userError, { message: 'В вашем браузере недоступна геолокация', source: 'location' })
      }
    },
  },
  mutations: {
    [Mutations.setUser](state, user: User) {
      state.user.data = user
    },
    [Mutations.setLocation](state, location: Array<number>) {
      state.location.data = location
    },
    [Mutations.userStatus](state, p: { status: StatusCodes; source: Source }) {
      state[p.source].status = p.status
    },
    [Mutations.userError](state, p: { source: Source; message: string }) {
      state[p.source].status = StatusCodes.error
      state[p.source].errorMessage = p.message
    },
  },
}

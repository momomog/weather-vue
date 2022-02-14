import { Module } from 'vuex'
import { RootState } from '@/store'
import { Mutations } from '@/store/mutation-types'

export type ModalState = {
  isOpened: boolean
}
export const modal: Module<ModalState, RootState> = {
  // namespaced: true,
  state: {
    isOpened: false,
  },
  mutations: {
    [Mutations.toggleModal](state) {
      state.isOpened = !state.isOpened
    },
  },
}

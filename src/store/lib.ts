import { Store, useStore as baseUseStore } from 'vuex'
import { RootState } from '@/store/index'
import { InjectionKey } from 'vue'

export const injectionKey: InjectionKey<Store<RootState>> = Symbol()

export function useStore() {
  return baseUseStore(injectionKey)
}

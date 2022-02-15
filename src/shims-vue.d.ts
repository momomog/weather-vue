import { Store } from 'vuex'
import { RootState } from '@/store'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<unknown, unknown>, Record<unknown, unknown>, unknown>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}

declare module '*.svg' {
  const filePath: string
  export default filePath
}

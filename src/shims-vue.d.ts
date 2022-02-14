/* eslint-disable */
import { Store } from 'vuex'
import { RootState } from '@/store'
import { Computed, Mapper, MapperForState, MapperForStateWithNamespace, MapperWithNamespace } from 'vuex/types/helpers'


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}

declare module '*.svg' {
  const filePath: string;
  export default filePath;
}

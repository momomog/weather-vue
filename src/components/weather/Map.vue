<template>
  <div class="wrap">
    <yandex-map
      v-if="coords.length > 0 && status === StatusCodes.ready"
      :coords="coords"
      :zoom="10"
      @click="onMapClick"
    >
      <ymap-marker :coords="coords" marker-id="123" hint-content="Метка" />
    </yandex-map>
    <div v-if="errorMessage" class="status">{{ errorMessage }}</div>
    <div v-if="status === StatusCodes.loading" class="status"><Loader /></div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from '@/store/lib'
import { Actions } from '@/store/action-types'
import Loader from '../common/Loader.vue'
import { StatusCodes } from '@/store/common-types'

export default defineComponent({
  name: 'y-maps',
  components: {
    yandexMap,
    ymapMarker,
    Loader,
  },
  setup() {
    const store = useStore()
    let coords = ref([])
    const location = computed(() => store.state.user.location.data)
    const status = computed(() => store.state.user.location.status)
    const errorMessage = computed(() => store.state.user.location.errorMessage)

    watchEffect(() => {
      if (location.value.length > 0) coords.value = location.value
    })

    const onMapClick = e => {
      const newCoords = e.get('coords')
      coords.value = newCoords
      store.dispatch(Actions.getWeather, newCoords)
    }

    return {
      coords,
      onMapClick,
      status,
      errorMessage,
      StatusCodes,
    }
  },
})
</script>

<style>
.ymap-container {
  width: 100%;
  height: 100%;
  border: 1px solid #e3dfdf;
  border-radius: 10px;
}
.ymaps-2-1-79-map-copyrights-promo {
  display: none;
}
.ymaps-2-1-79-inner-panes {
  border-radius: 10px;
}
.ymaps-2-1-79-map {
  border-radius: 10px;
}
.status {
  border: 1px solid #e3dfdf;
  border-radius: 10px;
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

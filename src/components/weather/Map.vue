<template>
  <div class="wrap" v-if="coords.length > 0">
    <yandex-map :coords="coords" :zoom="10" @click="onMapClick">
      <ymap-marker :coords="coords" marker-id="123" hint-content="Метка" />
    </yandex-map>
  </div>
  <div v-else>no data</div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from '@/store/lib'
import { Actions } from '@/store/action-types'

export default defineComponent({
  name: 'y-maps',
  components: {
    yandexMap,
    ymapMarker,
  },
  setup() {
    const store = useStore()
    let coords = ref([])
    const location = computed(() => store.state.user.location.data)

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
    }
  },
})
</script>

<style>
.wrap {
}
.ymap-container {
  width: 100%;
  height: 100%;
  border: 1px solid #e3dfdf;
}
.ymaps-2-1-79-map-copyrights-promo {
  display: none;
}
</style>

<template>
  <div class="wrap">
    <CurrentWeather />
    <Map />
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, watchEffect } from 'vue'
import CurrentWeather from '../components/weather/Current.vue'
import { useStore } from '@/store/lib'
import { Actions } from '@/store/action-types'
import Map from '../components/weather/Map.vue'

export default defineComponent({
  name: 'weather',
  components: {
    Map,
    CurrentWeather,
  },
  setup() {
    const store = useStore()
    const userLocation = computed(() => store.state.user.location)
    const current = computed(() => store.getters.currentWeather)

    watchEffect(() => {
      if (userLocation.value.data.length > 0) {
        store.dispatch(Actions.getWeather, userLocation.value.data)
      }
    })

    onMounted(() => {
      store.dispatch(Actions.getUserLocation)
    })
    return {
      userLocation,
      current,
    }
  },
})
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 300px;
  > div {
    width: 49%;
  }
}
</style>

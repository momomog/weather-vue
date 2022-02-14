<template>
  <div class="title">Внимание! Для пользования сервисом необходимо разрешить геолокацию в Вашем браузере</div>
  <div class="wrap">
    <CurrentWeather />
    <Map />
  </div>
  <div class="wrap bottom">
    <Hourly />
    <Daily />
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, watchEffect } from 'vue'
import CurrentWeather from '../components/weather/Current.vue'
import { useStore } from '@/store/lib'
import { Actions } from '@/store/action-types'
import Map from '../components/weather/Map.vue'
import Hourly from '../components/weather/Hourly.vue'
import Daily from '../components/weather/Daily.vue'

export default defineComponent({
  name: 'weather',
  components: {
    Map,
    CurrentWeather,
    Hourly,
    Daily,
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
.title {
  font-size: 22px;
  margin-bottom: 20px;
}
.wrap {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 300px;
  margin-bottom: 15px;
  > div {
    width: 49%;
  }
}
.bottom {
  height: 150px;
}
</style>

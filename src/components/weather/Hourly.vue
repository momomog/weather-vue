<template>
  <div v-if="!isError">
    <div class="title" v-if="getWeatherStatus === StatusCodes.ready">Прогноз на ближайшие часы</div>
    <div class="wrp">
      <Loader v-if="getWeatherStatus === StatusCodes.loading" color="white" class="loader" />
      <template v-if="hourly && getWeatherStatus === StatusCodes.ready">
        <div v-for="hour in hourly" :key="hour.dt" class="item">
          <div class="divider" v-if="getTime(hour.dt) === '00:00'" />
          <div class="week" v-if="getTime(hour.dt) === '00:00'">
            {{ daysOfWeek[new Date(hour.dt * 1000).getDay()] }}
          </div>
          <div class="content">
            <div class="time">{{ getTime(hour.dt) }}</div>
            <img
              v-if="hour?.weather[0]"
              :src="getImageUrlByCode(hour.weather[0].icon)"
              :title="hour.weather[0].description"
              alt="icon"
            />
            <div class="temp">{{ Math.round(hour.temp) }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/lib'
import { getImageUrlByCode } from '@/lib'
import { daysOfWeek } from '@/components/constants'
import { StatusCodes } from '@/store/common-types'
import Loader from '../common/Loader.vue'

export default defineComponent({
  name: 'hourly-weather',
  components: {
    Loader,
  },
  setup() {
    const store = useStore()
    const hourly = computed(() => store.getters.hourlyWeather)
    const getWeatherStatus = computed(() => store.state.weather.status)
    const isError = computed(() => store.state.user.location.errorMessage)

    const getTime = (unixTime: number) => new Date(unixTime * 1000).toLocaleTimeString().slice(0, 5)

    return {
      hourly,
      isError,
      getImageUrlByCode,
      getWeatherStatus,
      getTime,
      daysOfWeek,
      StatusCodes,
    }
  },
})
</script>

<style scoped lang="scss">
.title {
  text-align: start;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 5px;
  margin-top: 10px;
}

.wrp {
  background: linear-gradient(0deg, rgb(38, 224, 242) 29%, rgb(79, 146, 222) 92%);
  border-radius: 10px;
  height: 150px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.loader {
  margin: 0 auto;
}

.item {
  display: flex;
  align-items: center;
  .divider {
    width: 1px;
    height: 100px;
    background: gray;
    margin-right: 10px;
  }
  .week {
    margin-right: 5px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 15px;
    .time {
    }
    img {
    }
    .temp {
      &:after {
        content: '\00B0';
        font-weight: 500;
      }
    }
  }
}
</style>

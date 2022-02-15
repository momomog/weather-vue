<template>
  <div v-if="!isError">
    <div class="title" v-if="getWeatherStatus === StatusCodes.ready">Прогноз на ближайшие дни</div>
    <div class="wrp">
      <Loader v-if="getWeatherStatus === StatusCodes.loading" color="white" class="loader" />
      <template v-if="daily && getWeatherStatus === StatusCodes.ready">
        <div v-for="day in daily" :key="day.dt" class="item">
          <div class="content">
            <div class="time">{{ getDate(day.dt) }}</div>
            <img
              v-if="day?.weather[0]"
              :src="getImageUrlByCode(day.weather[0].icon)"
              :title="day.weather[0].description"
              alt="icon"
            />
            <div class="temp">{{ Math.round(day.temp.day) }} / {{ Math.round(day.temp.night) }}</div>
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
  name: 'daily-weather',
  components: {
    Loader,
  },
  setup() {
    const store = useStore()
    const daily = computed(() => store.getters.dailyWeather)
    const getWeatherStatus = computed(() => store.state.weather.status)
    const isError = computed(() => store.state.user.location.errorMessage)

    const getDate = (unixTime: number) => new Date(unixTime * 1000).toLocaleDateString().slice(0, 5)

    return {
      daily,
      isError,
      getImageUrlByCode,
      getWeatherStatus,
      getDate,
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
  height: 135px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
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
    margin-right: 10px;
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

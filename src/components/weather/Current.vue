<template>
  <div class="content">
    <loader v-if="getWeatherStatus === StatusCodes.loading" color="white" class="loader" />
    <div v-if="userLocationErrorMessage || weatherErrorMessage" class="error">
      Возникла ошибка: <br />
      {{ userLocationErrorMessage || weatherErrorMessage }}
    </div>
    <div v-if="getWeatherStatus === StatusCodes.ready && current" class="body">
      <div class="city">{{ cityName }}</div>
      <div class="date">
        Сейчас {{ new Date().toLocaleTimeString().slice(0, 5) }}. Восход солнца в
        {{ new Date(current.sunrise * 1000).toLocaleTimeString().slice(0, 5) }}
      </div>
      <div class="current">
        <div class="weather">{{ Math.round(current.temp) }}</div>
        <img v-if="current?.weather[0]" :src="getImageUrlByCode(current.weather[0].icon)" alt="icon" />
        <div class="state">
          <div class="desc" v-if="current?.weather[0]">{{ current?.weather[0].description }}</div>
          <div class="feel">Ощущается как {{ Math.round(current.feels_like) }}</div>
        </div>
      </div>
      <div class="add-data">
        <div class="data-item">
          <img :src="windIcon" alt="wind" />
          <div class="desc">Ветер: {{ current.wind_speed.toPrecision(2) }} м/с</div>
        </div>
        <div class="data-item">
          <img :src="humidityIcon" alt="humidity" />
          <div class="desc">Влажность: {{ current.humidity }} %</div>
        </div>
        <div class="data-item">
          <img :src="pressureIcon" alt="pressure" />
          <div class="desc">Атм. давление: {{ current.humidity }} %</div>
        </div>
        <div class="data-item">
          <img :src="cloudIcon" alt="clouds" />
          <div class="desc">Облачность: {{ current.clouds }} %</div>
        </div>
      </div>
    </div>
    <img src="../../assets/img/bluesky.jpeg" alt="bluesky" class="background" />
  </div>
</template>

<script>
import { computed, defineComponent, watchEffect } from 'vue'
import { getImageUrlByCode } from '@/lib'
import { useStore } from '@/store/lib'
import windIcon from '../../assets/icons/wind.svg'
import humidityIcon from '../../assets/icons/humidity.svg'
import pressureIcon from '../../assets/icons/pressure.svg'
import cloudIcon from '../../assets/icons/cloud.svg'
import Loader from '@/components/common/Loader'
import { StatusCodes } from '@/store/common-types'

export default defineComponent({
  name: 'current-weather',
  components: { Loader },
  setup() {
    const store = useStore()
    const getWeatherStatus = computed(() => store.state.weather.status)
    const userLocationErrorMessage = computed(() => store.state.user.location.errorMessage)
    const weatherErrorMessage = computed(() => store.state.weather.errorMessage)
    const cityName = computed(() => store.getters.cityName)
    const current = computed(() => store.getters.currentWeather)

    watchEffect(() => {
      console.log(userLocationErrorMessage.value)
    })

    return {
      current,
      cityName,
      getWeatherStatus,
      weatherErrorMessage,
      userLocationErrorMessage,
      getImageUrlByCode,
      windIcon,
      humidityIcon,
      pressureIcon,
      cloudIcon,
      StatusCodes,
    }
  },
})
</script>

<style scoped lang="scss">
.body {
  position: relative;
  z-index: 1;
  color: white;
  padding: 23px 27px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .city {
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    margin-right: 8px;
    margin-bottom: 10px;
  }
  .date {
    font-size: 15px;
    line-height: 20px;
    margin-right: 8px;
    font-weight: 400;
    opacity: 0.7;
    margin-bottom: 22px;
  }
}

.current {
  display: flex;
  align-items: center;
  .weather {
    font-size: 68px;
    &:after {
      content: '\00B0';
      font-weight: 500;
    }
  }
  img {
    width: 48px;
    height: 48px;
    margin-right: 11px;
  }
  .state {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .desc:first-letter {
      text-transform: uppercase;
    }
    .feel {
      opacity: 0.7;
      &:after {
        content: '\00B0';
        font-weight: 500;
      }
    }
  }
}
.add-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;
  .desc {
    margin: 0 5px;
  }
  .data-item {
    width: 49%;
    display: flex;
    align-items: center;
    margin-right: 1.5%;
    margin-bottom: 10px;
  }
  .data-item:nth-child(2n) {
    margin-right: 0;
  }
}

.content {
  border-radius: 10px;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 49%;
    border-radius: 10px;
    filter: brightness(0.8);
  }
  .loader {
    margin-top: 25%;
  }
  .error {
    margin-top: 30%;
    font-weight: bold;
    color: #e13232;
    font-size: 18px;
    position: relative;
    z-index: 2;
  }
}
</style>

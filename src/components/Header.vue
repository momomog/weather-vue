<template>
  <header>
    <div class="left">
      <router-link to="/" class="logo" active-class="active">
        <img src="../assets/img/logo.png" alt="logo" />
      </router-link>
      <nav>
        <router-link to="/" active-class="active">Домашняя страница</router-link>
        <router-link to="/weather" active-class="active">Прогноз погоды</router-link>
        <router-link to="/about" active-class="active">О проекте</router-link>
      </nav>
    </div>
    <button v-if="!username" @click="toggleModal">Войти</button>
    <div v-else :style="{ display: 'flex' }">
      <span>{{ username }}</span>
      <button @click="logout">Выход</button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/lib'
import { Mutations } from '@/store/mutation-types'

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore()
    const username = computed(() => store.state.user.user.data?.name)
    const toggleModal = () => store.commit(Mutations.toggleModal)
    const logout = () => store.commit(Mutations.setUser, null)

    return {
      username,
      toggleModal,
      logout,
    }
  },
})
</script>

<style scoped lang="scss">
header {
  background: #1d70ee;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  span {
    font-weight: bold;
    font-size: 18px;
    margin-right: 10px;
  }
}
.left {
  display: flex;
  align-items: center;
}
.logo {
  height: 40px;
  img {
    height: 100%;
    cursor: pointer;
    margin-right: 10px;
  }
}
.active {
  color: #f8f805;
  transition: 0.5s;
}
span {
  color: white;
}

a {
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;
  transition: 0.5s;
}
button {
  background: #f8f805;
  border-radius: 30px;
  padding: 6px 12px;
  color: #333131;
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>

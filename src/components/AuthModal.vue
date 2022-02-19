<template>
  <teleport to="body">
    <div v-if="isOpened" class="wrap" @click="toggleModal($event)">
      <div class="body">
        <div class="close" @click="toggleModal($event, true)">x</div>
        <form @submit.prevent="onSubmit">
          <div class="title">Авторизация</div>
          <Loader v-if="isUserFetching" />
          <div v-else class="text">Пожалуйста, введите логин "admin" и пароль "1234" для входа в систему</div>
          <input type="text" v-model="login" name="login" placeholder="логин" />
          <input type="text" v-model="password" name="password" placeholder="пароль" />
          <div v-if="userErrorMessage" class="error">{{ userErrorMessage }}</div>
          <button type="submit" :disabled="isDisabledForm">{{ isUserFetching ? 'Загрузка...' : 'Войти' }}</button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store/lib'
import { Actions } from '@/store/action-types'
import { Mutations } from '@/store/mutation-types'
import { StatusCodes } from '@/store/common-types'
import Loader from './common/Loader.vue'

export default defineComponent({
  name: 'AuthModal',
  components: {
    Loader,
  },
  setup() {
    const store = useStore()
    const login = ref('')
    const password = ref('')
    const isDisabledForm = computed(() => !login.value || !password.value)
    const isOpened = computed(() => store.state.modal.isOpened)
    const isUserFetching = computed(() => store.state.user.user.status === StatusCodes.loading)
    const userErrorMessage = computed(() => store.state.user.user.errorMessage)

    const onSubmit = () => store.dispatch(Actions.login, { login: login.value, password: password.value })
    const toggleModal = (e: MouseEvent, needForceClose?: boolean) => {
      if (needForceClose || e.currentTarget === e.target) store.commit(Mutations.toggleModal)
    }

    return {
      login,
      password,
      isDisabledForm,
      isUserFetching,
      userErrorMessage,
      isOpened,
      onSubmit,
      toggleModal,
    }
  },
})
</script>

<style scoped lang="scss">
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(58, 71, 96, 0.4);
  display: flex;
  z-index: 999;
  padding: 0 10px;
}
.body {
  width: 600px;
  height: 400px;
  background: white;
  border-radius: 8px;
  margin: auto;
  position: relative;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    max-width: 200px;
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid black;
  }
  button {
    max-width: 200px;
    width: 100%;
    padding: 8px 10px;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
      color: gray;
    }
  }
}
.text {
  font-size: 18px;
  max-width: 400px;
  text-align: center;
  margin-bottom: 30px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  align-self: center;
  margin: 40px 0 40px;
}
.error {
  color: red;
  margin-top: 10px;
  margin-bottom: 5px;
}
.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>

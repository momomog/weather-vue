<template>
  <Header />
  <div id="content">
    <router-view />
  </div>
  <AuthModal />
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import AuthModal from './components/AuthModal.vue'

export default defineComponent({
  components: {
    Header,
    AuthModal,
  },
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  a {
    text-decoration: none;
    cursor: pointer;
  }
  button {
    cursor: pointer;
  }
}

body {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#content {
  padding: 20px;
}
</style>

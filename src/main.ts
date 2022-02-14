import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router } from './router'
import { store } from './store'
import { injectionKey } from '@/store/lib'

createApp(App).use(store, injectionKey).use(router).mount('#app')

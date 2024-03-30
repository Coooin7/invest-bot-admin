import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './routes'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { tooltip } from './plugins/tooltip'
import { animateInOut } from './plugins/animate-inout'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(tooltip)
app.use(animateInOut)
app.mount('#app')

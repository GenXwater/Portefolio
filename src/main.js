import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupRouteSeo } from './seo/routeSeo'

setupRouteSeo(router)

createApp(App).use(router).mount('#app')

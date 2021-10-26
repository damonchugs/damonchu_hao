import { createApp } from 'vue'
import App from './App.vue'

import store from './store'

require('/mock/index.js')

createApp(App).use(store).mount('#app')
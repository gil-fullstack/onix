import { registerPlugins } from './plugins'

import { createApp } from 'vue'
import { vMaska } from 'maska'


// Components
import App from './App.vue'

// Composables

import 'vuetify/styles'
const app = createApp(App)

registerPlugins(app)

// Register maska directive
app.directive('maska', vMaska)

app.mount('#app')

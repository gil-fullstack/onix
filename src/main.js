import { registerPlugins } from './plugins'
// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import generatedRoutes  from 'virtual:generated-pages'   // or the path your plugin gives
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { vMaska } from 'maska'


const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory
    (),
    routes : setupLayouts(generatedRoutes)
})

// Components
import App from './App.vue'

// Composables

import 'vuetify/styles'
const app = createApp(App)

registerPlugins(app)

// Register maska directive
app.directive('maska', vMaska)

app.use(router).mount('#app')

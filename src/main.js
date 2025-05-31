import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

// Import routes
import Introduction from './views/Introduction.vue'
import Home from './views/Home.vue'
import ShapeDetails from './views/ShapeDetails.vue'
import ShapeEdit from './views/ShapeEdit.vue'
import ShapeCreate from './views/ShapeCreate.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Introduction, name: 'introduction' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/shapes/:id', component: ShapeDetails, name: 'shape-details' },
    { path: '/shapes/:id/edit', component: ShapeEdit, name: 'shape-edit' },
    { path: '/shapes/create', component: ShapeCreate, name: 'shape-create' }
  ]
})

// Create Pinia store
const pinia = createPinia()

// Create and mount app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
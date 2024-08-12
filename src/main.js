import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import VScrollLock from 'v-scroll-lock'

import App from './App.vue'
import MainView from './MainView.vue'
import GalleryView from './GalleryView.vue'
import BackUpGalleryView from './BackUpGalleryView.vue'

import AOS from 'aos'
import 'aos/dist/aos.css'

import VueClipboard from 'vue-clipboard2'
import { useKakao } from 'vue3-kakao-maps/@utils'

new AOS.init()

useKakao('dea9e0e7fa5954309c8ae9599a54c686')

const routes = [
    { path: '/', redirect: '/main' },
    { path: '/main', component: MainView },
    { path: '/gallery', component: BackUpGalleryView },
    { path: '/gallery_test', component: GalleryView }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const app = createApp(App)
    .use(VScrollLock)
    .use(VueClipboard)
    .use(router);

app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router'
import PortefolioMain from '@/pages/PortefolioMain.vue'
import ContactPage from '@/pages/ContactPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: PortefolioMain
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0, behavior: 'smooth' }
    }
})

export default router

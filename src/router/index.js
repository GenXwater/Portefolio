import { createRouter, createWebHistory } from 'vue-router'
import PortefolioMain from '@/pages/PortefolioMain.vue'
import ContactPage from '@/pages/ContactPage.vue'
import MesServices from '@/pages/MesServices.vue'

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
    ,
    {
        path: '/services',
        name: 'services',
        component: MesServices
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, top: 80, behavior: 'smooth' }; // 70px header + marge
        }
        if (savedPosition) return savedPosition;
        return { top: 0, behavior: 'smooth' };
    }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import PortefolioMain from '@/pages/PortefolioMain.vue'
import ContactPage from '@/pages/ContactPage.vue'
import MesServices from '@/pages/MesServices.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: PortefolioMain,
        meta: {
            seo: {
                title: "Portfolio développeur web et IA",
                description:
                    "Louis GENTY conçoit des applications web et des solutions IA orientées usage: frontend, backend, agents IA, RAG et automatisation.",
                ogType: 'profile'
            }
        }
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactPage,
        meta: {
            seo: {
                title: 'Contact',
                description:
                    "Contactez Louis GENTY pour discuter d'un projet web, d'automatisation ou d'intégration IA adaptée à vos besoins métier.",
                ogType: 'website'
            }
        }
    }
    ,
    {
        path: '/services',
        name: 'services',
        component: MesServices,
        meta: {
            seo: {
                title: 'Services IA et automatisation',
                description:
                    "Découvrez les services de Louis GENTY: automatisation n8n, agents IA, extraction documentaire, outils métiers et développement web sur mesure.",
                ogType: 'website'
            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
        meta: {
            seo: {
                title: 'Page introuvable (404)',
                description: "La page demandée n'existe pas. Revenez à l'accueil, consultez les services ou contactez Louis GENTY.",
                robots: 'noindex,follow',
                ogType: 'website'
            }
        }
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

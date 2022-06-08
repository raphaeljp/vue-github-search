import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import RepositoryDetails from '@/views/RepositoryDetails.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/repo/:owner/:name',
        name: 'Details',
        component: RepositoryDetails,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

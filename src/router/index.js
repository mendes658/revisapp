import { createRouter, createWebHashHistory } from 'vue-router'
import MyProfile from '../views/MyProfile.vue'
import Subjects from '../views/Subjects.vue'
import Help from '../views/Help.vue'

const routes = [
    {
        path: '/',
        name: 'MyProfile',
        component: MyProfile
    },
    {
        path: '/subjects',
        name: 'Subjects',
        component: Subjects
    },
    {
        path: '/help',
        name: 'Help',
        component: Help
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
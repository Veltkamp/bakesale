import { createRouter, createWebHistory } from 'vue-router';
import Main from '/src/components/Main.vue';
import Display from '/src/components/Display.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main,
    },
    {
        path: '/display',
        name: 'display',
        component: Display,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
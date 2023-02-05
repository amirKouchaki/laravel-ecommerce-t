import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./../views/Dashboard.vue";
import Login from "./../views/Login.vue";
const routes = [
    {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard,
    },
    {
        name: "login",
        path: "/login",
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

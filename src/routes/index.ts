import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useUserStore } from "@/stores/user";

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const user = useUserStore();
    if (to.meta.requiresAuth === true && user.UserInfo.address === '' && from.path != '/home') {
        router.replace('/home');
        return
    }
    next()
})

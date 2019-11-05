import Vue from 'vue';
import VueRouter from 'vue-router';
import login from "../manager/login.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        component: login
    }, {
        path: "/",
        redirect: "/login"
    }
];

const router = new VueRouter({
  //mode: 'history', 该模式需要后端支持，暂不使用
  base: process.env.BASE_URL,
  routes
});

export default router;

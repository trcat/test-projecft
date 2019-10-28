import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../manager/login.vue';
import FindPassword from "../manager/find-password.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    alias: '/login'
  },
  {
    path: "/find-password",
    name: "find-password",
    component: FindPassword
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

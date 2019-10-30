import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../../manager/layout/login.vue';
import CenterContainer from "../../manager/layout/centerContainer.vue";
import FindPassword from "../../manager/layout/find-password.vue";
import ModifyPassword from "../../manager/layout/modify-password.vue";
import User from "../../manager/layout/user.vue";
import AddAccount from "../../manager/layout/addAccount.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/password",
    component: CenterContainer,
    children: [
      {
        path: "find",
        component: FindPassword
      }, {
        path: "modify/:id",
        component: ModifyPassword
      }
    ]
  }, {
    path: "/user/:id",
    component: User,
    children: [
      {
        path: "add-account",
        component: AddAccount
      }
    ]
  }
];

const router = new VueRouter({
  //mode: 'history', 该模式需要后端支持，暂不使用
  base: process.env.BASE_URL,
  routes
});

export default router;

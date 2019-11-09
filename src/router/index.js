import Vue from 'vue';
import VueRouter from 'vue-router';
import login from "../manager/login.vue";
import findPassword from "../manager/find-password.vue";
import modifyPassword from "../manager/modify-password.vue";
import user from "../manager/user.vue";
import profile from "../manager/user-profile.vue";
import addAcount from "../manager/add-account.vue";
import editAccount from "../manager/edit-account.vue";
import addClass from "../manager/add-class.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        component: login
    }, {
        path: "/",
        redirect: "/login"
    }, {
        path: "/find-password",
        component: findPassword
    }, {
        path: "/modify-password",
        component: modifyPassword
    }, {
        path: "/user",
        component: user,
        meta: {
            activeMenu: "/user"
        },
        children: [
            {
                path: "",
                component: profile,
                meta: {
                    activeMenu: "/user",
                    subActiveMenu: "/user"
                }
            }, {
                path: "add-account",
                component: addAcount,
                meta: {
                    activeMenu: "/user",
                    subActiveMenu: "/user/add-account"
                }
            }, {
                path: "edit-account",
                component: editAccount,
                meta: {
                    activeMenu: "/user",
                    subActiveMenu: "/user/edit-account"
                }
            }, {
                path: "add-class",
                component: addClass,
                meta: {
                    activeMenu: "/user",
                    subActiveMenu: "/user/add-class"
                }
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

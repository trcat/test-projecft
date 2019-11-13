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
import editClass from "../manager/edit-class.vue";
import addTest from "../manager/add-test.vue";
import editTest from "../manager/edit-test.vue";
import resultTest from "../manager/result-test.vue";
import viewTest from "../manager/view-test.vue";
import notFind from "../manager/not-find.vue";
import test from "../manager/test.vue";


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
            }, {
                path: "edit-class",
                component: editClass,
                meta: {
                    activeMenu: "/user/",
                    subActiveMenu: "/user/edit-class"
                }
            }, {
                path: "add-test",
                component: addTest,
                meta: {
                    activeMenu: "/user/",
                    subActiveMenu: "/user/add-test"
                }
            }, {
                path: "edit-test",
                component: editTest,
                meta: {
                    activeMenu: "/user/",
                    subActiveMenu: "/user/edit-test"
                }
            }, {
                path: "result-test",
                component: resultTest,
                meta: {
                    activeMenu: "/user/",
                    subActiveMenu: "/user/result-test"
                }
            }, {
                path: "view-test",
                component: viewTest,
                meta: {
                    activeMenu: "/user/",
                    subActiveMenu: "/user/view-test"
                }
            }
        ]
    }, {
        path: "/test",
        component: test
    }, {
        path: "*",
        component: notFind
    }
];

const router = new VueRouter({
  //mode: 'history', 该模式需要后端支持，暂不使用
  base: process.env.BASE_URL,
  routes
});

export default router;

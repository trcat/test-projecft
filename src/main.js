import Vue from "vue";
import ElementUI from "element-ui";
import "./assets/style/theme/index.css";
import "./scss/message.scss";
import Router from  "./router/layout/index.js";
import Store from "./store/index.js";
import http from "./API/API.js";

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$http = http; // 添加原型方法，这样创建的对象就自带该方法了。

new Vue({
    router: Router,
    store: Store
}).$mount("#main");
import Vue from "vue";
import ElementUI from "element-ui";
import "./assets/style/theme/index.css";
import "./scss/message.scss";
import Router from  "./router/index.js";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router: Router
}).$mount("#main");
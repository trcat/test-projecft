import Vue from "vue";
import ElementUI from "element-ui";
import "./assets/style/theme/index.css";
import "./scss/message.scss";
import Router from  "./router/index.js";
import Store from "./store/index.js";
import http from "./API/API.js";

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$http = http; // 添加原型方法，这样创建的对象就自带该方法了。

new Vue({
    router: Router,
    store: Store,
    created() {
        //防止重新加载页面后 store.state.user 数据被重置
        if(sessionStorage.getItem("userData")) {
            this.$store.commit("updateUser", JSON.parse(sessionStorage.getItem("userData")));
            sessionStorage.removeItem("userData");
        }

        window.addEventListener("beforeunload", () => {
            this.$store.state.user && sessionStorage.setItem("userData", JSON.stringify(this.$store.state.user));
        });
    }
}).$mount("#main");
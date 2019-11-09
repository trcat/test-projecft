import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //[NOTE] 为了方便测试，这边将 user 的内容设置成假数据，方便页面行为测试，整合的时候需要将他删除掉
    user: {
      "id": "12306",
      "identity": "administrator",
      "username": "admin",
      "gender": "male",
      "phone": "17855860685",
      "my_class": null,
      "email": "11@163.com"
    }
    //user: null
  },
  mutations: {
    updateUser(state, val) {
      state.user = Object.assign({}, val);
    }
  },
  actions: {
  },
  modules: {
  }
});

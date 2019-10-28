import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    token: ""
  },
  mutations: {
    setUserId(state, val) {
      state.userId = val;
    },
    setToken(state, val) {
      state.token = val;
    }
  },
  actions: {
  },
  modules: {
  }
});

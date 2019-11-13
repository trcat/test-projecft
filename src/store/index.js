import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    currentTest: null
  },
  mutations: {
    updateUser(state, val) {
      state.user = Object.assign({}, val);
    },
    updateCurrentTest(state, val) {
      state.currentTest = Object.assign({}, val);
    }
  },
  actions: {
  },
  modules: {
  }
});

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    password: '',
    loading: false,
    title: '',
    links: [],
  },
  mutations: {
    updatePassword(state, value) {
      state.password = value;
    },
    updateTitle(state, value) {
      state.title = value;
    },
    updateLinks(state, value) {
      state.links = value;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
  },
  actions: {
    fetchLinks({ commit }) {
      commit('updateLoading', true);
      setTimeout(() => {
        commit('updateLoading', false);
        commit('updateTitle', 'Test');
        commit('updateLinks', [
          { text: 'foo foo foofoo foo: foo foo', href: '#' },
          { text: 'foo foo foofoo foo: foo foo', href: '#' },
          { text: 'foo foo foofoo foo: foo foo', href: '#' },
          { text: 'foo foo foofoo foo: foo foo', href: '#' },
          { text: 'foo foo foofoo foo: foo foo', href: '#' },
          { text: 'foo foo foofoo foo: foo foo', href: '#' },
        ]);
      }, 1000);
    },
  },
  plugins: [
    vuexLocal.plugin,
  ],
});

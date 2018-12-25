import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import axios from 'axios';

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
    error: false,
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
    updateError(state, value) {
      state.error = value;
    },
  },
  actions: {
    async fetchLinks({ commit, state }) {
      commit('updateLoading', true);
      commit('updateError', false);
      try {
        const { data: { title, links } } = await axios.post('/.netlify/functions/links', {}, {
          auth: {
            password: state.password,
          },
        });
        commit('updateTitle', title);
        commit('updateLinks', links);
      } catch (e) {
        commit('updateError', true);
      }

      commit('updateLoading', false);
    },
  },
  plugins: [
    vuexLocal.plugin,
  ],
});

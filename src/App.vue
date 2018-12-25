<template>
  <div id="app">
    <BLoading
      :is-full-page="true"
      :active.sync="loading" />
    <links
      v-if="links"
      :links="links" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Links from './components/Links.vue';

export default {
  name: 'app',
  components: {
    Links,
  },
  computed: mapState({
    links: state => state.links,
    loading: state => state.loading,
  }),
  methods: {
    openPasswordPrompt() {
      this.$dialog.prompt({
        message: 'Please enter the password',
        inputAttrs: {
          maxlength: 30,
        },
        onConfirm: this.onSubmit,
      });
    },
    onSubmit(password) {
      this.$store.commit('updatePassword', password);
      this.$store.dispatch('fetchLinks');
    },
  },
  mounted() {
    if (!this.links.length) {
      this.openPasswordPrompt();
    }
  },
};
</script>

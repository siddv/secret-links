<template>
  <div id="app">
    <BLoading
      :is-full-page="true"
      :active.sync="loading" />
    <links
      v-if="links && links.length"
      :title="title"
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
    title: state => state.title,
    links: state => state.links,
    loading: state => state.loading,
    error: state => state.error,
  }),
  watch: {
    error(newErrorState, oldErrorState) {
      if (newErrorState === true && oldErrorState === false) {
        this.openErrorPrompt();
      }
    },
  },
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
    openErrorPrompt() {
      this.$dialog.alert({
        title: 'Oh no',
        message: 'You got the wrong password.',
        type: 'is-danger',
        onConfirm: this.openPasswordPrompt,
      });
    },
  },
  mounted() {
    if (!this.links.length) {
      this.openPasswordPrompt();
    }
  },
};
</script>

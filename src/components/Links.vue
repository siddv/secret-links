<template>
  <section class="section">
    <section class="container">
      <h1 class="title">{{title || 'Secret Links'}}</h1>
      <ul class="columns is-multiline">
        <li class="column is-half-tablet is-one-quarter-desktop"
          v-for="link in links"
          :key="link.href">
          <a
            class="button is-info is-large is-outlined is-fullwidth"
            :href="link.href"
            target="_blank"
            rel="noopener">
            {{ link.text }}
          </a>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    links: Array,
  },
};
</script>

<style lang="scss" scoped>
  .container {
    max-width: 960px;
  }
</style>

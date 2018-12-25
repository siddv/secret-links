<template>
  <section class="section">
    <section class="container content">
      <h1>{{title || 'Secret Links'}}</h1>
      <ul>
        <li
          v-for="link in links"
          :key="link.href">
          <a
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
  li {
    padding-bottom: 1em;
  }
</style>

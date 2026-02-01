<script setup>
  import PageHeader from './components/PageHeader.vue';
</script>

<template>
  <PageHeader />

  <main>
    <router-view />
  </main>
</template>

<style scoped>
  main {
    width: 100%;
  }
</style>

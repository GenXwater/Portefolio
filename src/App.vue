<script setup>
  import PageHeader from './components/PageHeader.vue';
</script>

<template>
  <div class="app-wrapper">
    <PageHeader />

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
  .app-wrapper {
    display: flex;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
  }
</style>

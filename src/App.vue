<script setup>
  import PageHeader from './components/PageHeader.vue';
  import AppFooter from './components/Footer.vue';
</script>

<template>
  <div class="app-wrapper">
    <PageHeader />

    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
  .app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

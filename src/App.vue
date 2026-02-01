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
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

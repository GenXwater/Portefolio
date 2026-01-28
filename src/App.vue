<script setup>
  import PortefolioMain from './pages/PortefolioMain.vue';
  import PageHeader from './components/PageHeader.vue';
</script>

<template>
  <header>
    <PageHeader />
  </header>

  <main>
    <PortefolioMain />
  </main>
</template>

<style scoped>
  header {
    width: 100%;
    line-height: 60px;
  }

  main {
    width: 100%;
  }

</style>

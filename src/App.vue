<script setup>
  import PageHeader from './components/PageHeader.vue';
  import AppFooter from './components/Footer.vue';
</script>

<template>
  <div class="app-wrapper">
    <PageHeader />

    <main class="main-content">
      <div class="content-container">
        <router-view />
      </div>
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

  .content-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding-inline: clamp(16px, 4vw, 24px);
  }

  @media screen and (max-width: 905px) {
    .content-container {
      padding: 0 20px;
    }
  }
</style>

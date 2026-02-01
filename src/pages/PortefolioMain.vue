<script setup>
    import PageTitle from '@/components/PageTitle.vue';
    import AboutMe from '@/components/AboutMe.vue';
    import MesTechnos from '@/components/MesTechnos.vue';
    import MesXp from '@/components/MesXp.vue';
    import MesProjets from '@/components/MesProjets.vue';
    import AppFooter from '@/components/Footer.vue';
</script>

<template>
  <div class="portefolio-main">
    <PageTitle />
    <AboutMe />
    <MesTechnos />
    <MesXp />
    <MesProjets />
    <AppFooter />
  </div>
</template>

<style scoped>
  .portefolio-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
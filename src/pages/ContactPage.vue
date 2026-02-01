<script setup>
    import ContactSection from '@/components/ContactSection.vue';
    import AppFooter from '@/components/Footer.vue';
</script>

<template>
    <div class="contact-page">
        <ContactSection />
        <AppFooter />
    </div>
</template>

<style scoped>
    .contact-page {
        min-height: calc(100vh - 90px);
    }
</style>

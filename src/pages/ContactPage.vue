<script setup>
    import ContactSection from '@/components/ContactSection.vue';
    import AppFooter from '@/components/Footer.vue';
</script>

<template>
    <div class="contact-page">
        <ContactSection compact />
        <AppFooter compact />
    </div>
</template>

<style scoped>
    .contact-page {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .contact-page > :last-child {
        margin-top: auto;
    }
</style>

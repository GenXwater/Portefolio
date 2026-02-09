<script setup>
    import ContactSection from '@/components/ContactSection.vue';
</script>

<template>
    <div class="contact-page">
        <ContactSection compact />
        <div class="footer-spacer"></div>
    </div>
</template>

<style scoped>
    .contact-page {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .footer-spacer {
        flex: 1;
    }
</style>

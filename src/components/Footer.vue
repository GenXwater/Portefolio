<script setup>
    defineProps({
        compact: { type: Boolean, default: false }
    });

    const year = new Date().getFullYear();
</script>

<template>
    <footer class="footer-wrapper" :class="{ 'compact': compact }">
        <div class="footer-content">
            <p>Conçu & développé par <span class="text-highlight-2">Louis</span></p>
            <p class="copyright">© {{ year }}</p>
        </div>
    </footer>
</template>

<style scoped>
    .footer-wrapper {
        margin-top: 100px;
        width: 100%;
        border-top: 1px solid color-mix(in srgb, var(--vt-c-custom-text-1) 20%, transparent);
        background: color-mix(in srgb, var(--vt-c-custom-dark-1) 90%, var(--vt-c-custom-text-1) 5%);
    }

    .footer-content {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px clamp(16px, 4vw, 24px);
        text-align: center;
    }

    .footer-content p {
        font-size: 14px;
        color: var(--vt-c-text-dark-2);
        margin: 5px 0;
    }

    .copyright {
        font-size: 12px;
        font-family: monospace;
    }
</style>

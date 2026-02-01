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
        position: relative;
        left: 0;
        right: 0;
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
        width: 100vw;
        border-top: 1px solid color-mix(in srgb, var(--vt-c-custom-text-1) 20%, transparent);
        background: color-mix(in srgb, var(--vt-c-custom-dark-1) 90%, var(--vt-c-custom-text-1) 5%);
    }

    .footer-wrapper.compact {
        margin-top: auto;
    }

    .footer-content {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 20px;
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
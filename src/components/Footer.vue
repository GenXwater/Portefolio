<script setup>
    const year = new Date().getFullYear();
</script>

<template>
    <footer>
        <p>Conçu & développé par <span class="text-highlight-2">Louis</span></p>
        <p class="copyright">© {{ year }}</p>
    </footer>
</template>

<style scoped>
    footer {
        margin-top: 100px;
        padding: 40px 0;
        text-align: center;
        border-top: 1px solid color-mix(in srgb, var(--vt-c-custom-text-1) 20%, transparent);
    }

    footer p {
        font-size: 14px;
        color: var(--vt-c-text-dark-2);
        margin: 5px 0;
    }

    .copyright {
        font-size: 12px;
        font-family: monospace;
    }
</style>
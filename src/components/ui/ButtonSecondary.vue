<script setup>
    defineProps({
        href: { type: String, default: null }
    });
</script>

<template>
    <component 
        :is="href ? 'a' : 'button'"
        :href="href"
        class="btn-secondary"
    >
        <slot />
    </component>
</template>

<style scoped>
    .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 8%);
        color: var(--color-text);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .btn-secondary :deep(svg) {
        width: 16px;
        height: 16px;
    }

    .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px color-mix(in srgb, var(--vt-c-custom-text-1) 25%, transparent);
    }

    .btn-secondary:active {
        transform: scale(0.97);
    }
</style>

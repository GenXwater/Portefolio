<script setup>
    defineProps({
        type: {
            type: String,
            default: 'button'
        },
        href: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    });
</script>

<template>
    <component 
        :is="href ? 'a' : 'button'"
        :href="href"
        :type="!href ? type : undefined"
        :disabled="disabled"
        class="btn-primary"
        :class="{ 'disabled': disabled }"
    >
        <span class="btn-content">
            <slot />
        </span>
        <span class="btn-glow"></span>
        <span class="btn-shine"></span>
    </component>
</template>

<style scoped>
    .btn-primary {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        overflow: hidden;
        cursor: pointer;
        border: none;
        background: linear-gradient(135deg, var(--vt-c-custom-text-2), color-mix(in srgb, var(--vt-c-custom-text-2) 80%, var(--vt-c-custom-text-1)));
        color: var(--vt-c-custom-dark-1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .btn-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .btn-content :deep(svg) {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        transition: transform 0.3s ease;
    }

    .btn-glow {
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, var(--vt-c-custom-text-2), var(--vt-c-custom-text-1));
        border-radius: 50px;
        z-index: -1;
        opacity: 0;
        filter: blur(8px);
        transition: opacity 0.3s ease;
    }

    .btn-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent);
        transition: left 0.5s ease;
    }

    .btn-primary:not(.disabled):hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 
            0 8px 25px color-mix(in srgb, var(--vt-c-custom-text-2) 40%, transparent),
            0 0 40px color-mix(in srgb, var(--vt-c-custom-text-2) 20%, transparent);
    }

    .btn-primary:not(.disabled):hover .btn-glow {
        opacity: 0.6;
    }

    .btn-primary:not(.disabled):hover .btn-shine {
        left: 100%;
    }

    .btn-primary:not(.disabled):hover :deep(svg) {
        transform: scale(1.2) translateX(3px);
    }

    .btn-primary:active {
        transform: scale(0.95) !important;
    }

    .btn-primary.disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
</style>

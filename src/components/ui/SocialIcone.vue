<script setup>
const props = defineProps({
    img: String,
    link: String,
    alt: String,
})

import { computed } from 'vue'

const iconStyle = computed(() => {
    const url = `/src/assets/${props.img}.png`
    return {
        width: '32px',
        height: '32px',
        display: 'inline-block',
        marginRight: '10px',
        borderRadius: '7px',
        backgroundColor: 'var(--social-icon-color)',
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskImage: `url(${url})`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
        opacity: '0.9'
    }
})
</script>

<template>
    <a :href="props.link" target="_blank" :aria-label="props.alt">
        <span class="social-icon" :style="iconStyle"></span>
    </a>
</template>

<style scoped>
.social-icon {
    vertical-align: middle;
}
</style>
<script setup>
    const props = defineProps({
        img: String,
        link: String,
        alt: String,
    })
</script>

<template>
    <a :href="props.link" target="_blank">
        <img class="social-img" :src="`/src/assets/${props.img}.png`" :alt="props.alt" width="32px"/>
    </a>
</template>

<style scoped>
    .social-img {
        margin-right: 10px;
        filter: opacity(0.7);
        border-radius: 7px;
    }
</style>
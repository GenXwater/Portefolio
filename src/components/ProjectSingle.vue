<script setup>
    import { ref, onMounted, computed } from 'vue';

    const props = defineProps({
        name: String,
        image: String,
        tags: String,
        description: String,
        tasks: Array,
    });

    const isVisible = ref(false);
    const cardRef = ref(null);

    const tagList = props.tags.split(';').map(tag => tag.trim());
    const imageUrl = computed(() => new URL(`../assets/${props.image}`, import.meta.url).href);

    onMounted(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (cardRef.value) observer.observe(cardRef.value);
    });
</script>

<template>
    <div ref="cardRef" class="project-card" :class="{ 'visible': isVisible }">
        <div class="project-image">
            <img :src="imageUrl" :alt="name" />
        </div>
        <h3 class="project-name text-highlight-2">{{ name }}</h3>
        <div class="project-tags">
            <span v-for="tag in tagList" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <p class="project-description">{{ description }}</p>
        <ul class="project-tasks">
            <li v-for="(task, idx) in tasks" :key="idx">
                <span class="text-highlight-2">▹</span> {{ task }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .project-card {
        position: relative;
        display: flex;
        flex-direction: column;
        background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%);
        border-radius: 12px;
        padding: 70px 20px 20px;
        margin-top: 50px;
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .project-card.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .project-image {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background);
        border: 3px solid var(--vt-c-custom-text-1);
        border-radius: 50%;
        overflow: visible;
        box-shadow:
            0 0 15px color-mix(in srgb, var(--vt-c-custom-text-1) 40%, transparent),
            0 0 30px color-mix(in srgb, var(--vt-c-custom-text-2) 25%, transparent);
        animation: neon-pulse 3.5s ease-in-out infinite;
    }

    .project-image img {
        max-width: 70%;
        max-height: 70%;
        object-fit: contain;
        position: relative;
        z-index: 1;
    }

    @keyframes neon-pulse {
        0%, 100% {
            box-shadow:
                0 0 15px color-mix(in srgb, var(--vt-c-custom-text-1) 40%, transparent),
                0 0 30px color-mix(in srgb, var(--vt-c-custom-text-2) 25%, transparent);
        }
        50% {
            box-shadow:
                0 0 18px color-mix(in srgb, var(--vt-c-custom-text-1) 45%, transparent),
                0 0 36px color-mix(in srgb, var(--vt-c-custom-text-2) 30%, transparent);
        }
    }

    .project-name {
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 10px;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        margin-bottom: 10px;
    }

    .tag {
        font-size: 11px;
        font-weight: 600;
        padding: 4px 10px;
        background: color-mix(in srgb, var(--vt-c-custom-text-1) 15%, transparent);
        color: var(--vt-c-custom-text-1);
        border-radius: 15px;
    }

    .project-description {
        font-size: 15px;
        font-weight: 600;
        line-height: 1.5;
        color: var(--vt-c-text-dark-2);
        margin-bottom: 10px;
    }

    .project-tasks {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .project-tasks li {
        font-size: 15px;
        padding: 3px 0;
        color: var(--vt-c-text-dark-2);
    }
</style>
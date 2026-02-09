<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  observe: { type: Boolean, default: true },
  threshold: { type: Number, default: 0.15 },
});

const isVisible = ref(false);
const cardRef = ref(null);

onMounted(() => {
  if (!props.observe) {
    isVisible.value = true;
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: props.threshold }
  );

  if (cardRef.value) observer.observe(cardRef.value);
});
</script>

<template>
  <div ref="cardRef" class="card" :class="{ 'visible': isVisible }">
    <div class="card-image">
      <slot name="image"></slot>
    </div>

    <h3 class="card-title">
      <slot name="title"></slot>
    </h3>

    <div class="card-tags">
      <slot name="tags"></slot>
    </div>

    <div class="card-description">
      <slot></slot>
    </div>

    <ul class="card-tasks">
      <slot name="tasks"></slot>
    </ul>
  </div>
</template>

<style scoped>
  .card {
    --card-padding-top: 70px;
    --card-image-size: 90px;
    position: relative;
    display: flex;
    flex-direction: column;
    background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%);
    border-radius: 12px;
    padding: var(--card-padding-top) 20px 20px;
    margin-top: 50px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .card-image {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--card-image-size);
    height: var(--card-image-size);
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

  /* When card is used in a compact/service context (e.g. .service-card),
     keep the circle inside the card so it won't be clipped by overflow:hidden. */
  .card.service-card {
    --card-padding-top: 36px;
  }

  .card.service-card .card-image {
    top: 18px;
    transform: translate(-50%, 0);
    width: calc(var(--card-image-size) * 0.7);
    height: calc(var(--card-image-size) * 0.7);
  }

  .card-image ::v-deep img {
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

  .card-title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin-bottom: 10px;
  }

  .card-description {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--vt-c-text-dark-2);
    margin-bottom: 10px;
    text-align: center;
  }

  .card-tasks {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .card-tasks li {
    font-size: 15px;
    padding: 3px 0;
    color: var(--vt-c-text-dark-2);
  }
</style>

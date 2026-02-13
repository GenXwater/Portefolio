<template>
  <div class="theme-switch">
    <input type="checkbox" id="theme-toggle" v-model="isDark" />
    <label for="theme-toggle" class="switch-label">
      <RetroSwitchIllustration :is-on="isDark" />
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import RetroSwitchIllustration from './ui/RetroSwitchIllustration.vue';

const isDark = ref(false);

watch(isDark, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  }
  localStorage.setItem('theme', newVal ? 'dark' : 'light');
});

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
  } else if (savedTheme === 'light') {
    isDark.value = false;
  } else {
    // Default to prefers-color-scheme
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  // Appliquer la classe initiale
  if (isDark.value) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  }
});
</script>

<style scoped>
.theme-switch {
  display: flex;
  align-items: center;
  justify-content: center;
}

#theme-toggle {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.switch-label {
  position: relative;
  width: 70px;
  height: 70px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  --switch-press-offset: 0px;
}

.switch-label :deep(.retro-switch-svg) {
  transition: transform 240ms ease, filter 240ms ease;
}

#theme-toggle:active + .switch-label {
  --switch-press-offset: 2px;
}

#theme-toggle:focus-visible + .switch-label {
  outline: 2px solid color-mix(in srgb, var(--vt-c-custom-text-1) 65%, white);
  outline-offset: 3px;
  border-radius: 12px;
}
</style>

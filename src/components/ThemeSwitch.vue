<template>
  <div class="theme-switch">
    <input type="checkbox" id="theme-toggle" v-model="isDark" />
    <label for="theme-toggle" class="switch-label">
      <span class="switch-slider"></span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

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
}

#theme-toggle {
  display: none;
}

.switch-label {
  position: relative;
  width: 60px;
  height: 30px;
  background: var(--vt-c-custom-dark-1);
  border-radius: 15px;
  cursor: pointer;
  border: 2px solid var(--vt-c-custom-text-1);
  box-shadow: 0 0 10px var(--vt-c-custom-text-1);
  transition: all 0.3s ease;
}

.switch-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: var(--vt-c-custom-text-1);
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px var(--vt-c-custom-text-1);
}

#theme-toggle:checked + .switch-label {
  background: var(--vt-c-custom-text-2);
  box-shadow: 0 0 20px var(--vt-c-custom-text-2);
}

#theme-toggle:checked + .switch-label .switch-slider {
  transform: translateX(30px);
  background: var(--vt-c-custom-text-2);
  box-shadow: 0 0 20px var(--vt-c-custom-text-2);
}

.switch-label:hover {
  box-shadow: 0 0 20px var(--vt-c-custom-text-1);
}

#theme-toggle:checked + .switch-label:hover {
  box-shadow: 0 0 30px var(--vt-c-custom-text-2);
}
</style>
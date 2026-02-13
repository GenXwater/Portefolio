<script setup>
import { getCurrentInstance } from 'vue';

defineProps({
  isOn: { type: Boolean, default: false },
});

const uid = getCurrentInstance()?.uid ?? 0;
const plateOffId = `retro-plate-off-${uid}`;
const plateOnId = `retro-plate-on-${uid}`;
const leverId = `retro-lever-${uid}`;
const glowId = `retro-glow-${uid}`;
</script>

<template>
  <svg class="retro-switch-svg" :class="{ 'is-on': isOn }" viewBox="0 0 120 120" aria-hidden="true">
    <defs>
      <linearGradient :id="plateOffId" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="48%" stop-color="#f1f1f1" />
        <stop offset="100%" stop-color="#d7d7d7" />
      </linearGradient>
      <linearGradient :id="plateOnId" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#bebebe" />
        <stop offset="55%" stop-color="#969696" />
        <stop offset="100%" stop-color="#6f6f6f" />
      </linearGradient>
      <linearGradient :id="leverId" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f6f2ea" />
        <stop offset="55%" stop-color="#cbc3b7" />
        <stop offset="100%" stop-color="#948d82" />
      </linearGradient>
      <filter :id="glowId" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="2.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect class="plate-shadow" x="17" y="18" width="86" height="86" rx="16" />
    <rect class="plate plate-off" x="18" y="16" width="84" height="84" rx="15" :fill="`url(#${plateOffId})`" />
    <rect class="plate plate-on" x="18" y="16" width="84" height="84" rx="15" :fill="`url(#${plateOnId})`" />

    <circle class="screw" cx="28" cy="26" r="3.6" />
    <circle class="screw" cx="92" cy="26" r="3.6" />
    <circle class="screw" cx="28" cy="90" r="3.6" />
    <circle class="screw" cx="92" cy="90" r="3.6" />

    <rect class="slot" x="44" y="34" width="32" height="50" rx="9" />
    <rect class="slot-inner-light" x="46" y="36" width="28" height="8" rx="4" />

    <g class="lever-assembly">
      <rect class="lever-body" x="46" y="40" width="28" height="34" rx="7" :fill="`url(#${leverId})`" />
      <rect class="lever-grip" x="49.5" y="44" width="21" height="11" rx="4.2" />
      <circle class="pilot-ring" cx="60" cy="57" r="5.5" />
      <circle class="pilot-lens" cx="60" cy="57" r="3.6" :filter="isOn ? `url(#${glowId})` : undefined" />
      <ellipse class="pilot-gloss" cx="59" cy="55.8" rx="1.45" ry="0.9" />
    </g>
  </svg>
</template>

<style scoped>
.retro-switch-svg {
  width: 50px;
  height: 50px;
  display: block;
  overflow: visible;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35));
}

.plate-shadow {
  fill: rgba(0, 0, 0, 0.35);
}

.plate {
  stroke: rgba(82, 75, 69, 0.95);
  stroke-width: 1.1;
}

.plate-off {
  opacity: 1;
  transition: opacity 220ms ease;
}

.plate-on {
  opacity: 0;
  transition: opacity 260ms ease;
}

.is-on .plate-off {
  opacity: 0;
}

.is-on .plate-on {
  opacity: 1;
}

.screw {
  fill: #6f675f;
  stroke: #4f4a45;
  stroke-width: 0.8;
}

.slot {
  fill: #26221f;
  stroke: rgba(24, 23, 22, 0.95);
  stroke-width: 0.7;
}

.slot-inner-light {
  fill: rgba(255, 255, 255, 0.08);
}

.pilot-ring {
  fill: #48443f;
  stroke: #2d2a27;
  stroke-width: 0.8;
}

.pilot-lens {
  fill: #7e7e7e;
  transition: fill 200ms ease;
}

.pilot-gloss {
  fill: rgba(255, 255, 255, 0.45);
}

.is-on .pilot-lens {
  fill: #57d87b;
}

.lever-assembly {
  transform: translateY(calc(0px + var(--switch-press-offset, 0px)));
  transform-origin: 60px 57px;
  transition: transform 340ms cubic-bezier(0.16, 0.9, 0.22, 1.15);
}

.is-on .lever-assembly {
  transform: translateY(calc(8px + var(--switch-press-offset, 0px)));
}

.lever-body {
  stroke: #6b645b;
  stroke-width: 1;
}

.lever-grip {
  fill: rgba(255, 255, 255, 0.24);
}

.is-on .lever-body {
  stroke: #5f5f5f;
}
</style>

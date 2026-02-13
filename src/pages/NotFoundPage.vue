<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="not-found-page">
    <h1>Page introuvable</h1>
    <p>
      La page demandée n'existe pas ou a été déplacée.
    </p>

    <div class="not-found-actions">
      <RouterLink to="/" class="not-found-link">Retour à l'accueil</RouterLink>
      <RouterLink to="/services" class="not-found-link">Voir mes services</RouterLink>
      <RouterLink to="/contact" class="not-found-link not-found-link-primary">Me contacter</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found-page {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 120px 0 40px;
}

.not-found-page h1 {
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 700;
}

.not-found-page p {
  color: var(--text-muted);
  max-width: 580px;
  padding: 0 12px;
}

.not-found-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 8px;
}

.not-found-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--vt-c-custom-text-1) 35%, transparent);
  padding: 10px 16px;
  color: var(--color-text);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.not-found-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--vt-c-custom-text-1) 25%, transparent);
}

.not-found-link-primary {
  border-color: transparent;
  background: linear-gradient(135deg, var(--vt-c-custom-text-1), var(--vt-c-custom-text-2));
  color: #ffffff;
}
</style>

<script setup>
import Card from '../components/ui/Card.vue';
import ButtonPrimary from '../components/ui/ButtonPrimary.vue';
import IconSend from '../components/icons/IconSend.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goToContact = () => router.push('/contact');
</script>

<template>
  <section class="services-page">
    <div class="services-hero">
      <h1>Mes Services</h1>
      <p class="lead">Solutions d'automatisation, IA et développement sur mesure — alignées sur vos besoins métiers.</p>
    </div>

    <div class="services-grid">
      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">⚙️</span></template>
        <template #title>Automatisation complète avec n8n</template>
        Automatisez les tâches répétitives. Scénarios robustes sur mesure pour connecter vos outils et gagner des heures chaque semaine.
      </Card>

      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">🧠</span></template>
        <template #title>Chatbots & agents IA personnalisés</template>
        Assistants intelligents 24/7 — réponses clients, traitement de documents, ou actions métiers basées sur GPT/Claude.
      </Card>

      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">📄</span></template>
        <template #title>Extraction intelligente de documents</template>
        Lecture, résumé et extraction de données depuis PDF/Word pour rendre vos fichiers immédiatement exploitables.
      </Card>

      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">🔌</span></template>
        <template #title>Agents API intelligents</template>
        Orchestration d'API et agents autonomes qui dialoguent avec vos services et automatisent des workflows complexes.
      </Card>

      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">🚧</span></template>
        <template #title>IA & automation pour BTP / logistique</template>
        Solutions terrain adaptées au suivi chantier, logistique et opérations, conçues pour la robustesse et l'échelle.
      </Card>

      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">💻</span></template>
        <template #title>Sites web & outils métiers</template>
        Sites vitrines et micro-apps intégrées, rapides et prêtes à connecter CRM/IA/automation pour convertir vos visiteurs.
      </Card>

      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">🛠️</span></template>
        <template #title>Développement d'outils métiers IA</template>
        Copilotes internes et micro-apps pour rédiger, classer et piloter vos opérations.
      </Card>

      <Card class="service-card" style="--card-image-size:56px; --card-padding-top:36px;">
        <template #image><span class="service-icon">🔁</span></template>
        <template #title>Workflows IA pour PME</template>
        Automatisation des leads, relances, devis, RDV et suivi clients pour fluidifier vos opérations.
      </Card>
    </div>

    <div class="services-cta">
      <ButtonPrimary @click="goToContact">
        <IconSend />
        <span>Me contacter pour un audit</span>
      </ButtonPrimary>
    </div>

    <div class="page-glow" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
  .services-page {
    padding: 140px 0 80px;
    position: relative;
    z-index: 1;
  }

  .services-hero {
    text-align: center;
    margin-bottom: 40px;
  }

  .services-hero h1 {
    font-size: 40px;
    margin-bottom: 8px;
    color: var(--color-text);
  }

  .services-hero .lead {
    color: var(--text-muted);
    max-width: 720px;
    margin: 0 auto;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* stagger reveal delays for a punchier entrance */
  .services-grid > *:nth-child(1) { --reveal-delay: 0ms; }
  .services-grid > *:nth-child(2) { --reveal-delay: 80ms; }
  .services-grid > *:nth-child(3) { --reveal-delay: 160ms; }
  .services-grid > *:nth-child(4) { --reveal-delay: 240ms; }
  .services-grid > *:nth-child(5) { --reveal-delay: 320ms; }
  .services-grid > *:nth-child(6) { --reveal-delay: 400ms; }
  .services-grid > *:nth-child(7) { --reveal-delay: 480ms; }
  .services-grid > *:nth-child(8) { --reveal-delay: 560ms; }

  .service-card {
    --service-card-height: 300px; /* default uniform height (reduced) */
    padding: 26px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%);
    color: var(--color-text);
    transition: transform 0.28s ease, box-shadow 0.28s ease;
    position: relative;
    overflow: visible; /* allow the circular image to overlap the border */
    border: none;
    min-height: var(--service-card-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
    padding-top: calc(var(--card-padding-top, 36px) + 8px);
  }

  .service-card :deep(.card-title) {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    color: var(--accent-2);
    letter-spacing: -0.2px;
  }

  .service-card .card-description {
    color: var(--text-muted);
    max-width: 560px;
    font-weight: 600;
    line-height: 1.6;
    margin: 6px 0 0 0;
    padding: 0 8px;
  }

  .service-icon { font-size: 28px; line-height: 1; display:inline-block; }

  @media (max-width: 1000px) {
    .service-card { --service-card-height: 280px; }
  }

  @media (max-width: 700px) {
    .service-card { --service-card-height: 240px; }
  }

  /* No hover interactions as requested */

  .services-cta { text-align: center; margin-top: 40px; }

  .cta-btn {
    padding: 12px 22px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    color: white;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 40px color-mix(in srgb, var(--accent) 20%, transparent);
  }

  .page-glow {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    opacity: 0.7;
  }

  @media (max-width: 1000px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 700px) {
    .services-grid { grid-template-columns: 1fr; }
    .services-page { padding-top: 100px; }
  }
</style>

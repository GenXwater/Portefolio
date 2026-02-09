<script setup>
</script>

<template>
  <section class="services-page">
    <div class="services-hero">
      <h1>Mes Services</h1>
      <p class="lead">Solutions d'automatisation, IA et développement sur mesure — alignées sur vos besoins métiers.</p>
    </div>

    <div class="services-grid">
      <article class="service-card">
        <h3>⚙️ Automatisation complète avec n8n</h3>
        <p>Automatisez les tâches répétitives. Scénarios robustes sur mesure pour connecter vos outils et gagner des heures chaque semaine.</p>
      </article>

      <article class="service-card">
        <h3>🧠 Chatbots & agents IA personnalisés</h3>
        <p>Assistants intelligents 24/7 — réponses clients, traitement de documents, ou actions métiers basées sur GPT/Claude.</p>
      </article>

      <article class="service-card">
        <h3>📄 Extraction intelligente de documents</h3>
        <p>Lecture, résumé et extraction de données depuis PDF/Word pour rendre vos fichiers immédiatement exploitables.</p>
      </article>

      <article class="service-card">
        <h3>🔌 Agents API intelligents</h3>
        <p>Orchestration d'API et agents autonomes qui dialoguent avec vos services et automatisent des workflows complexes.</p>
      </article>

      <article class="service-card">
        <h3>🚧 IA & automation pour BTP / logistique</h3>
        <p>Solutions terrain adaptées au suivi chantier, logistique et opérations, conçues pour la robustesse et l'échelle.</p>
      </article>

      <article class="service-card">
        <h3>💻 Sites web & outils métiers</h3>
        <p>Sites vitrines et micro-apps intégrées, rapides et prêtes à connecter CRM/IA/automation pour convertir vos visiteurs.</p>
      </article>

      <article class="service-card">
        <h3>🛠️ Développement d'outils métiers IA</h3>
        <p>Copilotes internes et micro-apps pour rédiger, classer et piloter vos opérations.</p>
      </article>

      <article class="service-card">
        <h3>🔁 Workflows IA pour PME</h3>
        <p>Automatisation des leads, relances, devis, RDV et suivi clients pour fluidifier vos opérations.</p>
      </article>
    </div>

    <div class="services-cta">
      <router-link to="/contact"><button class="cta-btn">Me contacter pour un audit</button></router-link>
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

  .service-card {
    padding: 26px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--surface), var(--accent) 4%);
    color: var(--color-text);
    transition: transform 0.28s ease, box-shadow 0.28s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--accent), transparent 70%);
  }

  .service-card h3 {
    margin-bottom: 10px;
    color: var(--accent);
  }

  .service-card p { color: var(--text-muted); }

  .service-card::before {
    content: '';
    position: absolute;
    inset: -40% -20% auto -20%;
    height: 140px;
    background: radial-gradient(circle at 20% 50%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 40%);
    filter: blur(28px);
    opacity: 0.9;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(20px);
    pointer-events: none;
  }

  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px color-mix(in srgb, var(--accent) 18%, transparent);
  }

  .service-card:hover::before {
    opacity: 1;
    transform: translateY(0);
  }

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

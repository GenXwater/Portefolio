<script setup>
import { ref } from 'vue';
import ProjectSingle from './ProjectSingle.vue';

const projects = ref([
    {
        name: "Rubbli",
        image: "Rubbli_logo_v3_highres.png",
        tags: "TYPESCRIPT; JAVASCRIPT; TAILWIND; NEXT; MONGODB; PRISMA",
        description: "Une plateforme en ligne pour acheter et vendre des matériaux de construction de seconde main à petit prix. Donnez une seconde vie aux matériaux inutilisés !",
        tasks: [
            "J'ai fait ci",
            "j'ai fait ça",
            "et puis encore ça",
        ],
    },

    {
        name: "HBnB",
        image: "image_hBnb.png",
        tags: "HTML; CSS; JAVASCRIPT; PYTHON; FLASK",
        description: "Clone simplifié de AirBnb avec gestion des fonctionnalités côté serveur et interface utilisateur",
        tasks: [
            "J'ai fait ci",
            "j'ai fait ça",
            "et puis encore ça",
        ],
    },
])
</script>

<template>
    <div id="projects">
    <h2 class="text-highlight-1 section-title">Quelques projets</h2>
    <div class="projects-grid">
      <ProjectSingle 
        v-for="project in projects" 
        :key="project.name"
        :name="project.name"
        :image="project.image"
        :tags="project.tags"
        :description="project.description"
        :tasks="project.tasks"
      />
    </div>
  </div>
</template>

<style scoped>
#projects {
    margin-top: 80px;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
}

@media screen and (max-width: 900px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>
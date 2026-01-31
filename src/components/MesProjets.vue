<script setup>
    import { ref } from 'vue';
    import ProjectSingle from './ProjectSingle.vue';

    const projects = ref([
        {
            name: "Rubbli",
            image: "project.png",
            tags: "TYPESCRIPT; JAVASCRIPT; TAILWIND; NEXT; MONGODB; PRISMA",
            description: "Une plateforme en ligne pour acheter et vendre des matériaux de construction de seconde main à petit prix. Donnez une seconde vie aux matériaux inutilisés !",
            tasks: "Création...",
        },

        {
            name: "HBnB",
            image: "project.png",
            tags: "HTML; CSS; JAVASCRIPT; PYTHON; FLASK",
            description: "Clone simplifié de AirBnb avec gestion des fonctionnalités côté serveur et interface utilisateur",
            tasks: "Création...",
        },
    ])
</script>

<template>
    <div id="projects">
        <h2 class="text-highlight-1 section-title">Quelques projets</h2>
        <ProjectSingle v-for="(project, index) in projects" :key="project.name"/>
    </div>
</template>

<style scoped>

</style>
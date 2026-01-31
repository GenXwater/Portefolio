<script setup>
    import { ref } from 'vue';

    let activeBloc = ref(0)

    let experiences = ref([
        {
            title: "Developpeur d'applications web",
            date: "de 2024 à aujourd'hui",
            lines: [
                "Concevoir et développer des applications web interactives orientées usage et produit.",
                "Analyser les besoins métiers et les comportements utilisateurs pour définir des interfaces claires",
                "Intégrer des systèmes d’IA (agents, RAG, automatisations) dans des workflows applicatifs concrets",
                "Structurer le lien entre frontend et backend pour assurer performance, stabilité et évolutivité",
                "Mesurer, tester et améliorer en continu l’expérience utilisateur et la qualité des fonctionnalités livrées, en méthodologie AGILE",
            ],
        },
        {
            title: "Projet 2",
            date: "depuis Avril 2025",
            lines: [
                "test1",
                "test2",
                "test3",
            ],
        },
        {
            title: "Projet 3",
            date: "depuis Mai 2025",
            lines: [
                "test4",
                "test5",
                "test6",
            ],
        },
    ])

    const ShowXp = (id) => {
        activeBloc.value = id;
    };
</script>

<template>
    <div id="xp">
        <h2 class="text-highlight-1 section-title">Expériences</h2>
        <div id="left">
            <p
                :class="['company', 'fw600', { active: activeBloc === 0 }]"
                @click="ShowXp(0)"
            >
                Projet 1
            </p>
            <p
                :class="['company', 'fw600', { active: activeBloc === 1 }]"
                @click="ShowXp(1)"
            >
                Projet 2
            </p>
            <p
                :class="['company', 'fw600', { active: activeBloc === 2 }]"
                @click="ShowXp(2)"
            >
                Projet 3
            </p>
        </div>
        <div id="right">
            <template v-for="(job, index) in experiences" :key="index">
                <div class="job-details" :class="index === activeBloc ? '' : 'hide'" :id="'bloc_'+index">
                    <h3 class="fw600">{{ job.title }}</h3>
                    <span id="date">{{ job.date }}</span>
                    <br/>
                    <p
                        v-for="(line, lineIndex) in job.lines"
                        :key="lineIndex"
                        class="fw600 mtb8"
                        :style="lineIndex === 0 ? 'margin-top: 10px;' : ''"
                    >
                        <span class="text-highlight-2">🗸</span> {{ line }}
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
    
<style scoped>
    #xp {
        margin-top: 60px;
    }

    #xp #left {
        float: left;
        width: 25%;
    }

    #xp #right {
        float: left;
        width: 75%;
    }

    #xp #right h3 {
        font-size: 20px;
    }

    .fw600 {
        font-weight: 600;
    }

    .mtb8 {
        margin: 8px 0px;
    }

    #date {
        font-style: italic;
        font-size: 14px;
    }

    .company {
        border-left: 4px solid var(--vt-c-custom-text-1);
        line-height: 30px;
        padding-left: 10px;
    }

    .company.active {
        border-left-color: var(--vt-c-custom-text-2);
        color: var(--vt-c-custom-text-2);
    }

    .company:hover {
        cursor: pointer;
        color: var(--vt-c-custom-text-1)
    }

    .hide {
        display: none;
    }

    @media screen and (max-width: 600px) {
        #xp #right {
            width: 100%;
            margin-top: 20px;
        }
        #xp #left {
            width: 100%;
        }
        .company {
            border: none;
            padding-left: 0px;
            float: left;
            margin-right: 10px;
        }
    }
</style>
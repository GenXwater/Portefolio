<script setup>
const handleMouseMove = (event) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    container.style.setProperty('--mouse-x', `${x}%`);
    container.style.setProperty('--mouse-y', `${y}%`);
};
</script>

<template>
    <div id="skills">
        <h2 class="text-highlight-1 section-title">Mes technos préférées</h2>
        <div id="icons-list">
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-html5-plain"></i> <br/> <span>HTML</span></a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-css3-plain"></i> <br/> <span>CSS</span></a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-javascript-plain"></i> <br/> <span>JavaScript</span></a>
            <a href="https://www.typescriptlang.org/docs/" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-typescript-plain"></i> <br/> <span>TypeScript</span></a>
            <a href="https://docs.python.org/3/" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-python-plain"></i> <br/> <span>Python</span></a>
            <a href="https://flask.palletsprojects.com/" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-flask-original"></i> <br/> <span>Flask</span></a>
            <a href="https://tailwindcss.com/docs" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-tailwindcss-original"></i> <br/> <span>TailwindCSS</span></a>
            <a href="https://dev.mysql.com/doc/" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-mysql-original"></i> <br/> <span>MySQL</span></a>
            <a href="https://www.mongodb.com/docs/" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-mongodb-plain"></i> <br/> <span>MongoDB</span></a>
            <a href="https://nodejs.org/docs/" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-nodejs-plain"></i> <br/> <span>Node.js</span></a>
            <a href="https://vuejs.org/guide/" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-vuejs-plain"></i> <br/> <span>Vue.js</span></a>
            <a href="https://git-scm.com/doc" target="_blank" class="techno-container" @mousemove="handleMouseMove"><i class="techno-icon devicon-git-plain"></i> <br/> <span>Git</span></a>
        </div>
    </div>
</template>

<style scoped>
    #skills {
        margin-top: 60px;
    }

    #icons-list {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 5px;
        grid-row-gap: 50px;
        margin-top: 35px;
    }

    .techno-container {
        position: relative;
        display: block;
        text-align: center;
        color: var(--vt-c-custom-text-1);
        padding: 20px;
        cursor: pointer;
        text-decoration: none;
        --mouse-x: 50%;
        --mouse-y: 50%;
    }

    .techno-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--vt-c-custom-text-1) 0%, rgba(0,0,0,0) 60%);
        opacity: 0;
        transition: opacity 0.8s ease;
        z-index: -1;
        filter: blur(20px);
    }

    .techno-container:hover::before {
        opacity: 0.3;
    }

    .techno-container span {
        font-weight: bold;
    }

    .techno-icon {
        font-size: 80px;
        margin: 0 auto;
        color: var(--vt-c-custom-text-1);
        transition: transform 0.3s ease, color 0.5s ease;
    }

    .techno-container:hover .techno-icon {
        transform: scale(1.1);
        color: var(--vt-c-custom-text-2);
    }

    @media screen and (max-width: 905px) {
        #icons-list {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(3, 1fr);
            grid-column-gap: 5px;
            grid-row-gap: 40px;
        }
    }

    @media screen and (max-width: 450px) {
        #icons-list {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
            grid-column-gap: 5px;
            grid-row-gap: 20px;
        }
    }
</style>
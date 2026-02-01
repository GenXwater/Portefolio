<script setup>
    import { ref } from 'vue';
    import IconDocument from './icons/IconDocument.vue';
    import IconBriefcase from './icons/IconBriefcase.vue';
    import IconSend from './icons/IconSend.vue';

    const menuOpen = ref(false);

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value;
    };
</script>

<template>
    <header class="header-wrapper">
        <div class="header-content">
            <!-- Logo / Identité à gauche -->
            <div class="header-left">
                <div class="logo-badge">
                    <span class="logo-brace">&#123;&#123;</span>
                    <span class="logo-text">Louis<span class="text-highlight-2">.dev</span></span>
                    <span class="logo-brace">&#125;&#125;</span>
                </div>
                <nav class="nav-links">
                    <a href="#about-me" class="nav-link">À propos</a>
                    <a href="#projets" class="nav-link">Projets</a>
                    <a href="#xp" class="nav-link">Expériences</a>
                </nav>
            </div>

            <!-- Boutons à droite -->
            <div class="header-right">
                <a href="#" class="header-btn btn-secondary">
                    <span class="btn-content">
                        <IconDocument class="btn-icon" />
                        <span class="btn-text">Mon CV</span>
                    </span>
                    <span class="btn-glow"></span>
                </a>
                <a href="#" class="header-btn btn-secondary">
                    <span class="btn-content">
                        <IconBriefcase class="btn-icon" />
                        <span class="btn-text">Mes Services</span>
                    </span>
                    <span class="btn-glow"></span>
                </a>
                <a href="#contact" class="header-btn btn-primary">
                    <span class="btn-content">
                        <IconSend class="btn-icon" />
                        <span class="btn-text">Me contacter</span>
                    </span>
                    <span class="btn-glow"></span>
                    <span class="btn-shine"></span>
                </a>
            </div>

            <!-- Menu burger mobile -->
            <button class="burger-menu" :class="{ 'active': menuOpen }" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <!-- Menu mobile -->
        <nav class="mobile-nav" :class="{ 'open': menuOpen }">
            <a href="#about-me" class="mobile-link" @click="menuOpen = false">À propos</a>
            <a href="#projets" class="mobile-link" @click="menuOpen = false">Projets</a>
            <a href="#xp" class="mobile-link" @click="menuOpen = false">Expériences</a>
            <div class="mobile-btns">
                <a href="#" class="header-btn btn-secondary mobile-btn">
                    <span class="btn-content">
                        <IconDocument class="btn-icon" />
                        <span class="btn-text">Mon CV</span>
                    </span>
                </a>
                <a href="#" class="header-btn btn-secondary mobile-btn">
                    <span class="btn-content">
                        <IconBriefcase class="btn-icon" />
                        <span class="btn-text">Mes Services</span>
                    </span>
                </a>
                <a href="#contact" class="header-btn btn-primary mobile-btn" @click="menuOpen = false">
                    <span class="btn-content">
                        <IconSend class="btn-icon" />
                        <span class="btn-text">Me contacter</span>
                    </span>
                </a>
            </div>
        </nav>
    </header>
</template>

<style scoped>
    .header-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: color-mix(in srgb, var(--vt-c-custom-dark-1) 85%, transparent);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid color-mix(in srgb, var(--vt-c-custom-text-1) 15%, transparent);
    }

    .header-content {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 20px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* ===== PARTIE GAUCHE ===== */
    .header-left {
        display: flex;
        align-items: center;
        gap: 40px;
    }

    .logo-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 20px;
        font-weight: 700;
        color: var(--vt-c-custom-text-1);
    }

    .logo-brace {
        font-size: 22px;
        font-weight: 700;
        color: #f0db4f;
        animation: pulse-glow 2s ease-in-out infinite;
    }

    @keyframes pulse-glow {
        0%, 100% { filter: drop-shadow(0 0 5px #f0db4f); }
        50% { filter: drop-shadow(0 0 15px #f0db4f); }
    }

    .logo-text {
        letter-spacing: -0.5px;
    }

    .nav-links {
        display: flex;
        gap: 25px;
    }

    .nav-link {
        color: var(--color-text);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        padding: 5px 0;
        transition: color 0.3s ease;
    }

    .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--vt-c-custom-text-1), var(--vt-c-custom-text-2));
        transition: width 0.3s ease;
    }

    .nav-link:hover {
        color: var(--vt-c-custom-text-1);
    }

    .nav-link:hover::after {
        width: 100%;
    }

    /* ===== PARTIE DROITE - BOUTONS ===== */
    .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .header-btn {
        position: relative;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 13px;
        font-weight: 600;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .btn-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .btn-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        transition: transform 0.3s ease;
    }

    /* Boutons secondaires */
    .btn-secondary {
        background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 8%);
        color: var(--color-text);
    }

    .btn-secondary .btn-glow {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, 
            color-mix(in srgb, var(--vt-c-custom-text-1) 20%, transparent),
            transparent 50%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px color-mix(in srgb, var(--vt-c-custom-text-1) 25%, transparent);
    }

    .btn-secondary:hover .btn-glow {
        opacity: 1;
    }

    .btn-secondary:hover .btn-icon {
        transform: scale(1.2) rotate(-5deg);
    }

    /* Bouton principal - effet spécial */
    .btn-primary {
        background: linear-gradient(135deg, var(--vt-c-custom-text-2), color-mix(in srgb, var(--vt-c-custom-text-2) 80%, var(--vt-c-custom-text-1)));
        color: var(--vt-c-custom-dark-1);
    }

    .btn-primary .btn-glow {
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, var(--vt-c-custom-text-2), var(--vt-c-custom-text-1));
        border-radius: 50px;
        z-index: -1;
        opacity: 0;
        filter: blur(8px);
        transition: opacity 0.3s ease;
    }

    .btn-primary .btn-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent);
        transition: left 0.5s ease;
    }

    .btn-primary:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 
            0 8px 25px color-mix(in srgb, var(--vt-c-custom-text-2) 40%, transparent),
            0 0 40px color-mix(in srgb, var(--vt-c-custom-text-2) 20%, transparent);
    }

    .btn-primary:hover .btn-glow {
        opacity: 0.6;
    }

    .btn-primary:hover .btn-shine {
        left: 100%;
    }

    .btn-primary:hover .btn-icon {
        transform: scale(1.2) translateX(3px);
    }

    /* Animation au clic */
    .header-btn:active {
        transform: scale(0.95) !important;
    }

    /* ===== MENU BURGER ===== */
    .burger-menu {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 30px;
        height: 30px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .burger-menu span {
        display: block;
        width: 100%;
        height: 2px;
        background: var(--color-text);
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    .burger-menu.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .burger-menu.active span:nth-child(2) {
        opacity: 0;
    }

    .burger-menu.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }

    /* ===== MENU MOBILE ===== */
    .mobile-nav {
        display: none;
        flex-direction: column;
        padding: 20px;
        background: color-mix(in srgb, var(--vt-c-custom-dark-1) 95%, transparent);
        border-top: 1px solid color-mix(in srgb, var(--vt-c-custom-text-1) 10%, transparent);
    }

    .mobile-link {
        color: var(--color-text);
        text-decoration: none;
        padding: 15px 0;
        font-size: 16px;
        border-bottom: 1px solid color-mix(in srgb, var(--vt-c-custom-text-1) 10%, transparent);
        transition: color 0.3s ease, padding-left 0.3s ease;
    }

    .mobile-link:hover {
        color: var(--vt-c-custom-text-1);
        padding-left: 10px;
    }

    .mobile-btns {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
    }

    .mobile-btn {
        justify-content: center;
        text-align: center;
    }

    .mobile-btn .btn-content {
        justify-content: center;
    }

    /* ===== RESPONSIVE ===== */
    @media screen and (max-width: 905px) {
        .nav-links {
            display: none;
        }

        .header-right {
            display: none;
        }

        .burger-menu {
            display: flex;
        }

        .mobile-nav.open {
            display: flex;
        }

        .header-content {
            height: 60px;
        }
    }

    @media screen and (max-width: 500px) {
        .logo-text {
            font-size: 16px;
        }

        .logo-icon {
            font-size: 20px;
        }
    }
</style>
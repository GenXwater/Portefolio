<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import IconBriefcase from './icons/IconBriefcase.vue';
    import IconSend from './icons/IconSend.vue';
    import ButtonPrimary from './ui/ButtonPrimary.vue';
    import ButtonSecondary from './ui/ButtonSecondary.vue';

    const router = useRouter();
    const menuOpen = ref(false);

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value;
    };

    const goToContact = () => {
        menuOpen.value = false;
        router.push('/contact');
    };
</script>

<template>
    <header class="header-wrapper">
        <div class="header-content">
            <!-- Logo / Identité à gauche -->
            <div class="header-left">
                <RouterLink to="/" class="logo-badge">
                    <span class="logo-brace">&#123;&#123;</span>
                    <span class="logo-text">&nbsp;Louis<span class="text-highlight-2">.dev&nbsp;</span></span>
                    <span class="logo-brace">&#125;&#125;</span>
                </RouterLink>
                <nav class="nav-links">
                    <RouterLink to="/#about-me" class="nav-link">À propos</RouterLink>
                    <RouterLink to="/#xp" class="nav-link">Expériences</RouterLink>
                    <RouterLink to="/#projects" class="nav-link">Projets</RouterLink>
                </nav>
            </div>

            <!-- Boutons à droite -->
            <div class="header-right">
                <RouterLink to="/services" class="btn-secondary header-link">
                    <IconBriefcase />
                    <span>Mes Services</span>
                </RouterLink>
                <ButtonPrimary @click="goToContact">
                    <IconSend />
                    <span>Me contacter</span>
                </ButtonPrimary>
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
            <RouterLink to="/#about-me" class="mobile-link" @click="menuOpen = false">À propos</RouterLink>
            <RouterLink to="/#xp" class="mobile-link" @click="menuOpen = false">Expériences</RouterLink>
            <RouterLink to="/#projects" class="mobile-link" @click="menuOpen = false">Projets</RouterLink>
            <div class="mobile-btns">
                <RouterLink to="/services" class="btn-secondary mobile-link-btn">
                    <IconBriefcase />
                    <span>Mes Services</span>
                </RouterLink>
                <ButtonPrimary @click="goToContact">
                    <IconSend />
                    <span>Me contacter</span>
                </ButtonPrimary>
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
        text-decoration: none;
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

    /* ensure RouterLink used as button keeps ButtonSecondary look */
    .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        border: none;
        background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 8%);
        color: var(--color-text);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .btn-secondary :deep(svg) {
        width: 16px;
        height: 16px;
    }

    .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px color-mix(in srgb, var(--vt-c-custom-text-1) 25%, transparent);
    }
</style>
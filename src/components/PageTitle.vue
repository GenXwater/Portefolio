<script setup>
    import SocialIcone from './ui/SocialIcone.vue';
</script>

<template>
    <div id="top-line">
        <div id="profile-img">
            <img class="profile-img-img profile-img-dark" src="../assets/profil_view.jpeg" alt="Louis GENTY" draggable="false">
            <img class="profile-img-img profile-img-light" src="../assets/profil_wiew_clair.png" alt="Louis GENTY" draggable="false">
        </div>
        <div id="line">
            <p>
                Je suis <span class="text-highlight-1">Louis GENTY</span>, <br/>
                Prophète en informatique.
            </p>
            <div id="social">
                <SocialIcone img="icons8-github-64" alt="github" link="https://github.com/GenXwater" />
                <SocialIcone img="icons8-linkedin-64" alt="linkedin" link="https://fr.linkedin.com/in/louis-genty-023708209" />
                <!-- Exemple avec component et props intelligents -->
            </div>

        </div>
    </div>
</template>

<style scoped>
    #top-line {
        margin-top: 120px;
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
    }

    #top-line #profile-img {
        margin-right: 50px;
        border-radius: 50%;
        user-select: none;
        width: 300px;
        height: 300px;
        overflow: hidden;
        position: relative;
        flex: 0 0 auto;
    }

    /* stacked images that will cross-fade when theme changes */
    .profile-img-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .profile-img-dark {
        opacity: 1;
    }

    .profile-img-light {
        opacity: 0;
    }

    #top-line #line {
        transform: translateY(30%);
        text-align: center;
    }

    #top-line p {
        font-size: 42px;
        line-height: 60px;
    }

    #top-line p span {
        font-weight: bold;
    }

    #social {
        margin-top: 15px;
    }

    .social-img {
        margin-right: 10px;
        filter: opacity(0.7);
    }

    @media screen and (max-width: 905px) {
        #top-line {
            flex-direction: column;
            align-items: center;
            height: auto;
        }

        #top-line #profile-img {
            display: block;
            width: 280px;
            height: 280px;
            margin: 0 0 16px;
            transform: none;
        }

        #top-line #line {
            float: none;
            transform: translateY(0%);
        }

        #top-line p {
            font-size: 36px;
        }
    }

    /* prefer light theme: show the light image and hide the dark one */
    @media (prefers-color-scheme: light) {
        .profile-img-light { opacity: 1; }
        .profile-img-dark { opacity: 0; }
    }

    /* prefer dark theme: ensure dark image visible (redundant but explicit) */
    @media (prefers-color-scheme: dark) {
        .profile-img-light { opacity: 0; }
        .profile-img-dark { opacity: 1; }
    }

</style>
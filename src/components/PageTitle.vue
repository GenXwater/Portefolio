<script setup>
    import SocialIcone from './SocialIcone.vue';
</script>

<template>
    <div id="top-line">
        <img id="profile-img" src="../assets/profil_view.jpeg" alt="Louis GENTY" width="300px" height="300px">
        <div id="line">
            <p>
                Je suis <span class="text-highlight-1">Louis GENTY</span>, <br/>
                Prophète en informatique.
            </p>
            <div id="social">
                <a href="https://github.com/GenXwater" target="_blank">
                    <img class="social-img" src="../assets/icons8-github-64.png" alt="github" width="32px" />
                </a> <!-- Exemple basique -->
                <SocialIcone img="icons8-linkedin-64" alt="linkedin" link="https://fr.linkedin.com/in/louis-genty-023708209" />
                <!-- Exemple avec component et props intelligents -->
            </div>

        </div>
    </div>
</template>

<style scoped>
    #top-line {
        margin-top: 50px;
        width: 100%;
        height: 300px;
    }

    #top-line #profile-img {
        float: left;
        margin-right: 50px;
    }

    #top-line #line {
        float: left;
        transform: translateY(40%);
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
        border-radius: 7px;
    }

    @media screen and (max-width: 905px) {
        #top-line #profile-img {
            display: none;
        }

        #top-line #line {
            float: none;
            transform: translateY(0%);
        }

        #top-line p {
            font-size: 36px;
        }
    }

</style>
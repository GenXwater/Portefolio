<script setup>
    import { ref, computed } from 'vue';
    import IconSend from './icons/IconSend.vue';
    import IconCoffee from './icons/IconCoffee.vue';
    import IconMapPin from './icons/IconMapPin.vue';
    import IconClock from './icons/IconClock.vue';
    import ButtonPrimary from './ui/ButtonPrimary.vue';

    defineProps({
        compact: { type: Boolean, default: false }
    });

    // Calcul du nombre de cafés selon l'heure
    const coffeeCount = computed(() => {
        const now = new Date();
        const hour = now.getHours();
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
        
        // Avant 7h : 0 café
        if (hour < 7) return 0;
        // Après 14h : nombre final de la journée (2, 3 ou 4 selon le jour)
        if (hour >= 14) return 2 + (dayOfYear % 3); // Varie entre 2, 3, 4
        
        // Entre 7h et 14h : progression
        const maxToday = 2 + (dayOfYear % 3); // 2, 3 ou 4 selon le jour
        const progress = (hour - 7) / 7; // 0 à 1 sur la plage 7h-14h
        return Math.min(Math.ceil(progress * maxToday), maxToday);
    });

    const form = ref({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const errors = ref({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const honeypot = ref('');
    const isSubmitting = ref(false);
    const isSubmitted = ref(false);
    const error = ref('');

    const focusedField = ref(null);
    let blurTimeout = null;

    const COOLDOWN = 60000; // 1 minute
    const lastSubmitTime = ref(0);

    const handleFocus = (field) => {
        clearTimeout(blurTimeout);
        focusedField.value = field;
    };

    const handleBlur = () => {
        blurTimeout = setTimeout(() => {
            focusedField.value = null;
        }, 200);
    };

    const validateField = (field) => {
        errors.value[field] = '';
        const v = form.value[field] ? form.value[field].toString() : '';
        switch (field) {
            case 'name':
                if (v.trim().length < 2) errors.value.name = 'Merci de renseigner votre nom';
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors.value.email = 'Veuillez entrer une adresse mail valide';
                break;
            case 'subject':
                if (v.trim().length < 3) errors.value.subject = 'Merci de donner un titre à votre demande';
                break;
            case 'message':
                if (v.trim().length < 10) errors.value.message = 'Merci de me décrire votre demande';
                else if (v.length > 5000) errors.value.message = 'Message trop long (maximum 5000 caractères)';
                break;
        }
    };

    const validateForm = () => {
        let ok = true;
        Object.keys(form.value).forEach(k => {
            validateField(k);
            if (errors.value[k]) ok = false;
        });
        return ok;
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        form.value.name = '';
        form.value.email = '';
        form.value.subject = '';
        form.value.message = '';
        errors.value.name = '';
        errors.value.email = '';
        errors.value.subject = '';
        errors.value.message = '';
    };

    const handleSubmit = async () => {
        // honeypot
        if (honeypot.value !== '') {
            console.log('Bot détecté');
            return;
        }

        // cooldown
        const now = Date.now();
        if (now - lastSubmitTime.value < COOLDOWN) {
            const remaining = Math.ceil((COOLDOWN - (now - lastSubmitTime.value)) / 1000);
            error.value = `⏱️ Veuillez attendre ${remaining} secondes avant de renvoyer`;
            scrollToTop();
            return;
        }

        // validation
        if (!validateForm()) {
            error.value = 'Veuillez corriger les erreurs dans le formulaire';
            scrollToTop();
            return;
        }

        isSubmitting.value = true;
        error.value = '';

        try {
            // use field names compatible with netlify function (also accept from_name/from_email)
            const body = {
                from_name: form.value.name,
                from_email: form.value.email,
                subject: form.value.subject,
                message: `Sujet: ${form.value.subject}\n\n${form.value.message}`
            };

            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const payload = await res.json().catch(() => null);

            if (!res.ok) {
                const msg = payload && (payload.details || payload.error) ? (payload.details || payload.error) : 'Erreur serveur';
                throw new Error(msg);
            }

            isSubmitted.value = true;
            resetForm();
            lastSubmitTime.value = now;

            setTimeout(() => { isSubmitted.value = false; }, 5000);
            scrollToTop();
        } catch (err) {
            console.error('Erreur send:', err);
            error.value = err && err.message ? err.message : 'Erreur lors de l\'envoi';
            scrollToTop();
        } finally {
            isSubmitting.value = false;
        }
    };
</script>

<template>
    <section id="contact" class="contact-section" :class="{ 'compact': compact }">
        <div class="contact-container">
            <!-- En-tête -->
            <div class="contact-header">
                <h2 class="text-highlight-1 section-title">Me contacter</h2>
                <p class="contact-subtitle">
                    Une idée de projet ? Une question ? N'hésitez pas à me contacter, 
                    je vous répondrai dans les plus brefs délais.
                </p>
            </div>

            <div class="contact-content">
                <!-- Infos de contact -->
                <div class="contact-info">
                    <div class="info-card">
                        <div class="info-icon icon-coffee">
                            <IconCoffee />
                        </div>
                        <div class="info-content">
                            <span class="info-label">Cafés consommés aujourd'hui</span>
                            <span class="info-value coffee-count">
                                <span v-for="n in 4" :key="n" class="coffee-dot" :class="{ 'active': n <= coffeeCount }">☕</span>
                            </span>
                        </div>
                    </div>

                    <div class="info-card">
                        <div class="info-icon">
                            <IconMapPin />
                        </div>
                        <div class="info-content">
                            <span class="info-label">Localisation</span>
                            <span class="info-value">France</span>
                        </div>
                    </div>

                    <div class="info-card">
                        <div class="info-icon">
                            <IconClock />
                        </div>
                        <div class="info-content">
                            <span class="info-label">Disponibilité</span>
                            <span class="info-value status-available">
                                <span class="status-dot"></span>
                                Disponible
                            </span>
                        </div>
                    </div>

                    <!-- Decoration -->
                    <div class="decoration-pattern">
                        <span v-for="n in 9" :key="n" class="pattern-dot"></span>
                    </div>
                </div>

                <!-- Formulaire -->
                <form class="contact-form" @submit.prevent="handleSubmit">
                    <div class="form-row">
                        <div class="form-group" :class="{ 'focused': focusedField === 'name', 'filled': form.name }">
                            <label for="name">Nom</label>
                            <input 
                                type="text" 
                                id="name" 
                                v-model="form.name"
                                @focus="handleFocus('name')"
                                    @blur="() => { handleBlur(); validateField('name'); }"
                                autocomplete="name"
                                spellcheck="false"
                                required
                            />
                                    <span v-if="errors.name" class="error-message" style="color:#ff6b9d;font-size:0.9rem;margin-top:6px;display:block">{{ errors.name }}</span>
                        </div>
                        <div class="form-group" :class="{ 'focused': focusedField === 'email', 'filled': form.email }">
                            <label for="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                v-model="form.email"
                                @focus="handleFocus('email')"
                                    @blur="() => { handleBlur(); validateField('email'); }"
                                autocomplete="email"
                                spellcheck="false"
                                required
                            />
                                    <span v-if="errors.email" class="error-message" style="color:#ff6b9d;font-size:0.9rem;margin-top:6px;display:block">{{ errors.email }}</span>
                        </div>
                    </div>

                    <div class="form-group" :class="{ 'focused': focusedField === 'subject', 'filled': form.subject }">
                        <label for="subject">Sujet</label>
                        <input 
                            type="text" 
                            id="subject" 
                            v-model="form.subject"
                            @focus="handleFocus('subject')"
                            @blur="() => { handleBlur(); validateField('subject'); }"
                            autocomplete="off"
                            spellcheck="false"
                            required
                        />
                        <span v-if="errors.subject" class="error-message" style="color:#ff6b9d;font-size:0.9rem;margin-top:6px;display:block">{{ errors.subject }}</span>
                    </div>

                    <div class="form-group" :class="{ 'focused': focusedField === 'message', 'filled': form.message }">
                        <label for="message">Message</label>
                        <textarea 
                            id="message" 
                            v-model="form.message"
                            @focus="handleFocus('message')"
                            @blur="() => { handleBlur(); validateField('message'); }"
                            spellcheck="false"
                            rows="5"
                            required
                        ></textarea>
                        <span v-if="errors.message" class="error-message" style="color:#ff6b9d;font-size:0.9rem;margin-top:6px;display:block">{{ errors.message }}</span>
                    </div>

                    <!-- Honeypot invisible -->
                    <input type="text" v-model="honeypot" name="website" style="position: absolute; left: -9999px; width:1px; height:1px;" tabindex="-1" autocomplete="off" />

                    <ButtonPrimary 
                        type="submit" 
                        :loading="isSubmitting"
                        :success="isSubmitted"
                    >
                        <template v-if="!isSubmitting && !isSubmitted">
                            <IconSend />
                            <span>Envoyer le message</span>
                        </template>
                        <template v-if="isSubmitting">
                            <span class="spinner"></span>
                            <span>Envoi en cours...</span>
                        </template>
                        <template v-if="isSubmitted">
                            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Message envoyé !</span>
                        </template>
                    </ButtonPrimary>

                    <!-- show error if any -->
                    <p v-if="error" class="form-error" style="color:#f87171;margin-top:8px;">{{ error }}</p>
                </form>
            </div>
        </div>

        <!-- Background decoration -->
        <div class="bg-glow"></div>
    </section>
</template>

<style scoped>
    .contact-section {
        position: relative;
        padding: 120px 0;
    }

    .contact-section.compact {
        margin-top: 20px;
    }

    .contact-container {
        position: relative;
        z-index: 1;
    }

    .contact-header {
        text-align: center;
        margin-bottom: 50px;
    }

    .contact-subtitle {
        max-width: 500px;
        margin: 0 auto;
        color: var(--vt-c-text-dark-2);
        font-size: 16px;
        line-height: 1.7;
    }

    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        gap: 40px;
        align-items: start;
    }

    /* ===== INFOS DE CONTACT ===== */
    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
    }

    .info-card {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%);
        border-radius: 12px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .info-card:hover {
        transform: translateX(5px);
        box-shadow: -5px 0 20px color-mix(in srgb, var(--vt-c-custom-text-1) 15%, transparent);
    }

    .info-icon {
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in srgb, var(--vt-c-custom-text-1) 15%, transparent);
        border-radius: 10px;
        flex-shrink: 0;
    }

    .info-icon svg {
        width: 22px;
        height: 22px;
        color: var(--vt-c-custom-text-1);
    }

    .info-content {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .info-label {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--vt-c-text-dark-2);
    }

    .info-value {
        font-size: 15px;
        font-weight: 600;
        color: var(--color-text);
        text-decoration: none;
    }

    a.info-value:hover {
        text-decoration: underline;
    }

    /* Café counter */
    .icon-coffee svg {
        color: #c9a66b;
    }

    .coffee-count {
        display: flex;
        gap: 4px;
    }

    .coffee-dot {
        font-size: 16px;
        opacity: 0.2;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .coffee-dot.active {
        opacity: 1;
    }

    .status-available {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4ade80;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        background: #4ade80;
        border-radius: 50%;
        animation: pulse-status 2s ease-in-out infinite;
    }

    @keyframes pulse-status {
        0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
        50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
    }

    .decoration-pattern {
        display: grid;
        grid-template-columns: repeat(3, 8px);
        gap: 12px;
        margin-top: 20px;
        margin-left: 10px;
        opacity: 0.3;
    }

    .pattern-dot {
        width: 8px;
        height: 8px;
        background: var(--vt-c-custom-text-1);
        border-radius: 50%;
    }

    /* ===== FORMULAIRE ===== */
    .contact-form {
        background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%);
        padding: 35px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 25px;
    }

    .form-row {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .form-group {
        position: relative;
        width: 100%;
        z-index: 1;
    }

    .form-group.focused {
        z-index: 2;
    }

    .form-group label {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        color: var(--vt-c-text-dark-2);
        pointer-events: none;
        transition: all 0.3s ease;
    }

    .form-group textarea ~ label {
        top: 20px;
        transform: none;
    }

    .form-group.focused label,
    .form-group.filled label {
        top: -10px;
        left: 10px;
        font-size: 12px;
        color: var(--vt-c-custom-text-1);
        background: color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%);
        padding: 0 5px;
    }

    .form-group textarea ~ label {
        transform: none;
    }

    .form-group.focused textarea ~ label,
    .form-group.filled textarea ~ label {
        top: -10px;
    }

    .form-group input,
    .form-group textarea {
        position: relative;
        width: 100%;
        padding: 15px;
        background: transparent;
        border: 2px solid color-mix(in srgb, var(--vt-c-custom-text-1) 20%, transparent);
        border-radius: 10px;
        color: var(--color-text);
        font-size: 15px;
        font-family: inherit;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        resize: none;
    }

    /* Scrollbar personnalisée pour textarea */
    .form-group textarea::-webkit-scrollbar {
        width: 8px;
    }

    .form-group textarea::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 4px;
    }

    .form-group textarea::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--vt-c-custom-text-1) 30%, transparent);
        border-radius: 4px;
    }

    .form-group textarea::-webkit-scrollbar-thumb:hover {
        background: color-mix(in srgb, var(--vt-c-custom-text-1) 50%, transparent);
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group.focused input,
    .form-group.focused textarea {
        outline: none;
        border-color: var(--vt-c-custom-text-1);
        box-shadow: 
            0 0 15px color-mix(in srgb, var(--vt-c-custom-text-1) 40%, transparent),
            0 0 30px color-mix(in srgb, var(--vt-c-custom-text-2) 25%, transparent);
    }

    /* Fix autocomplete background */
    .form-group input:-webkit-autofill,
    .form-group input:-webkit-autofill:hover,
    .form-group textarea:-webkit-autofill,
    .form-group textarea:-webkit-autofill:hover {
        -webkit-box-shadow: 0 0 0 1000px color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%) inset !important;
        -webkit-text-fill-color: var(--vt-c-text-dark-2) !important;
        color: var(--vt-c-text-dark-2) !important;
        caret-color: var(--vt-c-text-dark-2) !important;
        background-color: transparent !important;
        transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
        text-decoration: none !important;
    }

    /* Autofill avec focus : garder le halo */
    .form-group input:-webkit-autofill:focus,
    .form-group input:-webkit-autofill:active,
    .form-group textarea:-webkit-autofill:focus,
    .form-group textarea:-webkit-autofill:active,
    .form-group.focused input:-webkit-autofill,
    .form-group.focused textarea:-webkit-autofill {
        -webkit-text-fill-color: var(--vt-c-text-dark-2) !important;
        color: var(--vt-c-text-dark-2) !important;
        caret-color: var(--vt-c-text-dark-2) !important;
        background-color: transparent !important;
        transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
        border-color: var(--vt-c-custom-text-1) !important;
        text-decoration: none !important;
        box-shadow: 
            0 0 0 1000px color-mix(in srgb, var(--vt-c-custom-dark-1), var(--vt-c-custom-text-1) 5%) inset,
            0 0 15px color-mix(in srgb, var(--vt-c-custom-text-1) 40%, transparent),
            0 0 30px color-mix(in srgb, var(--vt-c-custom-text-2) 25%, transparent) !important;
    }

    .form-group input:-webkit-autofill::first-line {
        color: var(--vt-c-text-dark-2) !important;
        text-decoration: none !important;
    }

    /* ===== BOUTON SUBMIT STATES ===== */
    :deep(.spinner) {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    :deep(.check-icon) {
        width: 16px;
        height: 16px;
    }

    /* ===== BACKGROUND ===== */
    .bg-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, 
            color-mix(in srgb, var(--vt-c-custom-text-1) 8%, transparent) 0%,
            transparent 70%);
        pointer-events: none;
        z-index: 0;
    }

    /* ===== RESPONSIVE ===== */
    @media screen and (max-width: 905px) {
        .contact-content {
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .contact-info {
            order: 2;
        }

        .contact-form {
            order: 1;
        }

        .form-row {
            grid-template-columns: 1fr;
        }

        .decoration-pattern {
            display: none;
        }
    }
</style>

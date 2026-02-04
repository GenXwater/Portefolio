# Portfolio

Mon portfolio personnel développé avec Vue 3 et Vite.

## Installation

```sh
npm install
```

## Développement

```sh
npm run dev
```

## Activer le formaulaire
Configurer `.env` (ex. à la racine, et l'ajouter dans le gitignore) :

```env
NETLIFY_SMTP_HOST=smtp.gmail.com
NETLIFY_SMTP_PORT=587
NETLIFY_SMTP_SECURE=false
NETLIFY_SMTP_USER=votre.email@gmail.com
NETLIFY_SMTP_PASS=votre_app_password  # 16 chars, ❗RETIREZ LES ESAPCES SI IL Y EN A
EMAIL_TO=destinataire@exemple.com # ou le même mail que NETLIFY_SMTP_USER
```

Tester la connexion SMTP (chargez d'abord les vars) :

```sh
set -a && source .env && set +a
node test-smtp.js
```

Si vous voyez `SMTP verify OK — credentials accepted.`, passez à la suite.

Lancer localement (Netlify CLI pour fonctions) :

```sh
npx netlify dev
```

Tester le endpoint (adapter le port):

```sh
curl -X POST http://localhost:8888/api/sendEmail \
  -H "Content-Type: application/json" \
  -d '{"from_name":"Test","from_email":"votre.email@gmail.com","subject":"Salut","message":"Bonjour depuis curl"}'
```

Notes rapides

- Pourquoi Netlify ? Les fonctions se trouvent dans `netlify/functions` et sont exposées via `/api/*` grâce à `netlify.toml`. `netlify dev` permet d'exécuter ces fonctions localement sans compte.
- Alternative : si vous ne voulez pas Netlify, pointez le fetch du front vers votre propre serveur (Express, Vercel, etc.) et adaptez l'endpoint.
- Si l'authent échoue pour Gmail : vérifiez App Password, DisplayUnlockCaptcha et l'absence d'espaces dans `NETLIFY_SMTP_PASS`.

Publier sur Netlify
-------------------

1) Créer un compte Netlify et connecter votre dépôt (GitHub/GitLab/Bitbucket) ou utiliser le déploiement manuel.

2) Dans les paramètres du site (Site settings → Build & deploy → Continuous Deployment), définissez :

  - **Build command**: `npm run build`
  - **Publish directory**: `dist`

3) Ajouter les variables d'environnement (Site settings → Build & deploy → Environment) :

  - `NETLIFY_SMTP_HOST`, `NETLIFY_SMTP_PORT`, `NETLIFY_SMTP_SECURE`, `NETLIFY_SMTP_USER`, `NETLIFY_SMTP_PASS`
  - `EMAIL_TO`

  Assurez-vous que `NETLIFY_SMTP_PASS` contient l'App Password sans espaces.

4) Netlify détecte automatiquement `netlify/functions` (voir `netlify.toml`) et publiera les fonctions serverless.

5) Déploiement rapide depuis la ligne de commande (optionnel) :

```sh
npm run build
```

Conseils
- Pour un déploiement continu, connectez le dépôt et activez les déploiements automatiques sur chaque push.
- Vérifiez les logs de build et de fonctions dans l'interface Netlify si quelque chose échoue.
- Si vous préférez un envoi d'email tiers (SendGrid, Mailgun), remplacez la logique de `sendEmail.js` ou configurez un provider via SMTP.

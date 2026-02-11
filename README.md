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
NETLIFY_SMTP_HOST=smtp.exemple.com
NETLIFY_SMTP_PORT=587
NETLIFY_SMTP_SECURE=false
NETLIFY_SMTP_USER=votre.email@gmail.com
NETLIFY_SMTP_PASS=votre_app_password  # 16 chars, ❗RETIREZ LES ESAPCES SI IL Y EN A
EMAIL_TO=destinataire@exemple.com # ou le même mail que NETLIFY_SMTP_USER
```

🧪 Tester la connexion SMTP (chargez d'abord les vars) :

Pour vérifier que la configuration SMTP fonctionne correctement en local, un script de test peut être utilisé.

Exemple de script (usage local uniquement)

Créer un fichier (non versionné) par exemple :

scripts-local/test_smtp.js


Avec le contenu :

``` javascript
import nodemailer from "nodemailer";

(async () => {
  if (process.env.NETLIFY) {
    throw new Error("SMTP test must not run on Netlify.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.NETLIFY_SMTP_HOST,
    port: parseInt(process.env.NETLIFY_SMTP_PORT || "587", 10),
    secure: process.env.NETLIFY_SMTP_SECURE === "true",
    auth: {
      user: process.env.NETLIFY_SMTP_USER,
      pass: process.env.NETLIFY_SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP configuration OK");
  } catch (err) {
    console.error("❌ SMTP configuration failed:", err.message);
  }
})();
```

Exécution en local

Avec les variables définies dans .env :

node scripts-local/test_smtp.js

🔒 Pourquoi ce fichier ne doit pas être en production

Ce script :

utilise des variables sensibles (SMTP)

peut afficher des informations de configuration

peut être scanné lors du build Netlify

Netlify bloque automatiquement les déploiements lorsqu’un secret risque d’être exposé dans les logs ou les artefacts.

Pour cette raison :

❌ Ce fichier ne doit jamais être présent dans le dépôt principal

❌ Il ne doit jamais être inclus dans le build

❌ Il ne doit pas être exécuté en CI/CD

✅ Bonnes pratiques

Le script de test SMTP doit :

 - être stocké hors du dossier src/

 - être ignoré via .gitignore

 - être utilisé uniquement en local

Exemple dans .gitignore :

scripts-local/
.env


Les variables SMTP doivent être utilisées uniquement dans les Netlify Functions, jamais côté front.

Lancer localement (Netlify CLI pour fonctions) :

```sh
npx netlify dev
```

puis charger les vars et lancer le script:

```sh
set -a && source .env && set +a
node test-smtp.js
```

Si vous voyez `SMTP verify OK — credentials accepted.`, passez à la suite.

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

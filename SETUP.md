# Configuration du Bot

## 🔐 Migration depuis l'ancien code

Si vous utilisez l'ancien code (`index.js.old`), vous devez :

1. **Extraire votre token Discord** de l'ancien fichier `index.js.old` (ligne 270)
2. **Créer un fichier `.env`** à la racine du projet avec :

```env
DISCORD_TOKEN=votre_token_ici
BOT_PREFIX=!
DEFAULT_LANGUAGE=fr
```

**Note :** Si votre ancien `index.js.old` contient un token, copiez-le dans le fichier `.env` à la place de `votre_token_ici`.

## 🚀 Démarrage

1. Installez les dépendances :
```bash
npm install
```

2. Configurez le fichier `.env` avec votre token

3. Lancez le bot :
```bash
npm start
```

## ⚠️ Important

- Ne partagez **JAMAIS** votre token Discord
- Le fichier `.env` est ignoré par Git pour votre sécurité
- Si vous utilisez Git, assurez-vous que `.gitignore` est correctement configuré


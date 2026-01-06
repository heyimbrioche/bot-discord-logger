# 🚀 Guide de Configuration Détaillé

Guide complet pour configurer et utiliser le Discord Bot Logger.

## 📋 Table des matières

- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration du Bot Discord](#-configuration-du-bot-discord)
- [Configuration du Serveur](#-configuration-du-serveur)
- [Dépannage](#-dépannage)

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Node.js 16.0.0 ou supérieur installé ([Télécharger Node.js](https://nodejs.org/))
- ✅ Un compte Discord
- ✅ Un serveur Discord où vous avez les permissions d'administrateur
- ✅ Un bot Discord créé sur le [Discord Developer Portal](https://discord.com/developers/applications)

## 📦 Installation

### Étape 1 : Cloner le dépôt

```bash
git clone https://github.com/heyimbrioche/bot-discord-logger.git
cd bot-discord-logger
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

Cela installera toutes les dépendances nécessaires :
- `discord.js` - Bibliothèque principale
- `@discordjs/rest` - API REST Discord
- `discord-api-types` - Types TypeScript
- `dotenv` - Gestion des variables d'environnement

### Étape 3 : Configurer les variables d'environnement

1. Créez un fichier `.env` à la racine du projet :

```bash
# Sur Linux/Mac
touch .env

# Sur Windows PowerShell
New-Item .env
```

2. Ajoutez le contenu suivant dans le fichier `.env` :

```env
DISCORD_TOKEN=votre_token_discord_ici
BOT_PREFIX=!
DEFAULT_LANGUAGE=fr
```

3. Remplacez `votre_token_discord_ici` par le token de votre bot (voir section suivante)

## 🤖 Configuration du Bot Discord

### Créer un Bot Discord

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Cliquez sur **"New Application"**
3. Donnez un nom à votre application (ex: "Bot Logger")
4. Cliquez sur **"Create"**

### Obtenir le Token

1. Dans votre application, allez dans l'onglet **"Bot"** (à gauche)
2. Cliquez sur **"Add Bot"** si ce n'est pas déjà fait
3. Cliquez sur **"Reset Token"** pour générer un nouveau token
4. **⚠️ IMPORTANT** : Copiez le token immédiatement et collez-le dans votre fichier `.env`
   - Le token ne sera plus visible après fermeture de la page
   - Ne partagez JAMAIS votre token publiquement

### Configurer les Intents

1. Toujours dans l'onglet **"Bot"**, descendez jusqu'à **"Privileged Gateway Intents"**
2. Activez les intents suivants :
   - ✅ **Server Members Intent** (obligatoire)
   - ✅ **Message Content Intent** (obligatoire)
   - ⚪ **Presence Intent** (optionnel)

### Inviter le Bot sur votre Serveur

1. Allez dans l'onglet **"OAuth2"** > **"URL Generator"**
2. Sélectionnez les scopes :
   - ✅ `bot`
   - ✅ `applications.commands`
3. Sélectionnez les permissions du bot :
   - ✅ **View Channels**
   - ✅ **Send Messages**
   - ✅ **Embed Links**
   - ✅ **Read Message History**
   - ✅ **View Audit Log** (recommandé)
4. Copiez l'URL générée et ouvrez-la dans votre navigateur
5. Sélectionnez votre serveur et autorisez le bot

## ⚙️ Configuration du Serveur

### Étape 1 : Lancer le Bot

```bash
npm start
```

Vous devriez voir :
```
✅ Bot#1234 est connecté !
🔄 Enregistrement des commandes...
✅ 5 commande(s) enregistrée(s) avec succès.
```

### Étape 2 : Configurer la Langue

1. Sur Discord, utilisez la commande `/langsetup`
2. Sélectionnez votre langue préférée (Français ou English)
3. La langue sera sauvegardée pour votre serveur

### Étape 3 : Configurer les Logs

1. Utilisez la commande `/loggersetup`
   - ⚠️ Nécessite la permission "Gérer le serveur"
2. Cliquez sur le bouton **"Configurer les Logs"**
3. Sélectionnez les types de logs que vous souhaitez activer :
   - Vous pouvez sélectionner plusieurs types à la fois
   - Les logs sélectionnés seront activés
4. Choisissez le salon où envoyer les logs :
   - Sélectionnez un salon texte dans la liste
   - Le bot vérifiera automatiquement les permissions
5. Confirmation : Un message de confirmation sera envoyé dans le salon sélectionné

### Étape 4 : Vérifier les Permissions

Utilisez la commande `/permissions` pour vérifier :
- Les permissions du bot sur le serveur
- Les permissions dans le salon de logs
- La position du bot dans la hiérarchie des rôles

## 🔧 Dépannage

### Le bot ne démarre pas

**Erreur : "Token Discord manquant"**
- Vérifiez que le fichier `.env` existe
- Vérifiez que `DISCORD_TOKEN` est bien défini dans `.env`
- Vérifiez qu'il n'y a pas d'espaces avant/après le token

**Erreur : "Invalid token"**
- Vérifiez que le token est correct
- Régénérez le token sur le Discord Developer Portal si nécessaire

### Les commandes ne s'affichent pas

- Attendez quelques minutes après le démarrage du bot
- Les commandes peuvent prendre jusqu'à 1 heure pour se propager
- Redémarrez Discord si nécessaire

### Les logs ne s'envoient pas

**Vérifiez les permissions :**
1. Utilisez `/permissions` pour vérifier les permissions
2. Assurez-vous que le bot a les permissions nécessaires dans le salon de logs
3. Vérifiez que le bot n'est pas muté dans le salon

**Vérifiez la configuration :**
1. Utilisez `/loginfo` pour voir la configuration actuelle
2. Assurez-vous qu'au moins un type de log est activé
3. Vérifiez que le salon de logs existe toujours

### Les audit logs ne fonctionnent pas

- Donnez la permission **"View Audit Log"** au bot
- Cette permission nécessite que le bot soit au moins au niveau "Modérateur"
- Les logs fonctionneront toujours, mais sans afficher l'exécuteur

## 📞 Support

Si vous rencontrez des problèmes :

- 📧 Email : [heyimbrioche@duck.com](mailto:heyimbrioche@duck.com)
- 💬 Discord : `heyimbrioche`
- 🐛 Issues : [GitHub Issues](https://github.com/heyimbrioche/bot-discord-logger/issues)

## ⚠️ Sécurité

- **NE PARTAGEZ JAMAIS** votre token Discord
- Le fichier `.env` est automatiquement ignoré par Git
- Si votre token est compromis, régénérez-le immédiatement
- Ne commitez jamais le fichier `.env` dans Git

## 📚 Ressources

- [Documentation Discord.js](https://discord.js.org/#/docs)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Guide des Permissions](PERMISSIONS.md)

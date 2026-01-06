# Discord Bot Logger 🤖

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Discord.js](https://img.shields.io/badge/discord.js-v14.14.1-blue.svg)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

Bot Discord avancé et modulaire pour logger les événements de serveur avec support multilingue, gestion complète des permissions et statistiques détaillées.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Commandes](#-commandes)
- [Permissions](#-permissions)
- [Structure du projet](#-structure-du-projet)
- [Support](#-support)
- [Contribution](#-contribution)
- [License](#-license)

## ✨ Fonctionnalités

### 🌍 Support Multilingue
- Français et Anglais
- Configuration facile via commande slash
- Interface utilisateur traduite

### 📋 Logging Complet
Le bot enregistre automatiquement tous les événements importants de votre serveur :

- **Rôles** : Création, modification, suppression
- **Salons** : Création, modification, suppression
- **Messages** : Suppression, modification, suppression en masse
- **Membres** : Arrivée, départ, bannissement, débannissement
- **Serveur** : Modifications diverses

### 💾 Persistance des Données
- Sauvegarde automatique en JSON
- Statistiques détaillées par type d'événement
- Compteurs journaliers et totaux
- Données conservées après redémarrage

### 🎨 Interface Utilisateur
- Embeds colorés et informatifs
- Codes couleur par type d'événement
- Informations détaillées (exécuteur, raison, avant/après)
- Thumbnails et timestamps

### ⚙️ Configuration Avancée
- Configuration via commandes slash interactives
- Sélection multiple des types de logs
- Vérification automatique des permissions
- Messages d'erreur clairs et informatifs

### 📊 Statistiques
- Nombre total de logs
- Statistiques du jour
- Répartition par type d'événement
- Commande dédiée pour consulter les stats

### 🔒 Sécurité
- Gestion robuste des permissions
- Vérification avant chaque action
- Protection contre les erreurs
- Gestion sécurisée des audit logs

## 🚀 Installation

### Prérequis

- Node.js 16.0.0 ou supérieur
- Un bot Discord créé sur le [Discord Developer Portal](https://discord.com/developers/applications)
- Les permissions nécessaires (voir [Permissions](#-permissions))

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/heyimbrioche/bot-discord-logger.git
   cd bot-discord-logger
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer le bot**
   - Créez un fichier `.env` à la racine du projet
   - Copiez le contenu de `.env.example` (si disponible) ou créez-le avec :
   ```env
   DISCORD_TOKEN=votre_token_discord_ici
   BOT_PREFIX=!
   DEFAULT_LANGUAGE=fr
   ```

4. **Lancer le bot**
   ```bash
   npm start
   ```

### Configuration du Bot Discord

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application ou sélectionnez votre bot existant
3. Allez dans l'onglet "Bot"
4. Activez les **Privileged Gateway Intents** suivants :
   - ✅ Server Members Intent
   - ✅ Message Content Intent
   - ✅ Presence Intent (optionnel)

5. Invitez le bot sur votre serveur avec les permissions nécessaires (voir [Permissions](#-permissions))

## 📝 Configuration

### Variables d'environnement

| Variable | Description | Requis | Défaut |
|----------|-------------|--------|--------|
| `DISCORD_TOKEN` | Token de votre bot Discord | ✅ Oui | - |
| `BOT_PREFIX` | Préfixe pour les commandes (non utilisé actuellement) | ❌ Non | `!` |
| `DEFAULT_LANGUAGE` | Langue par défaut (`fr` ou `en`) | ❌ Non | `fr` |

### Configuration du serveur

Une fois le bot invité sur votre serveur :

1. Utilisez `/langsetup` pour configurer la langue
2. Utilisez `/loggersetup` pour configurer les logs
3. Sélectionnez les types de logs à activer
4. Choisissez le salon où envoyer les logs

## 🎮 Commandes

| Commande | Description | Permissions |
|----------|-------------|-------------|
| `/langsetup` | Configure la langue du bot (FR/EN) | Tous |
| `/loggersetup` | Configure les logs du serveur | Gérer le serveur |
| `/logs` | Affiche les statistiques des logs | Tous |
| `/loginfo` | Affiche les informations sur la configuration | Tous |
| `/permissions` | Vérifie les permissions du bot | Tous |

## 🔐 Permissions

### Permissions du Bot (Obligatoires)

Le bot nécessite les permissions suivantes dans le salon de logs :

- ✅ **Voir le salon** (`ViewChannel`)
- ✅ **Envoyer des messages** (`SendMessages`)
- ✅ **Intégrer des liens** (`EmbedLinks`)
- ✅ **Lire l'historique des messages** (`ReadMessageHistory`)

### Permissions Recommandées

- ⭐ **Voir les journaux d'audit** (`ViewAuditLog`) - Permet d'afficher qui a effectué les actions

### Permissions Utilisateur

- **Gérer le serveur** (`ManageGuild`) - Requis pour `/loggersetup`

📖 **Pour plus de détails, consultez [PERMISSIONS.md](PERMISSIONS.md)**

## 📁 Structure du projet

```
discord-bot-logger/
├── src/
│   ├── commands/           # Commandes slash Discord
│   │   ├── langsetup.js
│   │   ├── loggersetup.js
│   │   ├── logs.js
│   │   ├── loginfo.js
│   │   └── permissions.js
│   ├── events/             # Gestionnaires d'événements Discord
│   │   ├── ready.js
│   │   ├── interactionCreate.js
│   │   ├── channelCreate.js
│   │   ├── channelDelete.js
│   │   ├── channelUpdate.js
│   │   ├── roleCreate.js
│   │   ├── roleDelete.js
│   │   ├── roleUpdate.js
│   │   ├── messageDelete.js
│   │   ├── messageUpdate.js
│   │   ├── messageBulkDelete.js
│   │   ├── guildMemberAdd.js
│   │   ├── guildMemberRemove.js
│   │   ├── guildBanAdd.js
│   │   └── guildBanRemove.js
│   ├── utils/               # Utilitaires
│   │   ├── database.js      # Système de persistance
│   │   ├── logger.js        # Système de logging
│   │   └── permissions.js   # Gestion des permissions
│   ├── config/              # Configuration
│   │   ├── config.js        # Configuration principale
│   │   └── translations.js  # Traductions multilingues
│   └── index.js             # Point d'entrée
├── data/                    # Données persistantes (généré automatiquement)
├── .env                     # Variables d'environnement (non versionné)
├── .env.example             # Exemple de fichier .env
├── .gitignore
├── package.json
├── README.md
├── SETUP.md                 # Guide de configuration détaillé
├── PERMISSIONS.md           # Documentation des permissions
└── LICENSE                  # Licence MIT
```

## 🔒 Sécurité et Permissions

Le bot intègre un système robuste de gestion des permissions :

- ✅ Vérification automatique des permissions avant chaque action
- ✅ Messages d'erreur clairs et informatifs
- ✅ Gestion sécurisée des audit logs avec fallback
- ✅ Validation des permissions lors de la configuration
- ✅ Protection contre les interactions en DM
- ✅ Gestion d'erreurs complète

Utilisez `/permissions` pour vérifier la configuration actuelle des permissions.

## 🛠️ Développement

### Structure modulaire

Le bot est conçu avec une architecture modulaire pour faciliter :
- La maintenance du code
- L'ajout de nouvelles fonctionnalités
- La compréhension du code
- Les contributions

### Technologies utilisées

- **discord.js** v14.14.1 - Bibliothèque Discord.js
- **Node.js** - Runtime JavaScript
- **dotenv** - Gestion des variables d'environnement

## 📞 Support

Si vous rencontrez des problèmes ou avez des questions :

- 📧 **Email** : [heyimbrioche@duck.com](mailto:heyimbrioche@duck.com)
- 💬 **Discord** : `heyimbrioche`
- 🐛 **Issues** : [GitHub Issues](https://github.com/heyimbrioche/bot-discord-logger/issues)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines

- Respectez le style de code existant
- Ajoutez des commentaires pour le code complexe
- Testez vos modifications
- Mettez à jour la documentation si nécessaire

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [discord.js](https://discord.js.org/) - Bibliothèque Discord.js
- Tous les contributeurs qui améliorent ce projet

---

**Fait avec ❤️ par heyimbrioche**

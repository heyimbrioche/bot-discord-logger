# Discord Bot Logger 🤖

Bot Discord avancé pour logger les événements de serveur avec support multilingue et fonctionnalités étendues.

## ✨ Fonctionnalités

- 🌍 **Support multilingue** (Français/English)
- 📋 **Logging complet** des événements serveur :
  - Création/Modification/Suppression de rôles
  - Création/Modification/Suppression de salons
  - Messages supprimés/modifiés
  - Membres qui rejoignent/partent
  - Bannissements/Débannissements
  - Mises à jour de serveur
- 💾 **Persistance des données** (fichiers JSON)
- 🎨 **Embeds colorés et informatifs**
- ⚙️ **Configuration simple** via commandes slash
- 📊 **Statistiques de logs**
- 🔔 **Support webhook** (optionnel)

## 🚀 Installation

1. Clonez le projet ou téléchargez les fichiers
2. Installez les dépendances :
```bash
npm install
```

3. Configurez votre bot :
   - Copiez `.env.example` vers `.env`
   - Ajoutez votre token Discord dans `.env`

4. Lancez le bot :
```bash
npm start
```

## 📝 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
DISCORD_TOKEN=your_bot_token_here
BOT_PREFIX=!
DEFAULT_LANGUAGE=fr
```

### Commandes Discord

- `/langsetup` - Configurez la langue du bot
- `/loggersetup` - Configurez les logs du serveur
- `/logs` - Affichez les statistiques des logs
- `/loginfo` - Informations sur la configuration des logs

## 📁 Structure du projet

```
discord-bot-logger/
├── src/
│   ├── commands/        # Commandes slash
│   ├── events/          # Événements Discord
│   ├── utils/           # Utilitaires
│   ├── config/          # Configuration
│   └── index.js         # Point d'entrée
├── data/                # Données persistantes
├── .env                 # Variables d'environnement
├── package.json
└── README.md
```

## 🔧 Développement

Le bot est structuré de manière modulaire pour faciliter la maintenance et l'ajout de nouvelles fonctionnalités.

## 📄 License

MIT


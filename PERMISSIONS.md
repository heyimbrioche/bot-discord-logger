# 📋 Permissions Requises

Ce document liste toutes les permissions nécessaires pour que le bot fonctionne correctement.

## 🔑 Permissions du Bot dans le Serveur

### Permissions Minimales (Obligatoires)

1. **Voir le salon** (`ViewChannel`)
   - Nécessaire pour envoyer des logs dans le salon configuré

2. **Envoyer des messages** (`SendMessages`)
   - Nécessaire pour envoyer les embeds de logs

3. **Intégrer des liens** (`EmbedLinks`)
   - Nécessaire pour afficher les embeds de logs correctement

4. **Lire l'historique des messages** (`ReadMessageHistory`)
   - Nécessaire pour fonctionner correctement dans les salons

### Permissions Recommandées (Optionnelles mais Utiles)

5. **Voir les journaux d'audit** (`ViewAuditLog`)
   - **Fortement recommandé** : Permet d'afficher qui a effectué certaines actions (création de rôles, bannissements, etc.)
   - Sans cette permission, les logs fonctionnent mais n'affichent pas l'exécuteur

## 👤 Permissions des Utilisateurs

### Commandes de Configuration

Pour utiliser les commandes `/loggersetup`, l'utilisateur doit avoir :

- **Gérer le serveur** (`ManageGuild`)
  - Nécessaire pour configurer les logs du serveur

## 🔧 Intents Discord Requis

Le bot nécessite les intents suivants dans le Developer Portal :

1. **Presence Intent** (optionnel, pour futures fonctionnalités)
2. **Server Members Intent** (nécessaire pour les événements de membres)
3. **Message Content Intent** (nécessaire pour logger les messages)

### Comment activer les Intents

1. Allez sur https://discord.com/developers/applications
2. Sélectionnez votre application
3. Allez dans l'onglet "Bot"
4. Activez les intents nécessaires dans la section "Privileged Gateway Intents"

## ⚠️ Résolution des Problèmes

### Le bot ne peut pas envoyer de logs

**Symptômes :** Aucun message n'apparaît dans le salon de logs.

**Solutions :**
1. Vérifiez que le bot a les permissions `ViewChannel`, `SendMessages`, et `EmbedLinks` dans le salon de logs
2. Vérifiez que le bot n'est pas muté ou bloqué dans ce salon
3. Vérifiez que le rôle du bot est au-dessus des salons s'il y a des restrictions

### Les logs n'affichent pas qui a effectué l'action

**Symptômes :** Les logs fonctionnent mais le champ "Exécuteur" est vide.

**Solutions :**
1. Donnez la permission `ViewAuditLog` au bot
2. Cette permission nécessite que le bot soit au moins au niveau "Modérateur" ou ait le rôle avec cette permission

### Erreur "Missing Permissions" lors de la configuration

**Symptômes :** Message d'erreur lors de l'utilisation de `/loggersetup`.

**Solutions :**
1. Vérifiez que vous avez la permission `ManageGuild`
2. Vérifiez que votre rôle est au-dessus du bot dans la hiérarchie

## 📝 Configuration Recommandée

Pour un fonctionnement optimal, donnez au bot :

1. Un rôle dédié (ex: "Bot Logger")
2. Les permissions suivantes dans le salon de logs :
   - ✅ Voir le salon
   - ✅ Envoyer des messages
   - ✅ Intégrer des liens
   - ✅ Lire l'historique des messages
3. La permission `ViewAuditLog` au niveau serveur
4. Assurez-vous que le rôle du bot est assez haut dans la hiérarchie

## 🔒 Sécurité

- Ne donnez **JAMAIS** la permission `Administrator` au bot sauf si nécessaire
- Le bot n'a pas besoin de permissions de modération (kick, ban, etc.) pour logger les événements
- Les permissions minimales sont suffisantes pour le logging de base


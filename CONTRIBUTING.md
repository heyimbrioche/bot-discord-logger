# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer au Discord Bot Logger ! Ce document contient les guidelines pour contribuer au projet.

## 📋 Table des matières

- [Code de Conduite](#-code-de-conduite)
- [Comment Contribuer](#-comment-contribuer)
- [Standards de Code](#-standards-de-code)
- [Processus de Pull Request](#-processus-de-pull-request)

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de respecter le code de conduite suivant :

- ✅ Être respectueux et inclusif
- ✅ Accepter les critiques constructives
- ✅ Se concentrer sur ce qui est meilleur pour la communauté
- ✅ Faire preuve d'empathie envers les autres membres

## 🚀 Comment Contribuer

### Signaler un Bug

Si vous trouvez un bug :

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/heyimbrioche/bot-discord-logger/issues)
2. Si ce n'est pas le cas, créez une nouvelle issue avec :
   - Un titre clair et descriptif
   - Une description détaillée du bug
   - Les étapes pour reproduire le bug
   - Le comportement attendu vs le comportement actuel
   - Des captures d'écran si applicable
   - Votre environnement (Node.js version, OS, etc.)

### Proposer une Fonctionnalité

Pour proposer une nouvelle fonctionnalité :

1. Vérifiez que la fonctionnalité n'a pas déjà été proposée
2. Créez une issue avec le label "enhancement"
3. Décrivez clairement :
   - Le problème que cela résout
   - La solution proposée
   - Les avantages pour les utilisateurs

### Contribuer au Code

1. **Fork le projet**
   ```bash
   git clone https://github.com/heyimbrioche/bot-discord-logger.git
   cd bot-discord-logger
   ```

2. **Créer une branche**
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```

3. **Faire vos modifications**
   - Respectez les standards de code
   - Ajoutez des commentaires si nécessaire
   - Testez vos modifications

4. **Commit vos changements**
   ```bash
   git add .
   git commit -m "feat: ajout de ma nouvelle fonctionnalité"
   ```

5. **Push vers GitHub**
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```

6. **Ouvrir une Pull Request**
   - Allez sur GitHub
   - Cliquez sur "New Pull Request"
   - Sélectionnez votre branche
   - Remplissez le template de PR

## 📝 Standards de Code

### Style de Code

- Utilisez des noms de variables et fonctions clairs et descriptifs
- Ajoutez des commentaires pour le code complexe
- Respectez l'indentation existante (espaces, pas de tabs)
- Limitez la longueur des lignes à ~100 caractères

### Structure des Commits

Utilisez le format conventionnel :

```
type: description courte

Description détaillée si nécessaire
```

Types de commits :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage du code
- `refactor`: Refactorisation
- `test`: Tests
- `chore`: Tâches de maintenance

Exemples :
```
feat: ajout de la commande /stats
fix: correction du bug de permissions
docs: mise à jour du README
```

### Tests

- Testez vos modifications avant de soumettre une PR
- Assurez-vous que le bot démarre correctement
- Vérifiez que les nouvelles fonctionnalités fonctionnent comme prévu

## 🔄 Processus de Pull Request

1. **Assurez-vous que votre code est à jour**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Vérifiez qu'il n'y a pas d'erreurs**
   - Le code doit compiler sans erreurs
   - Pas d'avertissements majeurs
   - Les fonctionnalités doivent fonctionner

3. **Remplissez le template de PR**
   - Description claire des changements
   - Référence aux issues liées (si applicable)
   - Captures d'écran si nécessaire

4. **Attendez la revue**
   - Les PR seront revues dans les meilleurs délais
   - Des modifications peuvent être demandées
   - N'hésitez pas à répondre aux commentaires

## 📞 Contact

Pour toute question concernant les contributions :

- 📧 Email : [heyimbrioche@duck.com](mailto:heyimbrioche@duck.com)
- 💬 Discord : `heyimbrioche`

## 🙏 Remerciements

Merci de contribuer au Discord Bot Logger ! Votre aide est précieuse pour améliorer le projet.


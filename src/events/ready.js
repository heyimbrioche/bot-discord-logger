const { REST, Routes } = require('discord.js');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'clientReady',
    once: true,
    async execute(client) {
        console.log(`✅ ${client.user.tag} est connecté !`);

        // Charger les commandes
        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            commands.push({
                name: command.name,
                description: command.description,
            });
        }

        // Enregistrer les commandes
        const rest = new REST({ version: '10' }).setToken(config.token);

        try {
            console.log('🔄 Enregistrement des commandes...');

            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands }
            );

            console.log(`✅ ${commands.length} commande(s) enregistrée(s) avec succès.`);
        } catch (error) {
            console.error('❌ Erreur lors de l\'enregistrement des commandes:', error);
        }
    },
};


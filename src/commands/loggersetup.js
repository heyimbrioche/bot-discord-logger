const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { getDatabase } = require('../utils/database');
const translations = require('../config/translations');

module.exports = {
    name: 'loggersetup',
    description: 'Configurer les logs du serveur.',
    async execute(interaction) {
        // Vérifier les permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            const db = getDatabase(interaction.guildId);
            const lang = translations[db.get('language')] || translations.fr;
            return interaction.reply({
                content: lang.noPerms,
                flags: MessageFlags.Ephemeral,
            });
        }

        const db = getDatabase(interaction.guildId);
        
        // Vérifier si la langue est configurée
        if (!db.get('language')) {
            return interaction.reply({
                content: translations.fr.noLangSetup,
                flags: MessageFlags.Ephemeral,
            });
        }

        const lang = translations[db.get('language')] || translations.fr;

        const setupEmbed = new EmbedBuilder()
            .setTitle(lang.configureLogs)
            .setDescription(lang.clickToConfigLogs)
            .setColor('#3498DB');

        const setupRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('config-logs')
                .setLabel('Configurer les Logs')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🛠️')
        );

        await interaction.reply({ embeds: [setupEmbed], components: [setupRow], flags: MessageFlags.Ephemeral });
    },
};


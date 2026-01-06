const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { getDatabase } = require('../utils/database');
const translations = require('../config/translations');

module.exports = {
    name: 'loginfo',
    description: 'Informations sur la configuration des logs.',
    async execute(interaction) {
        const db = getDatabase(interaction.guildId);
        const lang = translations[db.get('language')] || translations.fr;

        const logConfig = db.get('logConfig') || [];
        const logChannelId = db.get('logChannel');

        if (logConfig.length === 0 && !logChannelId) {
            return interaction.reply({
                content: lang.logsNotConfigured,
                ephemeral: true,
            });
        }

        const infoEmbed = new EmbedBuilder()
            .setTitle(lang.logInfo)
            .setColor('#9B59B6');

        if (logChannelId) {
            infoEmbed.addFields({
                name: 'Salon de logs',
                value: `<#${logChannelId}>`,
                inline: false
            });
        }

        if (logConfig.length > 0) {
            const enabledLogs = logConfig.map(type => {
                const typeName = type.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                return `• ${typeName}`;
            }).join('\n');

            infoEmbed.addFields({
                name: lang.enabledLogs,
                value: enabledLogs || 'Aucun',
                inline: false
            });
        }

        infoEmbed.addFields({
            name: 'Langue',
            value: db.get('language').toUpperCase(),
            inline: true
        });

        await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
    },
};


const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { getDatabase } = require('../utils/database');
const translations = require('../config/translations');

module.exports = {
    name: 'logs',
    description: 'Affichez les statistiques des logs.',
    async execute(interaction) {
        const db = getDatabase(interaction.guildId);
        const lang = translations[db.get('language')] || translations.fr;
        const stats = db.getStats();

        const statsEmbed = new EmbedBuilder()
            .setTitle(lang.logStats)
            .setColor('#3498DB')
            .addFields(
                { name: lang.totalLogs, value: stats.total.toString(), inline: true },
                { name: lang.todayLogs, value: stats.today.toString(), inline: true },
                { 
                    name: lang.enabledLogs, 
                    value: (db.get('logConfig') || []).length.toString(), 
                    inline: true 
                }
            );

        // Ajouter les stats par type si disponibles
        const typeStats = Object.entries(stats.byType || {});
        if (typeStats.length > 0) {
            const typeStatsText = typeStats
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([type, count]) => `\`${type}\`: ${count}`)
                .join('\n');
            
            statsEmbed.addFields({
                name: 'Par type',
                value: typeStatsText || 'Aucun',
                inline: false
            });
        }

        if (db.get('logChannel')) {
            statsEmbed.addFields({
                name: 'Salon de logs',
                value: `<#${db.get('logChannel')}>`,
                inline: false
            });
        }

        await interaction.reply({ embeds: [statsEmbed], ephemeral: true });
    },
};


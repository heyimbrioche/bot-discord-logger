const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { getDatabase } = require('../utils/database');
const translations = require('../config/translations');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'permissions',
    description: 'Vérifie les permissions du bot sur ce serveur.',
    async execute(interaction) {
        const db = getDatabase(interaction.guildId);
        const lang = translations[db.get('language')] || translations.fr;
        
        const guild = interaction.guild;
        const botMember = guild.members.me;
        
        if (!botMember) {
            return interaction.reply({
                content: '❌ Impossible de récupérer les informations du bot.',
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('🔐 Vérification des Permissions')
            .setColor('#3498DB')
            .setTimestamp();

        // Permissions générales du serveur
        const serverPermissions = botMember.permissions;
        const requiredServerPerms = [
            PermissionFlagsBits.ViewAuditLog
        ];

        const serverPermStatus = requiredServerPerms.map(perm => ({
            name: perm === PermissionFlagsBits.ViewAuditLog ? 'Voir les journaux d\'audit' : 'Autre',
            value: serverPermissions.has(perm) ? '✅' : '❌',
            inline: true
        }));

        embed.addFields({
            name: '🌐 Permissions Serveur',
            value: serverPermStatus.map(s => `${s.value} ${s.name}`).join('\n') || 'Aucune',
            inline: false
        });

        // Permissions dans le salon de logs (si configuré)
        const logChannelId = db.get('logChannel');
        if (logChannelId) {
            const logChannel = guild.channels.cache.get(logChannelId);
            
            if (logChannel) {
                const requiredChannelPerms = PermissionManager.getRequiredLogChannelPermissions();
                const channelPermCheck = PermissionManager.checkBotPermissions(logChannel, requiredChannelPerms);
                
                const channelPermStatus = requiredChannelPerms.map(perm => {
                    let name = 'Autre';
                    if (perm === PermissionFlagsBits.ViewChannel) name = 'Voir le salon';
                    else if (perm === PermissionFlagsBits.SendMessages) name = 'Envoyer des messages';
                    else if (perm === PermissionFlagsBits.EmbedLinks) name = 'Intégrer des liens';
                    else if (perm === PermissionFlagsBits.ReadMessageHistory) name = 'Lire l\'historique';
                    
                    return {
                        name,
                        value: channelPermCheck.all?.has(perm) ? '✅' : '❌',
                        inline: true
                    };
                });

                embed.addFields({
                    name: `📝 Permissions dans ${logChannel.name}`,
                    value: channelPermStatus.map(s => `${s.value} ${s.name}`).join('\n') || 'Aucune',
                    inline: false
                });

                if (!channelPermCheck.has) {
                    embed.addFields({
                        name: '⚠️ Attention',
                        value: `Le bot n'a pas toutes les permissions nécessaires dans <#${logChannelId}>. Les logs peuvent ne pas fonctionner correctement.`,
                        inline: false
                    });
                }
            } else {
                embed.addFields({
                    name: '⚠️ Salon de logs introuvable',
                    value: `Le salon configuré (${logChannelId}) n'existe plus.`,
                    inline: false
                });
            }
        } else {
            embed.addFields({
                name: 'ℹ️ Information',
                value: 'Aucun salon de logs configuré. Utilisez `/loggersetup` pour en configurer un.',
                inline: false
            });
        }

        // Position du bot dans la hiérarchie
        const botRolePosition = botMember.roles.highest.position;
        const totalRoles = guild.roles.cache.size;
        const positionPercent = Math.round((botRolePosition / totalRoles) * 100);

        embed.addFields({
            name: '📊 Position du Bot',
            value: `Position: ${botRolePosition}/${totalRoles} (${positionPercent}%)\n` +
                   `Rôle le plus élevé: ${botMember.roles.highest.name}`,
            inline: false
        });

        if (botRolePosition < 5) {
            embed.addFields({
                name: '⚠️ Position basse',
                value: 'Le bot a une position basse dans la hiérarchie. Assurez-vous qu\'il est au-dessus des rôles qu\'il doit logger.',
                inline: false
            });
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};


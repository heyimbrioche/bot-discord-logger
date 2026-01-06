const { EmbedBuilder, Colors } = require('discord.js');
const { getDatabase } = require('./database');
const translations = require('../config/translations');
const PermissionManager = require('./permissions');

class Logger {
    constructor(client) {
        this.client = client;
    }

    async sendLog(guildId, logType, embedData, options = {}) {
        try {
            const db = getDatabase(guildId);
            const guild = this.client.guilds.cache.get(guildId);
            
            if (!guild) {
                console.warn(`[Logger] Guild ${guildId} introuvable`);
                return false;
            }

            // Vérifier si ce type de log est activé
            const logConfig = db.get('logConfig') || [];
            if (!logConfig.includes(logType)) return false;

            // Obtenir le salon de log
            const logChannelId = db.get('logChannel');
            if (!logChannelId) return false;

            const logChannel = guild.channels.cache.get(logChannelId);
            if (!logChannel) {
                console.warn(`[Logger] Salon ${logChannelId} introuvable pour le serveur ${guildId}`);
                return false;
            }

            // Vérifier les permissions du bot dans le salon
            const requiredPerms = PermissionManager.getRequiredLogChannelPermissions();
            const permCheck = PermissionManager.checkBotPermissions(logChannel, requiredPerms);
            
            if (!permCheck.has) {
                console.warn(`[Logger] Permissions manquantes dans ${logChannel.name} (${guild.name}): ${permCheck.missing.join(', ')}`);
                
                // Notifier l'administrateur une seule fois (optionnel, pour éviter le spam)
                // Vous pouvez implémenter un système de cache pour éviter de spammer
                return false;
            }

            // Créer l'embed
            const embed = this.createEmbed(guildId, logType, embedData);
            
            // Incrémenter les statistiques
            db.incrementLog(logType);

            // Envoyer le log
            await logChannel.send({ embeds: [embed], ...options });
            return true;
        } catch (error) {
            console.error(`Erreur lors de l'envoi du log ${logType} pour ${guildId}:`, error);
            return false;
        }
    }

    createEmbed(guildId, logType, data) {
        const db = getDatabase(guildId);
        const lang = translations[db.get('language')] || translations.fr;
        
        const embed = new EmbedBuilder()
            .setTimestamp()
            .setFooter({ text: `ID: ${data.id || 'N/A'}` });

        // Définir la couleur et le titre selon le type de log
        const logTypes = {
            role_created: { color: Colors.Green, title: lang.roleCreated, icon: '🛡️' },
            role_deleted: { color: Colors.Red, title: lang.roleDeleted, icon: '🚮' },
            role_updated: { color: Colors.Orange, title: lang.roleUpdated, icon: '✏️' },
            channel_created: { color: Colors.Green, title: lang.channelCreated, icon: '🏠' },
            channel_deleted: { color: Colors.Red, title: lang.channelDeleted, icon: '🗑️' },
            channel_updated: { color: Colors.Orange, title: lang.channelUpdated, icon: '🔧' },
            message_deleted: { color: Colors.Red, title: lang.messageDeleted, icon: '🗑️' },
            message_updated: { color: Colors.Orange, title: lang.messageUpdated, icon: '✏️' },
            message_bulk_deleted: { color: Colors.DarkRed, title: lang.messageBulkDeleted, icon: '🗑️' },
            member_joined: { color: Colors.Green, title: lang.memberJoined, icon: '🚪' },
            member_left: { color: Colors.Orange, title: lang.memberLeft, icon: '🏃' },
            member_banned: { color: Colors.Red, title: lang.memberBanned, icon: '🔨' },
            member_unbanned: { color: Colors.Green, title: lang.memberUnbanned, icon: '🎉' },
            guild_updated: { color: Colors.Blue, title: lang.guildUpdated, icon: '🔧' },
        };

        const typeInfo = logTypes[logType] || { color: Colors.Default, title: 'Log', icon: '📋' };
        embed.setColor(typeInfo.color);
        embed.setTitle(`${typeInfo.icon} ${typeInfo.title}`);

        // Ajouter les champs selon les données fournies
        if (data.user) {
            embed.addFields({ 
                name: lang.user, 
                value: `${data.user} (${data.user.id})`, 
                inline: true 
            });
        }

        if (data.executor) {
            embed.addFields({ 
                name: lang.executor, 
                value: `${data.executor} (${data.executor.id})`, 
                inline: true 
            });
        }

        if (data.role) {
            embed.addFields({ 
                name: lang.role, 
                value: `${data.role} (${data.role.id})`, 
                inline: true 
            });
        }

        if (data.channel) {
            embed.addFields({ 
                name: lang.channel, 
                value: `${data.channel} (${data.channel.id})`, 
                inline: true 
            });
        }

        if (data.reason) {
            embed.addFields({ 
                name: lang.reason, 
                value: data.reason || lang.noReason, 
                inline: false 
            });
        }

        if (data.before && data.after) {
            embed.addFields(
                { name: lang.before, value: data.before.substring(0, 1024), inline: true },
                { name: lang.after, value: data.after.substring(0, 1024), inline: true }
            );
        }

        if (data.changes && Array.isArray(data.changes)) {
            data.changes.forEach(change => {
                embed.addFields({
                    name: change.name,
                    value: `**${lang.before}:** ${change.before || lang.noReason}\n**${lang.after}:** ${change.after || lang.noReason}`,
                    inline: false
                });
            });
        }

        if (data.count) {
            embed.addFields({ 
                name: lang.message, 
                value: `${data.count} ${lang.message.toLowerCase()}${data.count > 1 ? 's' : ''}`, 
                inline: true 
            });
        }

        if (data.description) {
            embed.setDescription(data.description);
        }

        if (data.thumbnail) {
            embed.setThumbnail(data.thumbnail);
        } else if (data.user) {
            embed.setThumbnail(data.user.displayAvatarURL({ dynamic: true }));
        }

        return embed;
    }
}

module.exports = Logger;


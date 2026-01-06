const { PermissionFlagsBits } = require('discord.js');
const translations = require('../config/translations');
const { getDatabase } = require('./database');

/**
 * Vérifie les permissions nécessaires pour une action
 */
class PermissionManager {
    /**
     * Vérifie si le bot a les permissions nécessaires dans un salon
     */
    static checkBotPermissions(channel, requiredPermissions) {
        const botMember = channel.guild.members.me;
        if (!botMember) return { has: false, missing: requiredPermissions };

        const channelPermissions = channel.permissionsFor(botMember);
        if (!channelPermissions) return { has: false, missing: requiredPermissions };

        const missing = requiredPermissions.filter(
            perm => !channelPermissions.has(perm)
        );

        return {
            has: missing.length === 0,
            missing: missing,
            all: channelPermissions
        };
    }

    /**
     * Vérifie si un membre a les permissions nécessaires
     */
    static checkMemberPermissions(member, requiredPermissions) {
        if (!member) return { has: false, missing: requiredPermissions };

        const missing = requiredPermissions.filter(
            perm => !member.permissions.has(perm)
        );

        return {
            has: missing.length === 0,
            missing: missing
        };
    }

    /**
     * Vérifie si le bot peut accéder aux audit logs
     */
    static async checkAuditLogAccess(guild) {
        try {
            const botMember = guild.members.me;
            if (!botMember) return false;

            const permissions = guild.members.me.permissions;
            return permissions.has(PermissionFlagsBits.ViewAuditLog);
        } catch (error) {
            return false;
        }
    }

    /**
     * Obtient un message d'erreur formaté pour les permissions manquantes
     */
    static getMissingPermissionsMessage(guildId, missingPermissions, isBot = true) {
        const db = getDatabase(guildId);
        const lang = translations[db.get('language')] || translations.fr;

        const permissionNames = {
            [PermissionFlagsBits.SendMessages]: 'Envoyer des messages',
            [PermissionFlagsBits.EmbedLinks]: 'Intégrer des liens',
            [PermissionFlagsBits.ViewChannel]: 'Voir le salon',
            [PermissionFlagsBits.ViewAuditLog]: 'Voir les journaux d\'audit',
            [PermissionFlagsBits.ReadMessageHistory]: 'Lire l\'historique des messages',
            [PermissionFlagsBits.ManageGuild]: 'Gérer le serveur',
            [PermissionFlagsBits.ManageChannels]: 'Gérer les salons',
            [PermissionFlagsBits.ManageRoles]: 'Gérer les rôles',
        };

        const missingNames = missingPermissions
            .map(perm => permissionNames[perm] || `Permission (${perm})`)
            .join(', ');

        if (isBot) {
            return `❌ Le bot n'a pas les permissions suivantes : **${missingNames}**\n` +
                   `Veuillez donner ces permissions au bot dans les paramètres du serveur.`;
        } else {
            return lang.noPerms + ` Permissions manquantes : **${missingNames}**`;
        }
    }

    /**
     * Permissions requises pour le bot dans le salon de logs
     */
    static getRequiredLogChannelPermissions() {
        return [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.EmbedLinks,
            PermissionFlagsBits.ReadMessageHistory,
        ];
    }

    /**
     * Permissions requises pour utiliser les commandes de configuration
     */
    static getRequiredConfigPermissions() {
        return [
            PermissionFlagsBits.ManageGuild,
        ];
    }

    /**
     * Permissions requises pour accéder aux audit logs
     */
    static getRequiredAuditLogPermissions() {
        return [
            PermissionFlagsBits.ViewAuditLog,
        ];
    }

    /**
     * Récupère les audit logs avec gestion d'erreurs de permissions
     * @param {Guild} guild - Le serveur
     * @param {Object} options - Options pour fetchAuditLogs
     * @returns {Promise<{success: boolean, executor?: User, error?: string}>}
     */
    static async fetchAuditLogsSafe(guild, options) {
        try {
            // Vérifier les permissions d'abord
            const hasPermission = await this.checkAuditLogAccess(guild);
            if (!hasPermission) {
                return {
                    success: false,
                    executor: null,
                    error: 'VIEW_AUDIT_LOG'
                };
            }

            const auditLogs = await guild.fetchAuditLogs(options);
            const executor = auditLogs.entries.first()?.executor;

            return {
                success: true,
                executor: executor || null
            };
        } catch (error) {
            // Si l'erreur est due aux permissions, retourner null silencieusement
            if (error.code === 50013 || error.message.includes('Missing Permissions')) {
                return {
                    success: false,
                    executor: null,
                    error: 'VIEW_AUDIT_LOG'
                };
            }
            
            // Autre erreur, la logger mais ne pas bloquer
            console.warn(`[PermissionManager] Erreur lors de la récupération des audit logs: ${error.message}`);
            return {
                success: false,
                executor: null,
                error: error.message
            };
        }
    }
}

module.exports = PermissionManager;


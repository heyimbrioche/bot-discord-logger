const Logger = require('../utils/logger');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'guildBanRemove',
    async execute(ban, client) {
        const logger = new Logger(client);
        
        try {
            const auditResult = await PermissionManager.fetchAuditLogsSafe(ban.guild, {
                type: 23, // MEMBER_BAN_REMOVE
                limit: 1
            });
            
            const executor = auditResult.executor;
            
            await logger.sendLog(ban.guild.id, 'member_unbanned', {
                user: ban.user,
                executor: executor,
                id: ban.user.id,
                description: `${ban.user.tag} a été débanni du serveur.`
            });
        } catch (error) {
            console.error('Erreur lors du log de unban:', error);
        }
    },
};


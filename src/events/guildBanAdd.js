const Logger = require('../utils/logger');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'guildBanAdd',
    async execute(ban, client) {
        const logger = new Logger(client);
        
        try {
            const auditResult = await PermissionManager.fetchAuditLogsSafe(ban.guild, {
                type: 22, // MEMBER_BAN_ADD
                limit: 1
            });
            
            const executor = auditResult.executor;
            
            await logger.sendLog(ban.guild.id, 'member_banned', {
                user: ban.user,
                executor: executor,
                id: ban.user.id,
                reason: ban.reason || 'Aucune raison fournie',
                description: `${ban.user.tag} a été banni du serveur.`
            });
        } catch (error) {
            console.error('Erreur lors du log de ban:', error);
        }
    },
};


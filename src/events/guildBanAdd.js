const Logger = require('../utils/logger');

module.exports = {
    name: 'guildBanAdd',
    async execute(ban, client) {
        const logger = new Logger(client);
        
        try {
            const auditLogs = await ban.guild.fetchAuditLogs({
                type: 22, // MEMBER_BAN_ADD
                limit: 1
            });
            
            const executor = auditLogs.entries.first()?.executor;
            
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


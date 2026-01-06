const Logger = require('../utils/logger');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        const logger = new Logger(client);
        
        try {
            const auditResult = await PermissionManager.fetchAuditLogsSafe(channel.guild, {
                type: 12, // CHANNEL_DELETE
                limit: 1
            });
            
            await logger.sendLog(channel.guild.id, 'channel_deleted', {
                channel: channel,
                executor: auditResult.executor,
                id: channel.id,
                description: `Salon ${channel.name} supprimé`,
            });
        } catch (error) {
            console.error('Erreur lors du log de suppression de salon:', error);
        }
    },
};


const Logger = require('../utils/logger');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'channelCreate',
    async execute(channel, client) {
        const logger = new Logger(client);
        
        try {
            const auditResult = await PermissionManager.fetchAuditLogsSafe(channel.guild, {
                type: 10, // CHANNEL_CREATE
                limit: 1
            });
            
            await logger.sendLog(channel.guild.id, 'channel_created', {
                channel: channel,
                executor: auditResult.executor,
                id: channel.id,
                description: `Salon ${channel.name} créé`,
            });
        } catch (error) {
            console.error('Erreur lors du log de création de salon:', error);
        }
    },
};


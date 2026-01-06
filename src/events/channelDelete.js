const Logger = require('../utils/logger');

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        const logger = new Logger(client);
        
        try {
            const auditLogs = await channel.guild.fetchAuditLogs({
                type: 12, // CHANNEL_DELETE
                limit: 1
            });
            
            const executor = auditLogs.entries.first()?.executor;
            
            await logger.sendLog(channel.guild.id, 'channel_deleted', {
                channel: channel,
                executor: executor,
                id: channel.id,
                description: `Salon ${channel.name} supprimé`,
            });
        } catch (error) {
            console.error('Erreur lors du log de suppression de salon:', error);
        }
    },
};


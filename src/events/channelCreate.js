const Logger = require('../utils/logger');

module.exports = {
    name: 'channelCreate',
    async execute(channel, client) {
        const logger = new Logger(client);
        
        try {
            const auditLogs = await channel.guild.fetchAuditLogs({
                type: 10, // CHANNEL_CREATE
                limit: 1
            });
            
            const executor = auditLogs.entries.first()?.executor;
            
            await logger.sendLog(channel.guild.id, 'channel_created', {
                channel: channel,
                executor: executor,
                id: channel.id,
                description: `Salon ${channel.name} créé`,
            });
        } catch (error) {
            console.error('Erreur lors du log de création de salon:', error);
        }
    },
};


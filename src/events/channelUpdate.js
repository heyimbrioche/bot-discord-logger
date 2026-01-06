const Logger = require('../utils/logger');

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel, client) {
        const logger = new Logger(client);
        
        try {
            const auditLogs = await newChannel.guild.fetchAuditLogs({
                type: 11, // CHANNEL_UPDATE
                limit: 1
            });
            
            const executor = auditLogs.entries.first()?.executor;
            
            const changes = [];
            
            if (oldChannel.name !== newChannel.name) {
                changes.push({
                    name: 'Nom',
                    before: oldChannel.name,
                    after: newChannel.name
                });
            }
            
            if (oldChannel.topic !== newChannel.topic) {
                changes.push({
                    name: 'Sujet',
                    before: oldChannel.topic || 'Aucun',
                    after: newChannel.topic || 'Aucun'
                });
            }
            
            if (oldChannel.nsfw !== newChannel.nsfw) {
                changes.push({
                    name: 'NSFW',
                    before: oldChannel.nsfw ? 'Oui' : 'Non',
                    after: newChannel.nsfw ? 'Oui' : 'Non'
                });
            }
            
            if (changes.length > 0) {
                await logger.sendLog(newChannel.guild.id, 'channel_updated', {
                    channel: newChannel,
                    executor: executor,
                    id: newChannel.id,
                    description: `Salon ${newChannel.name} modifié`,
                    changes: changes
                });
            }
        } catch (error) {
            console.error('Erreur lors du log de modification de salon:', error);
        }
    },
};


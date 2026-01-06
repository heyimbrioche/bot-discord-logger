const Logger = require('../utils/logger');

module.exports = {
    name: 'messageDeleteBulk',
    async execute(messages, client) {
        const firstMessage = messages.first();
        if (!firstMessage || !firstMessage.guild) return;
        
        const logger = new Logger(client);
        const channel = firstMessage.channel;
        
        await logger.sendLog(firstMessage.guild.id, 'message_bulk_deleted', {
            channel: channel,
            id: channel.id,
            count: messages.size,
            description: `${messages.size} message(s) supprimé(s) en masse dans ${channel}`
        });
    },
};


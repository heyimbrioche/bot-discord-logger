const Logger = require('../utils/logger');

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        // Ignorer les messages des bots et les DMs
        if (message.author?.bot || !message.guild) return;
        
        const logger = new Logger(client);
        
        await logger.sendLog(message.guild.id, 'message_deleted', {
            user: message.author,
            channel: message.channel,
            id: message.id,
            description: `Message supprimé dans ${message.channel}`,
            before: message.content || '(Aucun contenu texte)',
            thumbnail: message.author.displayAvatarURL({ dynamic: true })
        });
    },
};


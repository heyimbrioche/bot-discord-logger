const Logger = require('../utils/logger');

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage, client) {
        // Ignorer les messages des bots et les DMs
        if (newMessage.author?.bot || !newMessage.guild) return;
        
        // Ignorer si le contenu n'a pas changé
        if (oldMessage.content === newMessage.content) return;
        
        const logger = new Logger(client);
        
        await logger.sendLog(newMessage.guild.id, 'message_updated', {
            user: newMessage.author,
            channel: newMessage.channel,
            id: newMessage.id,
            description: `Message modifié dans ${newMessage.channel}`,
            before: oldMessage.content || '(Aucun contenu)',
            after: newMessage.content || '(Aucun contenu)',
            thumbnail: newMessage.author.displayAvatarURL({ dynamic: true })
        });
    },
};


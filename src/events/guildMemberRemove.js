const Logger = require('../utils/logger');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        const logger = new Logger(client);
        
        await logger.sendLog(member.guild.id, 'member_left', {
            user: member.user,
            id: member.user.id,
            description: `${member.user.tag} a quitté le serveur.`,
            thumbnail: member.user.displayAvatarURL({ dynamic: true })
        });
    },
};


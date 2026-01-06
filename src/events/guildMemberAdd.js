const Logger = require('../utils/logger');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const logger = new Logger(client);
        
        await logger.sendLog(member.guild.id, 'member_joined', {
            user: member.user,
            id: member.user.id,
            description: `${member.user.tag} a rejoint le serveur.`,
            thumbnail: member.user.displayAvatarURL({ dynamic: true })
        });
    },
};


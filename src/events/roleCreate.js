const Logger = require('../utils/logger');

module.exports = {
    name: 'roleCreate',
    async execute(role, client) {
        const logger = new Logger(client);
        
        try {
            const auditLogs = await role.guild.fetchAuditLogs({
                type: 30, // ROLE_CREATE
                limit: 1
            });
            
            const executor = auditLogs.entries.first()?.executor;
            
            await logger.sendLog(role.guild.id, 'role_created', {
                role: role,
                executor: executor,
                id: role.id,
                description: `Rôle ${role.name} créé`,
            });
        } catch (error) {
            console.error('Erreur lors du log de création de rôle:', error);
        }
    },
};


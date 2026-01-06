const Logger = require('../utils/logger');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'roleCreate',
    async execute(role, client) {
        const logger = new Logger(client);
        
        try {
            const auditResult = await PermissionManager.fetchAuditLogsSafe(role.guild, {
                type: 30, // ROLE_CREATE
                limit: 1
            });
            
            const executor = auditResult.executor;
            
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


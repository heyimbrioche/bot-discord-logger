const Logger = require('../utils/logger');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'roleDelete',
    async execute(role, client) {
        const logger = new Logger(client);
        
        try {
            const auditResult = await PermissionManager.fetchAuditLogsSafe(role.guild, {
                type: 32, // ROLE_DELETE
                limit: 1
            });
            
            const executor = auditResult.executor;
            
            await logger.sendLog(role.guild.id, 'role_deleted', {
                role: role,
                executor: executor,
                id: role.id,
                description: `Rôle ${role.name} supprimé`,
            });
        } catch (error) {
            console.error('Erreur lors du log de suppression de rôle:', error);
        }
    },
};


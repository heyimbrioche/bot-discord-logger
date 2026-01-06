const Logger = require('../utils/logger');
const PermissionManager = require('../utils/permissions');

module.exports = {
    name: 'roleUpdate',
    async execute(oldRole, newRole, client) {
        const logger = new Logger(client);
        
        try {
            const auditResult = await PermissionManager.fetchAuditLogsSafe(newRole.guild, {
                type: 31, // ROLE_UPDATE
                limit: 1
            });
            
            const executor = auditResult.executor;
            
            const changes = [];
            
            if (oldRole.name !== newRole.name) {
                changes.push({
                    name: 'Nom',
                    before: oldRole.name,
                    after: newRole.name
                });
            }
            
            if (oldRole.color !== newRole.color) {
                changes.push({
                    name: 'Couleur',
                    before: `#${oldRole.color.toString(16).padStart(6, '0')}`,
                    after: `#${newRole.color.toString(16).padStart(6, '0')}`
                });
            }
            
            if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
                changes.push({
                    name: 'Permissions',
                    before: oldRole.permissions.toArray().length + ' permissions',
                    after: newRole.permissions.toArray().length + ' permissions'
                });
            }
            
            if (oldRole.mentionable !== newRole.mentionable) {
                changes.push({
                    name: 'Mentionnable',
                    before: oldRole.mentionable ? 'Oui' : 'Non',
                    after: newRole.mentionable ? 'Oui' : 'Non'
                });
            }
            
            if (oldRole.hoist !== newRole.hoist) {
                changes.push({
                    name: 'Affichage séparé',
                    before: oldRole.hoist ? 'Oui' : 'Non',
                    after: newRole.hoist ? 'Oui' : 'Non'
                });
            }
            
            if (changes.length > 0) {
                await logger.sendLog(newRole.guild.id, 'role_updated', {
                    role: newRole,
                    executor: executor,
                    id: newRole.id,
                    description: `Rôle ${newRole.name} modifié`,
                    changes: changes
                });
            }
        } catch (error) {
            console.error('Erreur lors du log de modification de rôle:', error);
        }
    },
};


const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { getDatabase } = require('../utils/database');
const translations = require('../config/translations');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        try {
            // Gestion des commandes slash
            if (interaction.isCommand()) {
                const commandPath = path.join(__dirname, '../commands', `${interaction.commandName}.js`);
                
                if (fs.existsSync(commandPath)) {
                    const command = require(commandPath);
                    await command.execute(interaction);
                }
            }

            // Gestion des boutons
            if (interaction.isButton()) {
                const db = getDatabase(interaction.guildId);
                const lang = translations[db.get('language')] || translations.fr;

                if (interaction.customId === 'config-logs') {
                    const logSelectionEmbed = new EmbedBuilder()
                        .setTitle(lang.selectLogs)
                        .setDescription(lang.selectLogsDesc)
                        .setColor('#9B59B6');

                    const logRow = new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('select-logs')
                            .setPlaceholder(lang.selectLogsDesc)
                            .setMinValues(1)
                            .setMaxValues(12)
                            .addOptions(
                                { label: lang.roleCreated, value: 'role_created' },
                                { label: lang.roleDeleted, value: 'role_deleted' },
                                { label: lang.roleUpdated, value: 'role_updated' },
                                { label: lang.channelCreated, value: 'channel_created' },
                                { label: lang.channelDeleted, value: 'channel_deleted' },
                                { label: lang.channelUpdated, value: 'channel_updated' },
                                { label: lang.messageDeleted, value: 'message_deleted' },
                                { label: lang.messageUpdated, value: 'message_updated' },
                                { label: lang.memberJoined, value: 'member_joined' },
                                { label: lang.memberLeft, value: 'member_left' },
                                { label: lang.memberBanned, value: 'member_banned' },
                                { label: lang.memberUnbanned, value: 'member_unbanned' }
                            )
                    );

                    await interaction.reply({ embeds: [logSelectionEmbed], components: [logRow], ephemeral: true });
                }
            }

            // Gestion des menus de sélection
            if (interaction.isStringSelectMenu()) {
                const db = getDatabase(interaction.guildId);
                const lang = translations[db.get('language')] || translations.fr;

                // Sélection de la langue
                if (interaction.customId === 'select-language') {
                    const selectedLang = interaction.values[0];
                    db.set('language', selectedLang);
                    await interaction.reply({ 
                        content: `${lang.languageSet}${selectedLang.toUpperCase()}`, 
                        ephemeral: true 
                    });
                }

                // Sélection des types de logs
                if (interaction.customId === 'select-logs') {
                    const selectedLogs = interaction.values;
                    db.set('logConfig', selectedLogs);

                    const availableChannels = interaction.guild.channels.cache
                        .filter(channel => channel.type === ChannelType.GuildText)
                        .map(channel => ({
                            label: channel.name.length > 25 ? channel.name.substring(0, 22) + '...' : channel.name,
                            value: channel.id,
                            description: `Salon: #${channel.name}`
                        }))
                        .slice(0, 25); // Limite Discord

                    if (availableChannels.length === 0) {
                        return interaction.reply({
                            content: '❌ Aucun salon texte disponible sur ce serveur.',
                            ephemeral: true
                        });
                    }

                    const channelSelectionEmbed = new EmbedBuilder()
                        .setTitle(lang.selectLogChannel)
                        .setDescription(lang.selectChannelDesc)
                        .setColor('#FF5733');

                    const channelRow = new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('select-channel')
                            .setPlaceholder(lang.selectChannelDesc)
                            .addOptions(availableChannels)
                    );

                    await interaction.reply({ embeds: [channelSelectionEmbed], components: [channelRow], ephemeral: true });
                }

                // Sélection du salon pour les logs
                if (interaction.customId === 'select-channel') {
                    const selectedChannel = interaction.values[0];
                    db.set('logChannel', selectedChannel);

                    const logChannel = client.channels.cache.get(selectedChannel);
                    const logConfig = db.get('logConfig') || [];
                    
                    const confirmationEmbed = new EmbedBuilder()
                        .setTitle(lang.logsConfigured)
                        .setDescription(`${lang.logsActivated}${logConfig.map(log => `• ${log.replace(/_/g, ' ')}`).join('\n')}`)
                        .setColor('#2ECC71')
                        .setTimestamp();

                    try {
                        await logChannel.send({ embeds: [confirmationEmbed] });
                    } catch (error) {
                        console.error('Erreur lors de l\'envoi du message de confirmation:', error);
                    }

                    await interaction.reply({ 
                        content: `${lang.configSaved}\n${lang.logsActivated}Les logs seront envoyés dans <#${selectedChannel}>`, 
                        ephemeral: true 
                    });
                }
            }
        } catch (error) {
            console.error('Erreur lors de la gestion de l\'interaction:', error);
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ 
                    content: '❌ Une erreur s\'est produite lors du traitement de votre interaction.', 
                    ephemeral: true 
                });
            } else {
                await interaction.reply({ 
                    content: '❌ Une erreur s\'est produite lors du traitement de votre interaction.', 
                    ephemeral: true 
                });
            }
        }
    },
};


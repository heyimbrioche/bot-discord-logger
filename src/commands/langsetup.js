const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { getDatabase } = require('../utils/database');
const translations = require('../config/translations');

module.exports = {
    name: 'langsetup',
    description: 'Configurez la langue pour l\'exécution du bot.',
    async execute(interaction) {
        const db = getDatabase(interaction.guildId);
        const lang = translations[db.get('language')] || translations.fr;

        const languageEmbed = new EmbedBuilder()
            .setTitle(lang.languageSelection)
            .setDescription(lang.selectLanguage)
            .setColor('#00A19D');

        const languageRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select-language')
                .setPlaceholder('Sélectionnez la langue... 🇫🇷 / 🇬🇧')
                .addOptions(
                    { label: 'Français 🇫🇷', value: 'fr' },
                    { label: 'English 🇬🇧', value: 'en' }
                )
        );

        await interaction.reply({ embeds: [languageEmbed], components: [languageRow], ephemeral: true });
    },
};


require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN || '',
    prefix: process.env.BOT_PREFIX || '!',
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'fr',
    dataPath: './data',
};


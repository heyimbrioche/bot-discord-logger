const fs = require('fs');
const path = require('path');
const config = require('../config/config');

// Créer le dossier data s'il n'existe pas
const dataDir = path.resolve(config.dataPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class Database {
    constructor(guildId) {
        this.guildId = guildId;
        this.filePath = path.join(dataDir, `${guildId}.json`);
        this.data = this.load();
    }

    load() {
        try {
            if (fs.existsSync(this.filePath)) {
                const fileData = fs.readFileSync(this.filePath, 'utf8');
                return JSON.parse(fileData);
            }
        } catch (error) {
            console.error(`Erreur lors du chargement des données pour ${this.guildId}:`, error);
        }
        return {
            language: config.defaultLanguage,
            logConfig: [],
            logChannel: null,
            logStats: {
                total: 0,
                today: 0,
                lastReset: new Date().toDateString(),
                byType: {}
            }
        };
    }

    save() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error(`Erreur lors de la sauvegarde des données pour ${this.guildId}:`, error);
            return false;
        }
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        this.save();
    }

    update(key, updater) {
        if (typeof updater === 'function') {
            this.data[key] = updater(this.data[key]);
        } else {
            this.data[key] = updater;
        }
        this.save();
    }

    incrementLog(type) {
        const today = new Date().toDateString();
        
        // Réinitialiser le compteur du jour si nécessaire
        if (this.data.logStats.lastReset !== today) {
            this.data.logStats.today = 0;
            this.data.logStats.lastReset = today;
        }

        this.data.logStats.total++;
        this.data.logStats.today++;
        
        if (!this.data.logStats.byType[type]) {
            this.data.logStats.byType[type] = 0;
        }
        this.data.logStats.byType[type]++;
        
        this.save();
    }

    getStats() {
        return this.data.logStats;
    }
}

// Cache des instances de base de données
const dbCache = new Map();

function getDatabase(guildId) {
    if (!dbCache.has(guildId)) {
        dbCache.set(guildId, new Database(guildId));
    }
    return dbCache.get(guildId);
}

module.exports = { getDatabase, Database };


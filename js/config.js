// Game Configuration
const GameConfig = {
    // Display
    WIDTH: 800,
    HEIGHT: 600,
    PIXEL_SCALE: 2,
    
    // Physics
    GRAVITY: 1000,
    PLAYER_SPEED: 200,
    PLAYER_JUMP: -450,
    PLAYER_DOUBLE_JUMP: -350,
    
    // Game Settings
    INITIAL_LIVES: 3,
    MAX_LIVES: 5,
    TILE_SIZE: 32,
    
    // Collectibles
    PI_COIN_VALUE: 10,
    BREAD_LIFE_VALUE: 1,
    DATES_DURATION: 10000, // 10 seconds double jump boost
    OLIVE_OIL_DURATION: 8000, // 8 seconds power
    
    // Enemies
    ENEMY_SPEED: 50,
    ENEMY_DAMAGE: 1,
    
    // Projectiles
    PROJECTILE_SPEED: 400,
    PROJECTILE_DAMAGE: 1,
    
    // Time bonus
    TIME_BONUS_MULTIPLIER: 10,
    
    // Worlds Configuration
    WORLDS: 6,
    LEVELS_PER_WORLD: 5,
    
    // Colors (Tunisian themed)
    COLORS: {
        PRIMARY: 0xE74C3C,    // Red (Chachiya)
        SECONDARY: 0x3498DB,  // Blue (Sidi Bou Said)
        ACCENT: 0xF39C12,     // Gold/Orange
        SUCCESS: 0x27AE60,    // Green (Olives)
        DANGER: 0xC0392B,     // Dark Red
        SAND: 0xF4D03F,       // Desert sand
        SKY: 0x87CEEB         // Sky blue
    },
    
    // Storage Keys
    STORAGE: {
        PROGRESS: 'sahbi_progress',
        HIGH_SCORES: 'sahbi_scores',
        SETTINGS: 'sahbi_settings',
        PI_DATA: 'sahbi_pi_data',
        ACHIEVEMENTS: 'sahbi_achievements'
    },
    
    // Pi Network
    PI_NETWORK: {
        ENABLED: true,
        COINS_PER_LEVEL: 100,
        SANDBOX_MODE: false // Set to true for testing without Pi Browser
    },
    
    // Audio
    AUDIO: {
        MASTER_VOLUME: 0.7,
        MUSIC_VOLUME: 0.5,
        SFX_VOLUME: 0.8
    }
};

// Achievement definitions
const ACHIEVEMENTS = [
    { id: 'first_steps', name: 'First Steps', description: 'Complete Level 1', icon: '🎯' },
    { id: 'medina_master', name: 'Medina Master', description: 'Complete World 1', icon: '🏛️' },
    { id: 'sidi_explorer', name: 'Sidi Explorer', description: 'Complete World 2', icon: '🏘️' },
    { id: 'desert_warrior', name: 'Desert Warrior', description: 'Complete World 3', icon: '🏜️' },
    { id: 'football_star', name: 'Football Star', description: 'Complete World 4', icon: '⚽' },
    { id: 'olive_farmer', name: 'Olive Farmer', description: 'Complete World 5', icon: '🫒' },
    { id: 'legend', name: 'Tunisian Legend', description: 'Complete all 30 levels', icon: '👑' },
    { id: 'collector', name: 'Collector', description: 'Collect 1000 Pi coins', icon: '🪙' },
    { id: 'speedrunner', name: 'Speedrunner', description: 'Complete any level in under 60s', icon: '⚡' },
    { id: 'immortal', name: 'Immortal', description: 'Complete a world without losing a life', icon: '💪' }
];

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameConfig, ACHIEVEMENTS };
}

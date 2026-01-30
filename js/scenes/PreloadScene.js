// Preload Scene - Generate and load all assets
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Loading text
        this.loadingText = this.add.text(width / 2, height / 2, 'توليد الأصول...', {
            font: '24px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Generate all game assets
        const assetGen = new AssetGenerator(this);
        assetGen.generateAll();
        
        // Create player animations after sprites are generated
        this.createPlayerAnimations();
    }

    createPlayerAnimations() {
        // Idle animation
        const idleFrames = [];
        for (let i = 0; i < 4; i++) {
            idleFrames.push({ key: `player_idle_${i}` });
        }
        this.anims.create({
            key: 'player_idle',
            frames: idleFrames,
            frameRate: 8,
            repeat: -1
        });

        // Run animation
        const runFrames = [];
        for (let i = 0; i < 6; i++) {
            runFrames.push({ key: `player_run_${i}` });
        }
        this.anims.create({
            key: 'player_run',
            frames: runFrames,
            frameRate: 12,
            repeat: -1
        });

        // Jump animation
        this.anims.create({
            key: 'player_jump',
            frames: [{ key: 'player_jump_0' }],
            frameRate: 1
        });

        // Fall animation
        this.anims.create({
            key: 'player_fall',
            frames: [{ key: 'player_fall_0' }],
            frameRate: 1
        });

        // Attack animation
        const attackFrames = [];
        for (let i = 0; i < 4; i++) {
            attackFrames.push({ key: `player_attack_${i}` });
        }
        this.anims.create({
            key: 'player_attack',
            frames: attackFrames,
            frameRate: 10,
            repeat: 0
        });

        // Hurt animation
        const hurtFrames = [];
        for (let i = 0; i < 2; i++) {
            hurtFrames.push({ key: `player_hurt_${i}` });
        }
        this.anims.create({
            key: 'player_hurt',
            frames: hurtFrames,
            frameRate: 8,
            repeat: 2
        });

        // Celebrate animation
        const celebrateFrames = [];
        for (let i = 0; i < 4; i++) {
            celebrateFrames.push({ key: `player_celebrate_${i}` });
        }
        this.anims.create({
            key: 'player_celebrate',
            frames: celebrateFrames,
            frameRate: 8,
            repeat: -1
        });
    }

    create() {
        // Load game progress
        this.loadGameProgress();
        
        // Hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Start menu scene
        this.scene.start('MenuScene');
    }

    loadGameProgress() {
        try {
            const progress = localStorage.getItem(GameConfig.STORAGE.PROGRESS);
            if (progress) {
                this.registry.set('gameProgress', JSON.parse(progress));
            } else {
                // Initialize new progress
                const newProgress = {
                    unlockedWorlds: [1],
                    unlockedLevels: [1],
                    completedLevels: [],
                    scores: {},
                    totalPiCoins: 0,
                    achievements: []
                };
                this.registry.set('gameProgress', newProgress);
                localStorage.setItem(GameConfig.STORAGE.PROGRESS, JSON.stringify(newProgress));
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
}

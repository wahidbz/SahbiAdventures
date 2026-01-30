// UI Scene - Overlay HUD
class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    init(data) {
        this.lives = data.lives || 3;
        this.score = data.score || 0;
        this.piCoins = data.piCoins || 0;
    }

    create() {
        const width = this.cameras.main.width;
        
        // Background panel
        const panel = this.add.rectangle(0, 0, width, 60, 0x000000, 0.7).setOrigin(0);
        
        // Lives display
        this.livesText = this.add.text(20, 10, '', {
            font: 'bold 20px Arial',
            fill: '#E74C3C'
        });
        this.updateLivesDisplay();
        
        // Score display
        this.scoreText = this.add.text(20, 35, `النقاط: ${this.score}`, {
            font: '18px Arial',
            fill: '#F39C12'
        });
        
        // Pi coins display
        this.piCoinsText = this.add.text(width - 150, 20, `🪙 ${this.piCoins}`, {
            font: 'bold 20px Arial',
            fill: '#F39C12'
        });
        
        // Pause button
        const pauseBtn = this.add.text(width - 50, 20, '⏸', {
            font: '24px Arial',
            fill: '#ffffff'
        }).setInteractive();
        
        pauseBtn.on('pointerup', () => {
            this.showPauseMenu();
        });
        
        // Listen for updates from GameScene
        const gameScene = this.scene.get('GameScene');
        gameScene.events.on('updateUI', this.updateUI, this);
    }

    updateUI(data) {
        if (data.lives !== undefined) {
            this.lives = data.lives;
            this.updateLivesDisplay();
        }
        if (data.score !== undefined) {
            this.score = data.score;
            this.scoreText.setText(`النقاط: ${this.score}`);
        }
        if (data.piCoins !== undefined) {
            this.piCoins = data.piCoins;
            this.piCoinsText.setText(`🪙 ${this.piCoins}`);
        }
    }

    updateLivesDisplay() {
        let hearts = '';
        for (let i = 0; i < this.lives; i++) {
            hearts += '❤️ ';
        }
        this.livesText.setText(hearts || '💀');
    }

    showPauseMenu() {
        // Pause game
        this.scene.pause('GameScene');
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dark overlay
        const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8);
        
        // Pause title
        const title = this.add.text(width / 2, height / 2 - 100, 'إيقاف مؤقت', {
            font: 'bold 48px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Resume button
        const resumeBtn = this.createMenuButton(width / 2, height / 2, 'استئناف ▶️', () => {
            overlay.destroy();
            title.destroy();
            resumeBtn.destroy();
            restartBtn.destroy();
            menuBtn.destroy();
            this.scene.resume('GameScene');
        });
        
        // Restart button
        const restartBtn = this.createMenuButton(width / 2, height / 2 + 70, 'إعادة البداية 🔄', () => {
            overlay.destroy();
            title.destroy();
            resumeBtn.destroy();
            restartBtn.destroy();
            menuBtn.destroy();
            this.scene.stop('GameScene');
            const gameScene = this.scene.get('GameScene');
            const level = gameScene.currentLevel;
            this.scene.stop();
            this.scene.start('GameScene', { level: level });
            this.scene.launch('UIScene', { lives: 3, score: 0, piCoins: 0 });
        });
        
        // Menu button
        const menuBtn = this.createMenuButton(width / 2, height / 2 + 140, 'القائمة الرئيسية 🏠', () => {
            this.scene.stop('GameScene');
            this.scene.stop();
            this.scene.start('MenuScene');
        });
    }

    createMenuButton(x, y, text, callback) {
        const button = this.add.container(x, y);
        
        const bg = this.add.rectangle(0, 0, 300, 50, 0xE74C3C);
        bg.setStrokeStyle(3, 0xffffff);
        
        const label = this.add.text(0, 0, text, {
            font: 'bold 20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        button.add([bg, label]);
        button.setSize(300, 50);
        button.setInteractive(new Phaser.Geom.Rectangle(-150, -25, 300, 50), Phaser.Geom.Rectangle.Contains);
        
        button.on('pointerover', () => {
            button.setScale(1.05);
        });
        
        button.on('pointerout', () => {
            button.setScale(1);
        });
        
        button.on('pointerup', callback);
        
        return button;
    }
}

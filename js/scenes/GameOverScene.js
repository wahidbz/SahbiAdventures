// Game Over Scene - Level complete or game over
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.success = data.success;
        this.level = data.level;
        this.score = data.score;
        this.piCoins = data.piCoins;
        this.timeTaken = data.timeTaken;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        const bgColor = this.success ? 0x27AE60 : 0xE74C3C;
        this.add.rectangle(0, 0, width, height, bgColor, 0.3).setOrigin(0);
        this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);
        
        if (this.success) {
            this.showSuccess();
        } else {
            this.showGameOver();
        }
    }

    showSuccess() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Title
        const title = this.add.text(width / 2, 100, '🎉 أحسنت!', {
            font: 'bold 56px Arial',
            fill: '#27AE60',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Animate title
        this.tweens.add({
            targets: title,
            scale: { from: 0, to: 1.2 },
            duration: 500,
            ease: 'Back.easeOut'
        });
        
        // Level info
        this.add.text(width / 2, 180, `المستوى ${this.level.id} مكتمل`, {
            font: 'bold 28px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Stats panel
        const statsY = 250;
        this.createStatLine(width / 2, statsY, '⭐ النقاط', this.score);
        this.createStatLine(width / 2, statsY + 50, '🪙 عملات Pi', this.piCoins);
        if (this.timeTaken) {
            this.createStatLine(width / 2, statsY + 100, '⏱ الوقت', `${this.timeTaken}s`);
        }
        
        // Rating stars
        const stars = this.calculateStars();
        const starText = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
        this.add.text(width / 2, statsY + 160, starText, {
            font: '40px Arial'
        }).setOrigin(0.5);
        
        // Buttons
        this.createButton(width / 2 - 120, height - 100, 'المستوى التالي ➡️', () => {
            const nextLevelId = this.level.id + 1;
            if (nextLevelId <= 30) {
                // Load next level from world data
                const worldsData = this.cache.json.get('worldsData');
                let nextLevel = null;
                worldsData.worlds.forEach(world => {
                    world.levels.forEach(level => {
                        if (level.id === nextLevelId) {
                            nextLevel = level;
                        }
                    });
                });
                if (nextLevel) {
                    this.scene.start('GameScene', { level: nextLevel });
                } else {
                    this.scene.start('WorldSelectScene');
                }
            } else {
                this.showVictoryScreen();
            }
        });
        
        this.createButton(width / 2 + 120, height - 100, 'القائمة 🏠', () => {
            this.scene.start('MenuScene');
        });
    }

    showGameOver() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Title
        const title = this.add.text(width / 2, 150, '💔 خسارة', {
            font: 'bold 56px Arial',
            fill: '#E74C3C',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Message
        this.add.text(width / 2, 250, 'حاول مرة أخرى!', {
            font: '28px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Score
        this.add.text(width / 2, 320, `النقاط: ${this.score}`, {
            font: 'bold 24px Arial',
            fill: '#F39C12'
        }).setOrigin(0.5);
        
        // Buttons
        this.createButton(width / 2 - 120, height - 100, 'إعادة المحاولة 🔄', () => {
            this.scene.start('GameScene', { level: this.level });
        });
        
        this.createButton(width / 2 + 120, height - 100, 'القائمة 🏠', () => {
            this.scene.start('MenuScene');
        });
    }

    calculateStars() {
        // Simple star rating based on score and time
        const baseScore = 500;
        const maxTime = 120;
        
        let stars = 1;
        if (this.score > baseScore * 1.5) stars = 2;
        if (this.score > baseScore * 2 && this.timeTaken < maxTime / 2) stars = 3;
        
        return stars;
    }

    createStatLine(x, y, label, value) {
        const text = this.add.text(x, y, `${label}: ${value}`, {
            font: 'bold 22px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);
        
        // Animate appearance
        text.setAlpha(0);
        this.tweens.add({
            targets: text,
            alpha: 1,
            duration: 300,
            delay: y / 2
        });
    }

    createButton(x, y, text, callback) {
        const button = this.add.container(x, y);
        
        const bg = this.add.rectangle(0, 0, 200, 50, 0xffffff);
        bg.setStrokeStyle(3, 0xE74C3C);
        
        const label = this.add.text(0, 0, text, {
            font: 'bold 16px Arial',
            fill: '#E74C3C'
        }).setOrigin(0.5);
        
        button.add([bg, label]);
        button.setSize(200, 50);
        button.setInteractive(new Phaser.Geom.Rectangle(-100, -25, 200, 50), Phaser.Geom.Rectangle.Contains);
        
        button.on('pointerover', () => {
            bg.setFillStyle(0xE74C3C);
            label.setFill('#ffffff');
            button.setScale(1.05);
        });
        
        button.on('pointerout', () => {
            bg.setFillStyle(0xffffff);
            label.setFill('#E74C3C');
            button.setScale(1);
        });
        
        button.on('pointerup', callback);
        
        return button;
    }

    showVictoryScreen() {
        // Complete game victory
        this.children.removeAll();
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        this.add.rectangle(0, 0, width, height, 0xF39C12).setOrigin(0);
        
        const victory = this.add.text(width / 2, height / 2 - 80, '👑 تونسي أسطوري! 👑', {
            font: 'bold 48px Arial',
            fill: '#ffffff',
            stroke: '#E74C3C',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);
        
        this.add.text(width / 2, height / 2, 'لقد أكملت جميع المستويات!', {
            font: '28px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        const totalPiCoins = piNetwork.getPiCoins();
        this.add.text(width / 2, height / 2 + 60, `إجمالي عملات Pi: ${totalPiCoins} 🪙`, {
            font: 'bold 24px Arial',
            fill: '#F39C12',
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);
        
        this.createButton(width / 2, height / 2 + 140, 'العودة للقائمة 🏠', () => {
            this.scene.start('MenuScene');
        });
    }
}

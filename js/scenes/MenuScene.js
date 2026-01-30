// Menu Scene - Main menu
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        this.add.rectangle(0, 0, width, height, 0xE74C3C).setOrigin(0);
        
        // Add decorative elements
        this.createDecorations();
        
        // Title
        const title = this.add.text(width / 2, 100, 'Sahbi Adventures', {
            font: 'bold 48px Arial',
            fill: '#ffffff',
            stroke: '#C0392B',
            strokeThickness: 6
        }).setOrigin(0.5);
        
        // Subtitle with flag
        const subtitle = this.add.text(width / 2, 160, '🇹🇳 The Tunisian Platformer', {
            font: '24px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Authenticate with Pi Network
        this.authenticateUser();
        
        // User info display
        this.userText = this.add.text(width / 2, 220, '', {
            font: '18px Arial',
            fill: '#FFF'
        }).setOrigin(0.5);
        
        // Pi coins display
        this.piCoinsText = this.add.text(width / 2, 250, '', {
            font: '20px Arial',
            fill: '#F39C12'
        }).setOrigin(0.5);
        
        // Buttons
        this.createButton(width / 2, 320, 'ابدأ اللعب', () => {
            this.scene.start('WorldSelectScene');
        });
        
        this.createButton(width / 2, 390, 'الإنجازات', () => {
            this.showAchievements();
        });
        
        this.createButton(width / 2, 460, 'الإعدادات', () => {
            this.showSettings();
        });
        
        // Credits
        this.add.text(width / 2, height - 30, 'Made with ❤️ in Tunisia', {
            font: '14px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Version
        this.add.text(10, height - 20, 'v1.0.0', {
            font: '12px Arial',
            fill: '#ffffff'
        });
    }

    async authenticateUser() {
        const user = await piNetwork.authenticate();
        if (user) {
            this.userText.setText(`مرحبا ${user.username} 👋`);
            this.piCoinsText.setText(`🪙 ${piNetwork.getPiCoins()} Pi Coins`);
        }
    }

    createDecorations() {
        // Add some olive branches decoration
        const graphics = this.add.graphics();
        graphics.fillStyle(0x27AE60, 0.3);
        
        // Left olive branch
        for (let i = 0; i < 5; i++) {
            graphics.fillCircle(50 + i * 10, 100 + i * 15, 8);
            graphics.fillCircle(30 + i * 10, 120 + i * 15, 8);
        }
        
        // Right olive branch
        for (let i = 0; i < 5; i++) {
            graphics.fillCircle(750 - i * 10, 100 + i * 15, 8);
            graphics.fillCircle(770 - i * 10, 120 + i * 15, 8);
        }
    }

    createButton(x, y, text, callback) {
        const button = this.add.container(x, y);
        
        // Button background
        const bg = this.add.rectangle(0, 0, 250, 50, 0xFFFFFF, 0.9);
        bg.setStrokeStyle(3, 0xC0392B);
        
        // Button text
        const label = this.add.text(0, 0, text, {
            font: 'bold 20px Arial',
            fill: '#E74C3C'
        }).setOrigin(0.5);
        
        button.add([bg, label]);
        button.setSize(250, 50);
        button.setInteractive(new Phaser.Geom.Rectangle(-125, -25, 250, 50), Phaser.Geom.Rectangle.Contains);
        
        // Hover effect
        button.on('pointerover', () => {
            bg.setFillStyle(0xE74C3C);
            label.setFill('#ffffff');
            button.setScale(1.05);
        });
        
        button.on('pointerout', () => {
            bg.setFillStyle(0xFFFFFF, 0.9);
            label.setFill('#E74C3C');
            button.setScale(1);
        });
        
        button.on('pointerdown', () => {
            button.setScale(0.95);
        });
        
        button.on('pointerup', () => {
            button.setScale(1.05);
            callback();
        });
        
        return button;
    }

    showAchievements() {
        const progress = this.registry.get('gameProgress');
        const achievements = progress.achievements || [];
        
        const modal = this.add.container(400, 300);
        const bg = this.add.rectangle(0, 0, 600, 400, 0x000000, 0.9);
        
        const title = this.add.text(0, -150, 'الإنجازات 🏆', {
            font: 'bold 32px Arial',
            fill: '#F39C12'
        }).setOrigin(0.5);
        
        let yPos = -100;
        ACHIEVEMENTS.forEach(ach => {
            const unlocked = achievements.includes(ach.id);
            const achText = this.add.text(-250, yPos, 
                `${ach.icon} ${ach.name}${unlocked ? ' ✓' : ' 🔒'}`, {
                font: '16px Arial',
                fill: unlocked ? '#27AE60' : '#7F8C8D'
            });
            yPos += 30;
            modal.add(achText);
        });
        
        modal.add([bg, title]);
        
        // Close button
        const closeBtn = this.add.text(0, 150, 'إغلاق', {
            font: 'bold 20px Arial',
            fill: '#E74C3C',
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        
        closeBtn.on('pointerup', () => {
            modal.destroy();
        });
        
        modal.add(closeBtn);
    }

    showSettings() {
        const modal = this.add.container(400, 300);
        const bg = this.add.rectangle(0, 0, 500, 350, 0x000000, 0.9);
        
        const title = this.add.text(0, -130, 'الإعدادات ⚙️', {
            font: 'bold 32px Arial',
            fill: '#3498DB'
        }).setOrigin(0.5);
        
        // Sound settings
        this.add.text(0, -70, 'الصوت 🔊', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Language settings
        this.add.text(0, -10, 'اللغة: العربية 🇹🇳', {
            font: '18px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Reset progress button
        const resetBtn = this.add.text(0, 60, 'إعادة تعيين التقدم', {
            font: '18px Arial',
            fill: '#E74C3C',
            backgroundColor: '#ffffff',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();
        
        resetBtn.on('pointerup', () => {
            if (confirm('هل أنت متأكد من إعادة تعيين كل التقدم؟')) {
                localStorage.clear();
                location.reload();
            }
        });
        
        modal.add([bg, title, resetBtn]);
        
        // Close button
        const closeBtn = this.add.text(0, 120, 'إغلاق', {
            font: 'bold 20px Arial',
            fill: '#27AE60',
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        
        closeBtn.on('pointerup', () => {
            modal.destroy();
        });
        
        modal.add(closeBtn);
    }
}

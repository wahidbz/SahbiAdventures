// World Select Scene - Choose world and level
class WorldSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldSelectScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        this.add.rectangle(0, 0, width, height, 0x3498DB).setOrigin(0);
        
        // Title
        this.add.text(width / 2, 50, 'اختر العالم', {
            font: 'bold 36px Arial',
            fill: '#ffffff',
            stroke: '#2980B9',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Load worlds data
        const worldsData = this.cache.json.get('worldsData');
        const progress = this.registry.get('gameProgress');
        
        // Create world buttons
        const worldsPerRow = 3;
        const startX = 150;
        const startY = 150;
        const spacingX = 220;
        const spacingY = 200;
        
        worldsData.worlds.forEach((world, index) => {
            const col = index % worldsPerRow;
            const row = Math.floor(index / worldsPerRow);
            const x = startX + col * spacingX;
            const y = startY + row * spacingY;
            
            const isUnlocked = progress.unlockedWorlds.includes(world.id);
            this.createWorldButton(x, y, world, isUnlocked);
        });
        
        // Back button
        this.createBackButton();
    }

    createWorldButton(x, y, world, isUnlocked) {
        const button = this.add.container(x, y);
        
        // World icon background
        const iconBg = this.add.circle(0, 0, 50, isUnlocked ? world.color : 0x95A5A6);
        
        // World icon
        const icon = this.add.text(0, 0, world.icon, {
            font: '40px Arial'
        }).setOrigin(0.5);
        
        // World name
        const name = this.add.text(0, 70, world.nameAr, {
            font: 'bold 16px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Lock icon if locked
        if (!isUnlocked) {
            const lock = this.add.text(0, 0, '🔒', {
                font: '30px Arial'
            }).setOrigin(0.5);
            button.add(lock);
        }
        
        button.add([iconBg, icon, name]);
        
        if (isUnlocked) {
            button.setSize(100, 100);
            button.setInteractive(new Phaser.Geom.Circle(0, 0, 50), Phaser.Geom.Circle.Contains);
            
            button.on('pointerover', () => {
                button.setScale(1.1);
            });
            
            button.on('pointerout', () => {
                button.setScale(1);
            });
            
            button.on('pointerup', () => {
                this.showLevelSelect(world);
            });
        }
        
        return button;
    }

    showLevelSelect(world) {
        // Clear current scene
        this.children.removeAll();
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background with world color
        this.add.rectangle(0, 0, width, height, world.color).setOrigin(0).setAlpha(0.3);
        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0).setAlpha(0.7);
        
        // World title
        this.add.text(width / 2, 50, `${world.icon} ${world.nameAr}`, {
            font: 'bold 32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // World description
        this.add.text(width / 2, 100, world.descriptionAr, {
            font: '16px Arial',
            fill: '#ffffff',
            wordWrap: { width: 600 },
            align: 'center'
        }).setOrigin(0.5);
        
        // Level buttons
        const progress = this.registry.get('gameProgress');
        const levelsPerRow = 5;
        const startX = 180;
        const startY = 180;
        const spacingX = 120;
        const spacingY = 100;
        
        world.levels.forEach((level, index) => {
            const col = index % levelsPerRow;
            const row = Math.floor(index / levelsPerRow);
            const x = startX + col * spacingX;
            const y = startY + row * spacingY;
            
            const isUnlocked = progress.unlockedLevels.includes(level.id);
            const isCompleted = progress.completedLevels.includes(level.id);
            
            this.createLevelButton(x, y, level, isUnlocked, isCompleted);
        });
        
        // Back button
        this.createBackButton();
    }

    createLevelButton(x, y, level, isUnlocked, isCompleted) {
        const button = this.add.container(x, y);
        
        // Level background
        let bgColor = 0x95A5A6; // Locked
        if (isCompleted) bgColor = 0x27AE60; // Completed
        else if (isUnlocked) bgColor = 0x3498DB; // Unlocked
        
        const bg = this.add.circle(0, 0, 30, bgColor);
        
        // Level number
        const number = this.add.text(0, 0, level.id.toString(), {
            font: 'bold 20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Star rating if completed
        if (isCompleted) {
            const star = this.add.text(0, -40, '⭐', {
                font: '16px Arial'
            }).setOrigin(0.5);
            button.add(star);
        }
        
        // Lock if locked
        if (!isUnlocked) {
            const lock = this.add.text(0, 0, '🔒', {
                font: '20px Arial'
            }).setOrigin(0.5);
            button.add(lock);
        }
        
        button.add([bg, number]);
        
        if (isUnlocked) {
            button.setSize(60, 60);
            button.setInteractive(new Phaser.Geom.Circle(0, 0, 30), Phaser.Geom.Circle.Contains);
            
            button.on('pointerover', () => {
                button.setScale(1.2);
            });
            
            button.on('pointerout', () => {
                button.setScale(1);
            });
            
            button.on('pointerup', () => {
                // Start the level
                this.registry.set('currentLevel', level);
                this.scene.start('GameScene', { level: level });
            });
        }
        
        return button;
    }

    createBackButton() {
        const backBtn = this.add.text(30, 30, '← رجوع', {
            font: 'bold 24px Arial',
            fill: '#ffffff',
            backgroundColor: '#E74C3C',
            padding: { x: 15, y: 8 }
        }).setInteractive();
        
        backBtn.on('pointerover', () => {
            backBtn.setScale(1.1);
        });
        
        backBtn.on('pointerout', () => {
            backBtn.setScale(1);
        });
        
        backBtn.on('pointerup', () => {
            this.scene.start('MenuScene');
        });
    }
}

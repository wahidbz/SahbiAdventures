// Game Scene - Main gameplay scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.currentLevel = data.level;
        this.lives = GameConfig.INITIAL_LIVES;
        this.score = 0;
        this.piCoins = 0;
        this.hasDoubleJump = false;
        this.hasPowerUp = false;
        this.canDoubleJump = true;
        this.startTime = Date.now();
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        const bgKey = this.getBgKeyForWorld(this.currentLevel.worldId);
        this.add.image(width / 2, height / 2, bgKey);
        
        // Physics
        this.physics.world.gravity.y = GameConfig.GRAVITY;
        
        // Create level
        this.createLevel();
        
        // Create player
        this.createPlayer();
        
        // Create groups
        this.createGroups();
        
        // Create enemies
        this.createEnemies();
        
        // Create collectibles
        this.createCollectibles();
        
        // Input
        this.setupInput();
        
        // Collisions
        this.setupCollisions();
        
        // UI Scene
        this.scene.launch('UIScene', { 
            lives: this.lives, 
            score: this.score,
            piCoins: this.piCoins
        });
        
        // Camera
        this.cameras.main.setBounds(0, 0, width * 2, height);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    getBgKeyForWorld(worldId) {
        const bgMap = {
            1: 'bg_medina',
            2: 'bg_sidi',
            3: 'bg_desert',
            4: 'bg_stadium',
            5: 'bg_olive',
            6: 'bg_mixed'
        };
        return bgMap[worldId] || 'bg_medina';
    }

    createLevel() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        
        // Get tile type based on world
        const tileKey = this.getTileKeyForWorld(this.currentLevel.worldId);
        
        // Generate platforms based on level layout
        const layout = this.currentLevel.layout;
        layout.forEach(platform => {
            const plat = this.platforms.create(
                platform.x, 
                platform.y, 
                tileKey
            );
            plat.setScale(platform.width / 32, platform.height / 32);
            plat.refreshBody();
        });
        
        // Ground
        for (let x = 0; x < width * 2; x += 32) {
            this.platforms.create(x, height - 16, tileKey);
        }
        
        // Goal/Flag at end
        this.goal = this.physics.add.sprite(
            this.currentLevel.goalX || width * 2 - 100,
            height - 100,
            'item_pi_coin'
        );
        this.goal.setScale(2);
        this.goal.setTint(0x27AE60);
    }

    getTileKeyForWorld(worldId) {
        const tileMap = {
            1: 'tile_stone',
            2: 'tile_blue',
            3: 'tile_sand',
            4: 'tile_stadium',
            5: 'tile_grass',
            6: 'tile_stone'
        };
        return tileMap[worldId] || 'tile_stone';
    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 400, 'player_idle_0');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(24, 30);
        
        // Player state
        this.player.isAttacking = false;
        this.player.isHurt = false;
        this.player.jumpCount = 0;
        
        // Play idle animation
        this.player.play('player_idle');
    }

    createGroups() {
        this.enemies = this.physics.add.group();
        this.collectibles = this.physics.add.group();
        this.projectiles = this.physics.add.group();
    }

    createEnemies() {
        const enemyData = this.currentLevel.enemies || [];
        
        enemyData.forEach(enemy => {
            let sprite;
            if (enemy.type === 'rodent') {
                sprite = this.enemies.create(enemy.x, enemy.y, 'enemy_rodent');
                sprite.enemyType = 'rodent';
            } else if (enemy.type === 'bird') {
                sprite = this.enemies.create(enemy.x, enemy.y, 'enemy_bird');
                sprite.enemyType = 'bird';
            } else if (enemy.type === 'guard') {
                sprite = this.enemies.create(enemy.x, enemy.y, 'enemy_guard');
                sprite.enemyType = 'guard';
            }
            
            if (sprite) {
                sprite.setVelocityX(enemy.speed || GameConfig.ENEMY_SPEED);
                sprite.direction = 1;
                sprite.startX = enemy.x;
                sprite.patrolRange = enemy.patrolRange || 200;
            }
        });
    }

    createCollectibles() {
        const items = this.currentLevel.collectibles || [];
        
        items.forEach(item => {
            let sprite;
            if (item.type === 'pi_coin') {
                sprite = this.collectibles.create(item.x, item.y, 'item_pi_coin');
                sprite.itemType = 'pi_coin';
            } else if (item.type === 'bread') {
                sprite = this.collectibles.create(item.x, item.y, 'item_bread');
                sprite.itemType = 'bread';
            } else if (item.type === 'dates') {
                sprite = this.collectibles.create(item.x, item.y, 'item_dates');
                sprite.itemType = 'dates';
            } else if (item.type === 'olive_oil') {
                sprite = this.collectibles.create(item.x, item.y, 'item_olive_oil');
                sprite.itemType = 'olive_oil';
            }
            
            if (sprite) {
                // Floating animation
                this.tweens.add({
                    targets: sprite,
                    y: sprite.y - 10,
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });
    }

    setupInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        };
        
        // Touch controls
        this.input.on('pointerdown', (pointer) => {
            if (pointer.x < this.cameras.main.width / 3) {
                // Left side - move left
                this.touchLeft = true;
            } else if (pointer.x > this.cameras.main.width * 2 / 3) {
                // Right side - move right
                this.touchRight = true;
            } else if (pointer.y > this.cameras.main.height * 2 / 3) {
                // Bottom middle - attack
                this.attack();
            } else {
                // Middle - jump
                this.jump();
            }
        });
        
        this.input.on('pointerup', () => {
            this.touchLeft = false;
            this.touchRight = false;
        });
    }

    setupCollisions() {
        // Player vs platforms
        this.physics.add.collider(this.player, this.platforms, () => {
            if (this.player.body.touching.down) {
                this.player.jumpCount = 0;
                this.canDoubleJump = true;
            }
        });
        
        // Player vs collectibles
        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);
        
        // Player vs enemies
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        
        // Player vs goal
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);
        
        // Projectiles vs enemies
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemyWithProjectile, null, this);
        
        // Enemies vs platforms
        this.physics.add.collider(this.enemies, this.platforms);
    }

    update() {
        if (!this.player || this.player.isHurt) return;
        
        // Movement
        if (this.cursors.left.isDown || this.touchLeft) {
            this.player.setVelocityX(-GameConfig.PLAYER_SPEED);
            this.player.flipX = true;
            if (this.player.body.touching.down) {
                this.player.play('player_run', true);
            }
        } else if (this.cursors.right.isDown || this.touchRight) {
            this.player.setVelocityX(GameConfig.PLAYER_SPEED);
            this.player.flipX = false;
            if (this.player.body.touching.down) {
                this.player.play('player_run', true);
            }
        } else {
            this.player.setVelocityX(0);
            if (this.player.body.touching.down && !this.player.isAttacking) {
                this.player.play('player_idle', true);
            }
        }
        
        // Jump
        if (Phaser.Input.Keyboard.JustDown(this.keys.jump)) {
            this.jump();
        }
        
        // Attack
        if (Phaser.Input.Keyboard.JustDown(this.keys.attack)) {
            this.attack();
        }
        
        // Update animations
        if (this.player.body.velocity.y < 0) {
            this.player.play('player_jump', true);
        } else if (this.player.body.velocity.y > 0 && !this.player.body.touching.down) {
            this.player.play('player_fall', true);
        }
        
        // Update enemies
        this.updateEnemies();
        
        // Clean up projectiles
        this.projectiles.children.entries.forEach(proj => {
            if (proj.x < 0 || proj.x > this.cameras.main.scrollX + this.cameras.main.width + 100) {
                proj.destroy();
            }
        });
    }

    jump() {
        if (this.player.body.touching.down) {
            this.player.setVelocityY(GameConfig.PLAYER_JUMP);
            this.player.jumpCount = 1;
        } else if (this.hasDoubleJump && this.canDoubleJump && this.player.jumpCount === 1) {
            this.player.setVelocityY(GameConfig.PLAYER_DOUBLE_JUMP);
            this.player.jumpCount = 2;
            this.canDoubleJump = false;
        }
    }

    attack() {
        if (this.player.isAttacking) return;
        
        this.player.isAttacking = true;
        this.player.play('player_attack');
        
        // Create projectile
        const projectile = this.projectiles.create(
            this.player.x + (this.player.flipX ? -20 : 20),
            this.player.y,
            'projectile_olive'
        );
        projectile.setVelocityX(this.player.flipX ? -GameConfig.PROJECTILE_SPEED : GameConfig.PROJECTILE_SPEED);
        
        this.time.delayedCall(400, () => {
            this.player.isAttacking = false;
        });
    }

    updateEnemies() {
        this.enemies.children.entries.forEach(enemy => {
            // Patrol behavior
            if (Math.abs(enemy.x - enemy.startX) > enemy.patrolRange) {
                enemy.direction *= -1;
                enemy.setVelocityX(GameConfig.ENEMY_SPEED * enemy.direction);
                enemy.flipX = enemy.direction < 0;
            }
        });
    }

    collectItem(player, item) {
        item.destroy();
        
        switch(item.itemType) {
            case 'pi_coin':
                this.piCoins += 1;
                this.score += GameConfig.PI_COIN_VALUE;
                break;
            case 'bread':
                this.lives = Math.min(this.lives + 1, GameConfig.MAX_LIVES);
                break;
            case 'dates':
                this.hasDoubleJump = true;
                this.time.delayedCall(GameConfig.DATES_DURATION, () => {
                    this.hasDoubleJump = false;
                });
                break;
            case 'olive_oil':
                this.hasPowerUp = true;
                this.player.setTint(0xF39C12);
                this.time.delayedCall(GameConfig.OLIVE_OIL_DURATION, () => {
                    this.hasPowerUp = false;
                    this.player.clearTint();
                });
                break;
        }
        
        // Update UI
        this.events.emit('updateUI', { lives: this.lives, score: this.score, piCoins: this.piCoins });
    }

    hitEnemy(player, enemy) {
        if (this.hasPowerUp) {
            enemy.destroy();
            return;
        }
        
        if (player.isHurt) return;
        
        player.isHurt = true;
        player.play('player_hurt');
        player.setVelocity(0, -200);
        player.setTint(0xFF0000);
        
        this.lives--;
        this.events.emit('updateUI', { lives: this.lives, score: this.score, piCoins: this.piCoins });
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.time.delayedCall(1000, () => {
                player.isHurt = false;
                player.clearTint();
            });
        }
    }

    hitEnemyWithProjectile(projectile, enemy) {
        projectile.destroy();
        enemy.destroy();
        this.score += 50;
        this.events.emit('updateUI', { lives: this.lives, score: this.score, piCoins: this.piCoins });
    }

    reachGoal(player, goal) {
        this.levelComplete();
    }

    levelComplete() {
        this.player.setVelocity(0, 0);
        this.player.play('player_celebrate');
        
        // Calculate time bonus
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        const timeBonus = Math.max(0, (120 - timeTaken) * GameConfig.TIME_BONUS_MULTIPLIER);
        this.score += timeBonus;
        
        // Add Pi coins to account
        piNetwork.addPiCoins(this.piCoins);
        
        // Save progress
        this.saveProgress();
        
        // Show completion screen
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOverScene', {
                success: true,
                level: this.currentLevel,
                score: this.score,
                piCoins: this.piCoins,
                timeTaken: timeTaken
            });
        });
    }

    gameOver() {
        this.scene.start('GameOverScene', {
            success: false,
            level: this.currentLevel,
            score: this.score,
            piCoins: this.piCoins
        });
    }

    saveProgress() {
        const progress = this.registry.get('gameProgress');
        
        // Mark level as completed
        if (!progress.completedLevels.includes(this.currentLevel.id)) {
            progress.completedLevels.push(this.currentLevel.id);
        }
        
        // Unlock next level
        const nextLevelId = this.currentLevel.id + 1;
        if (nextLevelId <= 30 && !progress.unlockedLevels.includes(nextLevelId)) {
            progress.unlockedLevels.push(nextLevelId);
            
            // Unlock next world if needed
            const nextWorldId = Math.ceil(nextLevelId / 5);
            if (!progress.unlockedWorlds.includes(nextWorldId)) {
                progress.unlockedWorlds.push(nextWorldId);
            }
        }
        
        // Save score
        progress.scores[this.currentLevel.id] = Math.max(
            progress.scores[this.currentLevel.id] || 0,
            this.score
        );
        
        // Update total coins
        progress.totalPiCoins = (progress.totalPiCoins || 0) + this.piCoins;
        
        // Check achievements
        this.checkAchievements(progress);
        
        // Save to storage
        this.registry.set('gameProgress', progress);
        localStorage.setItem(GameConfig.STORAGE.PROGRESS, JSON.stringify(progress));
    }

    checkAchievements(progress) {
        // First steps
        if (progress.completedLevels.includes(1) && !progress.achievements.includes('first_steps')) {
            progress.achievements.push('first_steps');
        }
        
        // World completions
        const worldAchievements = [
            { id: 'medina_master', levels: [1,2,3,4,5] },
            { id: 'sidi_explorer', levels: [6,7,8,9,10] },
            { id: 'desert_warrior', levels: [11,12,13,14,15] },
            { id: 'football_star', levels: [16,17,18,19,20] },
            { id: 'olive_farmer', levels: [21,22,23,24,25] }
        ];
        
        worldAchievements.forEach(ach => {
            if (ach.levels.every(l => progress.completedLevels.includes(l)) && 
                !progress.achievements.includes(ach.id)) {
                progress.achievements.push(ach.id);
            }
        });
        
        // Legend - all levels
        if (progress.completedLevels.length === 30 && !progress.achievements.includes('legend')) {
            progress.achievements.push('legend');
        }
        
        // Collector
        if (progress.totalPiCoins >= 1000 && !progress.achievements.includes('collector')) {
            progress.achievements.push('collector');
        }
    }
}

// Asset Generator - Creates placeholder graphics using Canvas
class AssetGenerator {
    constructor(scene) {
        this.scene = scene;
    }

    // Generate player sprite sheets
    generatePlayerSprites() {
        const width = 32;
        const height = 32;
        const frames = {
            idle: 4,
            run: 6,
            jump: 1,
            fall: 1,
            attack: 4,
            hurt: 2,
            celebrate: 4
        };

        for (let [anim, frameCount] of Object.entries(frames)) {
            for (let i = 0; i < frameCount; i++) {
                const texture = this.scene.textures.createCanvas(`player_${anim}_${i}`, width, height);
                const ctx = texture.getContext();
                
                ctx.clearRect(0, 0, width, height);
                
                // Body (tunisian boy)
                ctx.fillStyle = '#F4A460'; // Skin tone
                ctx.fillRect(12, 10, 8, 10); // Head
                
                // Red Chachiya (traditional hat)
                ctx.fillStyle = '#E74C3C';
                ctx.fillRect(10, 6, 12, 5); // Hat
                ctx.fillStyle = '#C0392B';
                ctx.fillRect(14, 4, 4, 3); // Hat top/tassel
                
                // Eyes
                ctx.fillStyle = '#000';
                ctx.fillRect(14, 13, 2, 2);
                ctx.fillRect(18, 13, 2, 2);
                
                // Body
                ctx.fillStyle = '#3498DB'; // Blue shirt
                ctx.fillRect(10, 20, 12, 8);
                
                // Arms (vary by animation)
                if (anim === 'run' && i % 2 === 0) {
                    ctx.fillRect(8, 22, 2, 6); // Left arm forward
                    ctx.fillRect(22, 22, 2, 6); // Right arm back
                } else if (anim === 'attack') {
                    ctx.fillRect(22, 18, 6, 2); // Extended arm
                } else {
                    ctx.fillRect(8, 22, 2, 6); // Left arm
                    ctx.fillRect(22, 22, 2, 6); // Right arm
                }
                
                // Legs (vary by animation)
                if (anim === 'run' && i % 2 === 0) {
                    ctx.fillStyle = '#2C3E50';
                    ctx.fillRect(12, 28, 3, 4); // Left leg forward
                    ctx.fillRect(17, 28, 3, 4); // Right leg
                } else if (anim === 'jump' || anim === 'fall') {
                    ctx.fillStyle = '#2C3E50';
                    ctx.fillRect(12, 28, 3, 4);
                    ctx.fillRect(17, 28, 3, 4);
                } else {
                    ctx.fillStyle = '#2C3E50';
                    ctx.fillRect(12, 28, 3, 4);
                    ctx.fillRect(17, 28, 3, 4);
                }
                
                texture.refresh();
            }
        }
    }

    // Generate enemy sprites
    generateEnemies() {
        // Rodent enemy
        const rodent = this.scene.textures.createCanvas('enemy_rodent', 24, 16);
        const rCtx = rodent.getContext();
        rCtx.fillStyle = '#8B4513';
        rCtx.fillRect(4, 6, 16, 8); // Body
        rCtx.fillRect(2, 8, 4, 4); // Head
        rCtx.fillRect(18, 10, 4, 2); // Tail
        rCtx.fillStyle = '#000';
        rCtx.fillRect(3, 9, 1, 1); // Eye
        rodent.refresh();

        // Bird enemy
        const bird = this.scene.textures.createCanvas('enemy_bird', 24, 16);
        const bCtx = bird.getContext();
        bCtx.fillStyle = '#34495E';
        bCtx.fillRect(8, 4, 8, 8); // Body
        bCtx.fillRect(12, 2, 4, 3); // Head
        bCtx.fillRect(4, 8, 6, 2); // Left wing
        bCtx.fillRect(14, 8, 6, 2); // Right wing
        bCtx.fillStyle = '#F39C12';
        bCtx.fillRect(13, 5, 2, 1); // Beak
        bird.refresh();

        // Guard enemy
        const guard = this.scene.textures.createCanvas('enemy_guard', 32, 32);
        const gCtx = guard.getContext();
        gCtx.fillStyle = '#E67E22';
        gCtx.fillRect(12, 10, 8, 8); // Head
        gCtx.fillStyle = '#7F8C8D';
        gCtx.fillRect(10, 18, 12, 10); // Armor body
        gCtx.fillRect(8, 20, 2, 6); // Left arm
        gCtx.fillRect(22, 20, 2, 6); // Right arm
        gCtx.fillRect(12, 28, 4, 4); // Left leg
        gCtx.fillRect(16, 28, 4, 4); // Right leg
        gCtx.fillStyle = '#C0392B';
        gCtx.fillRect(11, 8, 10, 3); // Helmet
        guard.refresh();
    }

    // Generate collectible items
    generateCollectibles() {
        // Pi Coin
        const piCoin = this.scene.textures.createCanvas('item_pi_coin', 16, 16);
        const pcCtx = piCoin.getContext();
        pcCtx.fillStyle = '#F39C12';
        pcCtx.beginPath();
        pcCtx.arc(8, 8, 7, 0, Math.PI * 2);
        pcCtx.fill();
        pcCtx.fillStyle = '#FFF';
        pcCtx.font = 'bold 10px Arial';
        pcCtx.textAlign = 'center';
        pcCtx.fillText('π', 8, 11);
        piCoin.refresh();

        // Bread (extra life)
        const bread = this.scene.textures.createCanvas('item_bread', 16, 16);
        const brCtx = bread.getContext();
        brCtx.fillStyle = '#D4A574';
        brCtx.fillRect(2, 6, 12, 8);
        brCtx.fillRect(4, 5, 8, 2);
        brCtx.fillStyle = '#C19A6B';
        brCtx.fillRect(5, 8, 2, 2);
        brCtx.fillRect(9, 8, 2, 2);
        bread.refresh();

        // Dates
        const dates = this.scene.textures.createCanvas('item_dates', 16, 16);
        const dCtx = dates.getContext();
        dCtx.fillStyle = '#8B4513';
        dCtx.fillRect(5, 4, 3, 8);
        dCtx.fillRect(8, 4, 3, 8);
        dCtx.fillRect(11, 4, 3, 8);
        dCtx.fillStyle = '#A0522D';
        dCtx.fillRect(5, 3, 9, 2);
        dates.refresh();

        // Olive Oil (power-up)
        const oliveOil = this.scene.textures.createCanvas('item_olive_oil', 16, 16);
        const ooCtx = oliveOil.getContext();
        ooCtx.fillStyle = '#27AE60';
        ooCtx.fillRect(6, 2, 4, 3); // Cap
        ooCtx.fillStyle = '#A8E6CF';
        ooCtx.fillRect(4, 5, 8, 10); // Bottle
        ooCtx.fillStyle = '#F4D03F';
        ooCtx.fillRect(5, 7, 6, 6); // Oil inside
        oliveOil.refresh();
    }

    // Generate projectile (olive/date)
    generateProjectile() {
        const projectile = this.scene.textures.createCanvas('projectile_olive', 8, 8);
        const ctx = projectile.getContext();
        ctx.fillStyle = '#27AE60';
        ctx.beginPath();
        ctx.arc(4, 4, 3, 0, Math.PI * 2);
        ctx.fill();
        projectile.refresh();
    }

    // Generate tile sets for different worlds
    generateTiles() {
        const tileSize = 32;
        
        // Stone tile (Medina)
        const stone = this.scene.textures.createCanvas('tile_stone', tileSize, tileSize);
        let ctx = stone.getContext();
        ctx.fillStyle = '#95A5A6';
        ctx.fillRect(0, 0, tileSize, tileSize);
        ctx.strokeStyle = '#7F8C8D';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, tileSize, tileSize);
        ctx.strokeRect(16, 0, 16, tileSize);
        stone.refresh();

        // Blue tile (Sidi Bou Said)
        const blueTile = this.scene.textures.createCanvas('tile_blue', tileSize, tileSize);
        ctx = blueTile.getContext();
        ctx.fillStyle = '#3498DB';
        ctx.fillRect(0, 0, tileSize, tileSize);
        ctx.strokeStyle = '#2980B9';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, tileSize, tileSize);
        blueTile.refresh();

        // Sand tile (Desert)
        const sand = this.scene.textures.createCanvas('tile_sand', tileSize, tileSize);
        ctx = sand.getContext();
        ctx.fillStyle = '#F4D03F';
        ctx.fillRect(0, 0, tileSize, tileSize);
        ctx.fillStyle = '#F39C12';
        for (let i = 0; i < 10; i++) {
            ctx.fillRect(Math.random() * tileSize, Math.random() * tileSize, 2, 2);
        }
        sand.refresh();

        // Grass tile (Olive countryside)
        const grass = this.scene.textures.createCanvas('tile_grass', tileSize, tileSize);
        ctx = grass.getContext();
        ctx.fillStyle = '#27AE60';
        ctx.fillRect(0, 0, tileSize, tileSize);
        ctx.fillStyle = '#229954';
        for (let i = 0; i < tileSize; i += 4) {
            ctx.fillRect(i, 0, 2, 8);
        }
        grass.refresh();

        // Stadium tile
        const stadium = this.scene.textures.createCanvas('tile_stadium', tileSize, tileSize);
        ctx = stadium.getContext();
        ctx.fillStyle = '#1ABC9C';
        ctx.fillRect(0, 0, tileSize, tileSize);
        ctx.fillStyle = '#16A085';
        ctx.fillRect(0, 0, tileSize / 2, tileSize);
        stadium.refresh();
    }

    // Generate background elements
    generateBackgrounds() {
        // Simple gradient backgrounds for each world
        const worlds = ['medina', 'sidi', 'desert', 'stadium', 'olive', 'mixed'];
        const colors = [
            ['#F4D03F', '#E67E22'], // Medina - warm
            ['#3498DB', '#2980B9'], // Sidi - blue
            ['#F39C12', '#E67E22'], // Desert - orange
            ['#1ABC9C', '#16A085'], // Stadium - teal
            ['#27AE60', '#229954'], // Olive - green
            ['#9B59B6', '#8E44AD']  // Mixed - purple
        ];

        worlds.forEach((world, idx) => {
            const bg = this.scene.textures.createCanvas(`bg_${world}`, 800, 600);
            const ctx = bg.getContext();
            const gradient = ctx.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, colors[idx][0]);
            gradient.addColorStop(1, colors[idx][1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 600);
            bg.refresh();
        });
    }

    // Generate UI elements
    generateUIElements() {
        // Heart (life indicator)
        const heart = this.scene.textures.createCanvas('ui_heart', 16, 16);
        const hCtx = heart.getContext();
        hCtx.fillStyle = '#E74C3C';
        hCtx.beginPath();
        hCtx.moveTo(8, 14);
        hCtx.lineTo(2, 8);
        hCtx.lineTo(2, 6);
        hCtx.lineTo(4, 4);
        hCtx.lineTo(6, 4);
        hCtx.lineTo(8, 6);
        hCtx.lineTo(10, 4);
        hCtx.lineTo(12, 4);
        hCtx.lineTo(14, 6);
        hCtx.lineTo(14, 8);
        hCtx.lineTo(8, 14);
        hCtx.fill();
        heart.refresh();

        // Button
        const button = this.scene.textures.createCanvas('ui_button', 120, 40);
        const bCtx = button.getContext();
        bCtx.fillStyle = '#E74C3C';
        bCtx.fillRect(0, 0, 120, 40);
        bCtx.strokeStyle = '#C0392B';
        bCtx.lineWidth = 3;
        bCtx.strokeRect(0, 0, 120, 40);
        button.refresh();
    }

    // Generate all assets
    generateAll() {
        this.generatePlayerSprites();
        this.generateEnemies();
        this.generateCollectibles();
        this.generateProjectile();
        this.generateTiles();
        this.generateBackgrounds();
        this.generateUIElements();
    }
}

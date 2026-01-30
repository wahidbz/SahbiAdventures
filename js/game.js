// Main game initialization
const config = {
    type: Phaser.AUTO,
    width: GameConfig.WIDTH,
    height: GameConfig.HEIGHT,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GameConfig.GRAVITY },
            debug: false
        }
    },
    scene: [
        BootScene,
        PreloadScene,
        MenuScene,
        WorldSelectScene,
        GameScene,
        UIScene,
        GameOverScene
    ],
    pixelArt: true,
    roundPixels: true
};

// Initialize game when DOM is ready
window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
    
    // Global game reference
    window.sahbiGame = game;
});

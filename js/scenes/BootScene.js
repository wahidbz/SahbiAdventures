// Boot Scene - First scene to load
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
        
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'جاري التحميل...',
            style: {
                font: '20px Arial',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px Arial',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        // Update progress bar
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xE74C3C, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
        
        // Load worlds configuration
        this.load.json('worldsData', 'assets/data/worlds.json');
    }

    create() {
      
create() {
    console.log("BootScene started");

    if (typeof piNetwork !== "undefined") {
        piNetwork.initialize()
        .then(() => {
            console.log("Pi Ready");
            this.scene.start("PreloadScene");
        })
        .catch(() => {
            console.log("Pi Failed - continue anyway");
            this.scene.start("PreloadScene");
        });
    } else {
        console.log("Pi Not Found - continue anyway");
        this.scene.start("PreloadScene");
    }
}

# Sahbi Adventures 🇹🇳

**The Ultimate Tunisian Platformer Adventure**

![Tunisia Flag](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/120px-Flag_of_Tunisia.svg.png)

## 📖 Description

Embark on an epic journey through Tunisia with Sahbi, a young Tunisian boy wearing his traditional red chachiya! Explore 30 handcrafted levels across 6 unique worlds inspired by Tunisia's rich culture and landscapes.

### 🌍 Game Worlds

1. **🏛️ Tunis Medina** (Levels 1-5) - Navigate the ancient streets and rooftops
2. **🏘️ Sidi Bou Said** (Levels 6-10) - Jump across iconic blue and white buildings
3. **🏜️ Tunisian Desert** (Levels 11-15) - Brave the scorching sand dunes
4. **⚽ Football Stadium** (Levels 16-20) - Master timing challenges in the arena
5. **🫒 Olive Countryside** (Levels 21-25) - Climb through beautiful olive groves
6. **👑 Legendary Mixed World** (Levels 26-30) - Face the ultimate challenge!

## 🎮 Gameplay Features

### Controls
- **Desktop:** Arrow keys to move, Up to jump, Space to attack
- **Mobile/Touch:** 
  - Left side of screen: Move left
  - Right side of screen: Move right
  - Center top: Jump
  - Center bottom: Attack

### Player Abilities
- ✅ Run and jump
- ✅ Double jump (with power-up)
- ✅ Attack enemies with olive projectiles
- ✅ Collect items and power-ups

### Collectibles
- 🪙 **Pi Coins** - Digital currency integrated with Pi Network
- 🍞 **Bread** - Extra life
- 🫐 **Dates** - Temporary double jump ability
- 🫒 **Olive Oil** - Invincibility power-up

### Enemies
- 🐀 Rodents - Ground patrol enemies
- 🦅 Birds - Flying enemies
- 💂 Guards - Stronger ground enemies

## 🪙 Pi Network Integration

This game is fully integrated with the **Pi Network** ecosystem!

### Features
- 💰 Collect Pi coins as you play
- 📊 Sync your progress with your Pi account
- 🎯 Earn achievements
- 🏆 Compete on leaderboards (coming soon)
- 🛒 In-game store (coming soon)

### How to Connect Pi Wallet

1. **Open in Pi Browser:**
   - Launch the Pi app on your mobile device
   - Navigate to Pi Browser
   - Enter the game URL or scan QR code

2. **Automatic Authentication:**
   - The game will request Pi Network permissions
   - Approve access to username and payments
   - Your Pi coins will be synced automatically

3. **Sandbox Mode (Testing):**
   - If not using Pi Browser, the game runs in sandbox mode
   - Progress is saved locally
   - Pi integration will activate once opened in Pi Browser

## 🚀 How to Play

### Option 1: Pi Browser (Recommended)
1. Upload the game to a web server
2. Open Pi Browser app
3. Navigate to your game URL
4. Enjoy with full Pi Network integration!

### Option 2: Local Testing
1. Extract the ZIP file
2. Open `index.html` in a modern web browser
3. Game runs in sandbox mode (no Pi Network connection)

### Option 3: Web Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then open: http://localhost:8000
```

## 📁 Project Structure

```
SahbiAdventures/
├── index.html              # Main HTML file
├── style.css               # Styles
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (offline support)
├── README.md               # This file
├── assets/
│   └── data/
│       └── worlds.json     # Level configurations
└── js/
    ├── config.js           # Game configuration
    ├── game.js             # Main game initialization
    ├── PiNetworkManager.js # Pi Network integration
    ├── AssetGenerator.js   # Procedural asset generation
    └── scenes/
        ├── BootScene.js
        ├── PreloadScene.js
        ├── MenuScene.js
        ├── WorldSelectScene.js
        ├── GameScene.js
        ├── UIScene.js
        └── GameOverScene.js
```

## 🎨 Technical Details

### Technologies Used
- **Game Engine:** Phaser.js 3.70.0
- **Pi Network:** Pi SDK 2.0
- **Graphics:** Procedurally generated pixel art
- **Physics:** Arcade Physics
- **Language:** JavaScript (ES6+)

### Performance
- Target: 60 FPS on mid-range Android devices
- Optimized for Pi Browser
- Offline playable after first load
- Mobile-first responsive design

### Browser Compatibility
- ✅ Chrome/Chromium (Pi Browser)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 not supported

## 🏆 Achievements

Unlock special achievements as you play:

- 🎯 **First Steps** - Complete Level 1
- 🏛️ **Medina Master** - Complete World 1
- 🏘️ **Sidi Explorer** - Complete World 2
- 🏜️ **Desert Warrior** - Complete World 3
- ⚽ **Football Star** - Complete World 4
- 🫒 **Olive Farmer** - Complete World 5
- 👑 **Tunisian Legend** - Complete all 30 levels
- 🪙 **Collector** - Collect 1000 Pi coins
- ⚡ **Speedrunner** - Complete any level in under 60s
- 💪 **Immortal** - Complete a world without losing a life

## 🎵 Audio

The game uses placeholder audio positions for:
- Background music (8-bit Tunisian-inspired melodies)
- Sound effects (jumps, collectibles, attacks, victories)
- Ambient sounds (desert wind, crowd cheers, etc.)

## 💾 Save System

- **Automatic Save:** Progress saves after each level
- **Local Storage:** Game data stored in browser
- **Pi Network Sync:** Coins synced with Pi account
- **Cross-Device:** Access progress from any device (via Pi account)

## 🔧 Configuration

Edit `js/config.js` to customize:
- Player physics (speed, jump height)
- Difficulty settings
- Collectible values
- Enemy behavior
- Pi Network integration settings

## 🐛 Troubleshooting

### Game won't load
- Check browser console for errors
- Ensure all files are in correct directories
- Try clearing browser cache

### Pi Network not connecting
- Verify you're using Pi Browser
- Check Pi Network permissions
- Enable sandbox mode for local testing

### Performance issues
- Close other browser tabs
- Reduce browser zoom to 100%
- Update to latest browser version

## 📜 License & Credits

### Game
- **Title:** Sahbi Adventures 🇹🇳
- **Version:** 1.0.0
- **Year:** 2024
- **Made with:** ❤️ in Tunisia

### Assets
- All graphics are procedurally generated
- No copyrighted materials used
- Original game concept and design

### Third-Party
- **Phaser.js:** MIT License
- **Pi Network SDK:** Pi Network License

## 🌟 Future Updates

Planned features:
- [ ] More worlds and levels
- [ ] Multiplayer mode
- [ ] Level editor
- [ ] Custom skins for Sahbi
- [ ] Tournament mode
- [ ] Pi Network marketplace integration
- [ ] Arabic voice-over
- [ ] Regional Tunisian dialects support

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review Pi Network documentation
- Test in sandbox mode first

## 🙏 Acknowledgments

Special thanks to:
- The vibrant Tunisian gaming community
- Pi Network for blockchain gaming integration
- Phaser.js team for the amazing framework
- All beta testers and early players

---

**Made with 🇹🇳 Tunisian pride and passion for gaming!**

*Yezzi nlaabou! (Let's play!)* 🎮

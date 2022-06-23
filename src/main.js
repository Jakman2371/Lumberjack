let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Play]
  
}
let game = new Phaser.Game(config); 
let keyF, keyR, keyLEFT, keyRIGHT;

let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 

/*
Points:
- Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
- Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
- Display the time remaining (in seconds) on the screen (10)
- Create a new animated sprite for the Spaceship enemies (10)
With Help From:
- Joann Wong
- CMPM 120 Discord
*/
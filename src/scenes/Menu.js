class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      this.load.audio('sfx_select', './assets/Select.wav');
      this.load.audio('sfx_explosion', './assets/chop.wav');
      this.load.audio('sfx_rocket','./assets/throw.wav'); 
      this.load.audio('bgm','./assets/menuBGM.mp3');
      this.load.image('titlescreen', './assets/titlescreen.png');

      
  }

  create() {
      
    let menuConfig = {
          fontFamily: 'Garamond',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5, 
          },
          fixedWidth:0 
      }
      
      this.bgm = this.sound.add("bgm");

      var bgmConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      }
      
      this.bgm.play(bgmConfig);

      this.mainMenu = this.add.tileSprite(0, 0, 640, 480, 'titlescreen').setOrigin(0, 0);

      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
          spaceshipSpeed: 8,
          gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
    }
    
    
}
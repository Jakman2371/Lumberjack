class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('rocket', './assets/heart.png');
        this.load.spritesheet('spaceship', './assets/dialup-Sheet.png', {frameWidth: 95, frameHeight:47, startFrame: 0, endFrame: 5});
        this.load.image('payphones', './assets/payphones.png');
        this.load.spritesheet('explosion', './assets/hearteffect.png', {frameWidth: 110, frameHeight:54, startFrame: 0, endFrame: 5});

    }
    create() {
       
        //borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize,game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.payphones = this.add.tileSprite(0,0,640,480, 'payphones').setOrigin(0,0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        this.anims.create({
            key: 'space',
            frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 4, first: 0}),
            frameRate: 30,
            repeat: -1
        });       
       
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship01.anims.play('space');
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship02.anims.play('space');
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship03.anims.play('space');
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30 
        });  
      

        this.p1Score = 0; 
        let scoreConfig = {
            fontFamily: 'Garamond',
            fontSize: '28px',
            backgroundColor: '#D90D22',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        this.gameOver = false; 

        scoreConfig.fixedWidth = 0;
        /*this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5); 
            this.gameOver = true; 
        }, null, this); 
        */

        this.timeCounter = this.game.settings.gameTimer;
        this.timer = this.add.text(borderUISize + borderPadding + 525, borderUISize + borderPadding*2, this.timeCounter,scoreConfig);
        this.timeRemain = this.game.settings.gameTimer;
    }

    update(time, delta) {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.get('bgm').stop();
            this.scene.start("menuScene"); 
        }


        this.payphones.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update(); 

            this.timeRemain -= delta;
            this.timeCounter = time; 
            this.timeCounter = Math.floor(this.timeRemain/1000) + 1; 
            this.timer.text = this.timeCounter; 
            this.checkForGameOver();
    
        
        }
        
        //check collisions 
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.timeRemain += 1000;
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.timeRemain += 1000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.timeRemain += 1000;  
        }
       
    }
    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true; 
        } else {
            return false; 
        }
    }
    
    shipExplode(ship) {
        
        ship.alpha = 0; 

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1; 
            boom.destroy(); 
        }); 

        this.p1Score += ship.points; 
        this.scoreLeft.text = this.p1Score; 

        this.sound.play('sfx_explosion');
    }

    checkForGameOver(){
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 570
        }
        if(this.timeRemain <= 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
    }
}
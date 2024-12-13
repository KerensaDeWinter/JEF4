import { Scene } from 'phaser';
import Phaser from 'phaser';


import MonkeyContainer from '../containers/MonkeyContainer'


export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player = undefined;
        this.stars = undefined;
        this.cursors = undefined;
        this.score = 0;
        this.platforms = undefined
        this.scoreText = undefined;
        this.background = undefined;
        this.monkey = MonkeyContainer;
        this.timer = undefined;
    }

    preload() {
    }

    create ()
    {
        // this.background = this.add.image(500, 400, 'sky');
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 860, 'ground').setScale(4).refreshBody();
        // this.player = this.physics.add.image(this.sys.game.config.width/2, 0, 'monkey');
    //     this.player.body.clearShapes();

    // // Add our PhysicsEditor bounding shape
    //     this.player.body.loadPolygon("sprite_physics", "monkey");
        // this.player.setOrigin(0.5,0);
        // this.player.setScale(0.25);
        // this.player.setGravity(0);
        this.monkey = new MonkeyContainer(this, this.sys.game.config.width/2, 0);

        this.anims.create({
			key: 'left',
			// frames: this.anims.generateFrameNumbers('test', { start: 0, end: 3 }),
			frames: [ { key: 'test', frame: 3 } ],
			frameRate: 10,
			repeat: 1
		});
	
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'test', frame: 4 } ],
			frameRate: 20
		});
	
		this.anims.create({
			key: 'right',
			// frames: this.anims.generateFrameNumbers('test', { start: 5, end: 8 }),
			frames: [ { key: 'test', frame: 8 } ],
			frameRate: 10,
			repeat: -1
		});

        this.bananas = this.physics.add.group({
            key: 'banana',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 90 }
        });

        this.bananas.children.iterate(function (child) { // make group of bananas

            child.setScale(0.07);
            child.setGravity(0,300);

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.scoreText = this.add.text(16, 16, 'Bananas: 0', { fontSize: '32px', fill: '#000' });

        // this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.bananas, this.platforms);
        // this.physics.add.overlap(this.player, this.bananas, this.collectBananas, null, this);
        this.physics.add.overlap(this.monkey.physicsDisplay1, this.bananas, this.collectBananas, null, this);
        this.physics.add.overlap(this.monkey.physicsDisplay2, this.bananas, this.collectBananas, null, this);

        this.timeInSeconds = 180;
        this.timeText = this.add.text(220, 30, "0:00",{font: '30px Arial', fill: 
        '#FFFFFF', align: 'center'});
    }
    collectBananas (player, banana) 
    {
        banana.disableBody(true, true);
        var music = this.sound.add('monkey');
        music.play();
    
        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Bananas: ' + this.score);
    
        if (this.bananas.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            this.bananas.children.iterate(function (child) {
    
                child.enableBody(true, child.x, 0, true, true);
    
            });
    
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        }
    }
    update ()
    {
        // this.monkey.rotateBy(0);
        // this.player.refreshBody();
        
        //////////// TO DO: ///////////
        // Na 15 sec inactiviteit een check van ben je er nog
        // (voor de niet-mvp) Na 1 min bananen gravity aanzetten
        // Na 1 min superbanaan
        // Na 2 min superbanaan
        // Na 2 min gravity harder
        // Na 2 min dieren vallen sneller aan


        this.cursors = this.input.activePointer.worldX / 800 * 100;
        console.log(this.cursors);

        // console.log(this.cursors);

        if (this.cursors < 40)
            {
                this.monkey.angle = 50-this.cursors;
                this.monkey.display.anims.play('left', true);

                // this.player.body.setVelocityX(-100);
                // console.log(this.monkey);
                // player.anims.play('left', true);
            }
            else if (this.cursors >= 99.5) {
                this.monkey.angle = -50;
                this.monkey.display.anims.play('right', true);


            }
            // else if (cursors.right.isDown)
            else if (this.cursors > 60)
            {
                this.monkey.angle = 50-this.cursors;
                this.monkey.display.anims.play('right', true);
                // this.player.body.width = this.player.getBounds().width;

                // player.anims.play('right', true);
            }
            else
            {
                this.monkey.angle = 0;
                this.monkey.display.anims.play('turn', true);

                // player.anims.play('turn');
            }
    }
}

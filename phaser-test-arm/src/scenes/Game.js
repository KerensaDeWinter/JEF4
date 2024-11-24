import { Scene } from 'phaser';

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
    }

    preload() {
        this.load.image('monkey', '/assets/monkey-test.png');
        // this.load.image("monkey", "assets/monkey-test.png");
        // this.load.physics("sprite_physics", "assets/Monkey.json");
        this.load.image('sky', '/assets/Background.png');
        this.load.image('ground', '/assets/platform.png');
        this.load.image('banana', '/assets/Banana.png');

    }

    create ()
    {
        this.background = this.add.image(500, 400, 'sky');
        this.background.setScale(0.2);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 860, 'ground').setScale(3.5).refreshBody();
        this.player = this.physics.add.image(this.sys.game.config.width/2, 0, 'monkey');
    //     this.player.body.clearShapes();

    // // Add our PhysicsEditor bounding shape
    //     this.player.body.loadPolygon("sprite_physics", "monkey");
        this.player.setOrigin(0.5,0);
        this.player.setScale(0.25);
        this.player.setGravity(0);

        this.bananas = this.physics.add.group({
            key: 'banana',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 90 }
        });

        this.bananas.children.iterate(function (child) {

            child.setScale(0.07);
            child.setGravity(0,300);

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.bananas, this.platforms);
        this.physics.add.overlap(this.player, this.bananas, this.collectBananas, null, this);
    }
    collectBananas (player, banana) 
    {
        banana.disableBody(true, true);
    
        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    
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
        this.player.refreshBody();

        this.cursors = this.input.activePointer.worldX / 800 * 100;
        // console.log(this.cursors);

        if (this.cursors < 40)
            {
                this.player.angle = 50-this.cursors;
                // this.player.body.setVelocityX(-100);
                console.log(this.player.body);
                // player.anims.play('left', true);
            }
            // else if (cursors.right.isDown)
            else if (this.cursors > 60)
            {
                this.player.angle = 50-this.cursors;
                this.player.body.width = this.player.getBounds().width;

                // player.anims.play('right', true);
            }
            else
            {
                this.player.angle = 0;
                // player.anims.play('turn');
            }
    }
}

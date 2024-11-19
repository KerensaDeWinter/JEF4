import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let player;
        let stars;
        let bombs;
        let platforms;
        let cursors;
        let score = 0;
        let gameOver = false;
        let scoreText;
        
        this.add.image(400, 300, 'sky');
        
        player = this.physics.add.sprite(100, 450, 'dude'); // change image to sprite
        
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
      
        cursors = this.input.keyboard.createCursorKeys();
        
        stars = this.physics.add.group({
            key: 'star',
            repeat: 4,
            setXY: { x: 12, y: 0, stepX: 100 }
        });
        
        stars.children.iterate(function (child) {
    
            
            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
        });
        
        this.physics.add.overlap(player, stars, this.collectStar, null, this); // voor de bananen
        
    }
    update ()
        {
            // if (gameOver)
            // {
            //     return;
            // }
        
            if (cursors.left.isDown)
            {
                player.setVelocityX(-160);
        
                player.anims.play('left', true);
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(160);
        
                player.anims.play('right', true);
            }
            else
            {
                player.setVelocityX(0);
        
                player.anims.play('turn');
            }
        
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-330);
            }
        }
        
    collectStar (player, star) 
        {
            star.disableBody(true, true);
        
            //  Add and update the score
            score += 10;
            scoreText.setText('Score: ' + score);
        
            if (stars.countActive(true) === 0)
            {
                //  A new batch of stars to collect
                stars.children.iterate(function (child) {
        
                    child.enableBody(true, child.x, 0, true, true);
        
                });
        
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
        
            }
        }
    
}

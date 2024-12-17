import { Scene } from 'phaser';
import Phaser from 'phaser';


import MonkeyContainer from '../containers/MonkeyContainer'


export class GameSingleRope extends Scene
{
    constructor ()
    {
        super('GameSingleRope');
        this.player = undefined;
        this.bananas = undefined;
        this.cursors = undefined;
        this.score = 0;
        this.platforms = undefined
        this.scoreText = undefined;
        this.timeText = undefined;
        this.timeString = undefined;
        this.background = undefined;
        this.monkey = MonkeyContainer;
        this.timer = undefined;
        this.timeInSeconds = undefined;
        this.bananaLocations = [
            {
                x: 210,
                y: 100,
            },
            {
                x: 220,
                y: 150,
            },
            {
                x: 230,
                y: 100,
            },
            {
                x: 1000,
                y: 100,
            },
            {
                x: 1030,
                y: 150,
            },
            {
                x: 1020,
                y: 100,
            }
        ]
        this.angularForce = 0;
        this.running = undefined;
    }

    preload() {
    }

    create ()
    {
        this.running = true;
        this.timeInSeconds = this.registry.get('time');
        this.score = this.registry.get('score');
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.bananas = this.physics.add.group();
        this.platforms.create(400, 860, 'ground').setScale(4).refreshBody();
        this.monkey = new MonkeyContainer(this, this.sys.game.config.width/2, 0);

        this.scoreImg = this.add.image(40, 50, 'score');
        this.scoreText = this.add.text(76, 16, '', { fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness: 4, });
        this.scoreText.setText(this.score);

        this.physics.add.collider(this.bananas, this.platforms);
        this.physics.add.overlap(this.monkey.physicsDisplay1, this.bananas, this.collectBananas, null, this);
        this.physics.add.overlap(this.monkey.physicsDisplay2, this.bananas, this.collectBananas, null, this);

        this.timeText = this.add.text(220, 30, "3:00",{font: '30px Arial', fill: 
        '#FFFFFF', align: 'center'});

        this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this, 
            repeat: 180, 
        });
        setInterval(() =>{
            if (this.running) {
                this.randomizeBananas();
            }
        }, 2000)
    }

    updateTimer() {
        this.timeInSeconds--;
        let minutes = Math.floor(this.timeInSeconds / 60);
        let seconds = this.timeInSeconds - (minutes * 60);
        this.timeString = minutes + ":" + seconds;
        this.timeText.text = this.timeString;
        this.registry.set('time', this.timeInSeconds);
    }
    randomizeBananas() {
        let oldBananaLocation = Phaser.Math.Between(0, 5);
        let i = 0;
        if (this.bananas.children) {
            this.bananas.children.iterate(function (banana) {
                    if (i === oldBananaLocation) {
                        banana.destroy();
                    }
                    i++;
                });
        }
        let location = this.bananaLocations[Phaser.Math.Between(0, 5)];
        this.bananas.create(location.x, location.y, 'banana').setScale(0.07);
    }
    collectBananas (player, banana) 
    {
        banana.destroy();
        var music = this.sound.add('monkeySound');
        music.play();
    
        //  Add and update the score
        this.score += 1;
        this.scoreText.setText(this.score);
        this.registry.set('score', this.score);
    
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
        if (this.timeInSeconds === 0) {
            this.running = false;
            this.registry.set("gameOver", "timer");
            this.scene.start('GameOver');
        }

        this.cursors = this.input.keyboard.createCursorKeys();
        
        if(this.cursors.left.isDown || this.cursors.up.isDown) {
            if (this.cursors.left.isDown) {
                if (this.angularForce < 30) {
                    this.angularForce += 1;
                } 
                else {
                    this.angularForce = 30;
                }
                console.log(this.angularForce);

            } else {
                if (this.angularForce < 50) {
                    this.angularForce += 1;
                } else {
                    this.angularForce = 50;
                }
                console.log(this.angularForce);
            }
        } else if (this.cursors.right.isDown || this.cursors.down.isDown) {
            if (this.cursors.right.isDown) {
                if (this.angularForce > -30) {
                    this.angularForce -= 1;
                } 
                else {
                    this.angularForce = -30;
                }
            } else {
                if (this.angularForce > -50) {
                    this.angularForce -= 1;
                } else {
                    this.angularForce = -50;
                }
            }
        }
        else if (this.monkey.angle < 2 && this.monkey.angle > -2){
            this.monkey.display.anims.play('turn', true);
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            if (Math.abs(this.monkey.angle) <= 30) {
                this.angularForce *= 0.95;
            } else {
                this.angularForce *= 0.98;
            }
        }
        this.monkey.angle = this.angularForce;

        if (this.monkey.angle >= 40) {
            this.monkey.display.anims.play('left5', true);
        }
        else if (this.monkey.angle >= 30) {
            this.monkey.display.anims.play('left4', true);
        }
        else if (this.monkey.angle >= 20) {
            this.monkey.display.anims.play('left3', true);
        }
        else if (this.monkey.angle >= 10) {
            this.monkey.display.anims.play('left2', true);
        }
        else if (this.monkey.angle >= 0) {
            this.monkey.display.anims.play('left1', true);
        }

        if (this.monkey.angle <= -40) {
            this.monkey.display.anims.play('right4', true);
        }
        else if (this.monkey.angle <= -30) {
            this.monkey.display.anims.play('right3', true);
        }
        else if (this.monkey.angle <= -20) {
            this.monkey.display.anims.play('right2', true);
        }
        else if (this.monkey.angle <= -10) {
            this.monkey.display.anims.play('right1', true);
        }
        else if (this.monkey.angle <= 0) {
            this.monkey.display.anims.play('turn', true);
        }
    }
}

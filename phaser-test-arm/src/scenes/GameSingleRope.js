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
        this.lastInteractionTime = 0;
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
        this.lastInteractionTime = 0;
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.bananas = this.physics.add.group();
        this.platforms.create(400, 860, 'ground').setScale(4).refreshBody();
        this.monkey = new MonkeyContainer(this, this.sys.game.config.width/2, 0);

        this.scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
        this.scoreText.setText('Bananas: ' + this.score);

        this.physics.add.collider(this.bananas, this.platforms);
        this.physics.add.overlap(this.monkey.physicsDisplay1, this.bananas, this.collectBananas, null, this);
        this.physics.add.overlap(this.monkey.physicsDisplay2, this.bananas, this.collectBananas, null, this);

        this.timeText = this.add.text(220, 30, "3:00",{font: '30px Arial', fill: 
        '#FFFFFF', align: 'center'});

        setInterval(() =>{
            if (this.running) {
                this.timer = this.updateTimer();
            }
        }, 1000)
        setInterval(() =>{
            if (this.running) {
                this.randomizeBananas();
            }
        }, 2000)
    }

    openInstructions() {
        const instructions = document.querySelector('dialog');
        instructions.showModal();
    }

    updateTimer() {
        this.lastInteractionTime++;
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
        this.scoreText.setText('Bananas: ' + this.score);
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
        const help = document.querySelector(".help");
        help.addEventListener('click', () => this.openInstructions);

        // if (this.lastInteractionTime >= 15) {
        //     this.scene.switch('Pause');
        //     this.lastInteractionTime = 0;
        // }

        if (this.timeInSeconds === 0) {
            this.running = false;
            this.scene.start('GameOver');
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        // console.log(this.monkey.angle)
        // this.cursors = this.input.activePointer.worldX / 800 * 100;
        // console.log(this.input.activePointer.worldX);
        if(this.cursors.left.isDown) {
            this.angularForce += 1;
            // console.log(this.monkey.angle);
            // if (this.monkey.angle > 49) {
            //     this.monkey.angle = 50;
            // } else {
            //     for(let i = 0; i<10; i++) {
            //         this.monkey.angle+=1;
            //     }
            // }
            // // console.log(this.monkey.angle);
            // if (Math.abs(this.monkey.angle) >= 20) {
            //     this.monkey.display.anims.play('left3', true);
            // }
            // else if (Math.abs(this.monkey.angle) >= 10) {
            //     this.monkey.display.anims.play('left2', true);
            // }
            // else if (Math.abs(this.monkey.angle) >= 0) {
            //     this.monkey.display.anims.play('left1', true);
            // }
        } else if (this.cursors.right.isDown) {
            this.angularForce += -1;
            // if (this.monkey.angle < -49) {
            //     this.monkey.angle = -50;
            // } else {
            //     for(let j = 0; j<10; j++) {
            //         this.monkey.angle-=1;
            //     }
            // }
            // if (Math.abs(this.monkey.angle) >= 20) {
            //     this.monkey.display.anims.play('right2', true);
            // }
            // else if (Math.abs(this.monkey.angle) >= 10) {
            //     this.monkey.display.anims.play('right1', true);
            // }
            // else if (Math.abs(this.monkey.angle) >= 0) {
            //     this.monkey.display.anims.play('turn', true);
            // }
        }
        this.angularForce *= 0.98;
        this.monkey.angle = this.angularForce;
    }
}

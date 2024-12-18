import { Scene } from 'phaser';
import Phaser from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';


import MonkeyContainer from '../containers/MonkeyContainer'


export class Instructions extends Scene
{
    constructor ()
    {
        super('Instructions');
        this.player = undefined;
        this.cursors = undefined;
        this.score = 6;
        this.platforms = undefined
        this.scoreText = undefined;
        this.background = undefined;
        this.monkey = MonkeyContainer;
        this.currentAnimal = undefined;
        this.currentAnimal1 = {
            name: "toucan",
            x: -170,
            y: 200,
            from: "left"
        };
        this.currentAnimal2 = {
            name: "tiger",
            x: 1300,
            y: 780,
            from: "right"
        };
        this.currentAnimalImage = undefined;
        this.bananaLocation = 
            {
                x: 1000,
                y: 200,
            }
        this.counter = 1;
        this.checkbar = undefined;
        this.angularForce = 0;
        this.banana = undefined;
    }

    preload() {
    }

    create ()
    {
        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'instruction-background');
        this.checkbar = this.add.image(this.sys.game.config.width-140, 50, `checkbar-${this.registry.get('gameMode')}-${this.counter}`);
        this.checkbar.setScale(0.72);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 970, 'ground').setScale(4).refreshBody();
        this.monkey = new MonkeyContainer(this, this.sys.game.config.width/2, 0);

        this.scoreImg = this.add.image(40, 50, 'score');
        this.scoreText = this.add.text(76, 16, '', { fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness: 4, });
        this.scoreText.setText(this.score);

        if (this.registry.get('gameMode') !== "singleDrum") {
            this.title=this.add.text(this.sys.game.config.width / 2, 50, 'Vang de bananen', {
                fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.orange, stroke: this.style.colors.black, strokeThickness: 4,
                align: 'center',
            }).setOrigin(0.5, 0.5);
        } else {
            this.title=this.add.text(this.sys.game.config.width / 2, 50, 'Jaag dieren weg', {
                fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.orange, stroke: this.style.colors.black, strokeThickness: 4,
                align: 'center',
            }).setOrigin(0.5, 0.5);
        }
        this.swingVideo = this.add.video(this.sys.game.config.width/1.25, 700, 'instructionswing').setScale(0.4);
        this.toucanVideo = this.add.video(this.sys.game.config.width/5, 700, 'instructiontoucan').setScale(0.75);
        this.tigerVideo = this.add.video(this.sys.game.config.width/5, 700, 'instructiontiger').setScale(0.75);

        setTimeout(() => {
            if (this.registry.get('gameMode') === "singleDrum") {
            this.generateAnimal("toucan");
            } else {
                this.banana = this.physics.add.sprite(this.bananaLocation.x, this.bananaLocation.y, 'banana').setScale(0.07);
                this.physics.add.collider(this.banana, this.platforms);
                this.physics.add.overlap(this.monkey.physicsDisplay1, this.banana, this.collectBananas, null, this);
                this.physics.add.overlap(this.monkey.physicsDisplay2, this.banana, this.collectBananas, null, this);
                this.shakeBanana(this.banana);
                this.swingVideo.play(true);
            }
        }, 1000);
        this.input.keyboard.on('keydown-F', () => {
            this.noise = this.sound.add('middleButtons');
            this.noise.play();
            this.scene.start('MainMenu'); 
        });
    }

    shakeBanana(banana) {
        this.tweens.add({
            targets: banana, 
            x: {
                value: `+=${Phaser.Math.Between(10,15)}`,
                duration: 90,
                yoyo: true, 
                repeat: 3,
            },
            ease: 'Sine.easeInOut'
        });
    }

    hitByAnimal() {
        this.monkey.display.setTint(0x920538);
        if(this.currentAnimal === "toucan") {
            this.currentAnimalImage.body.setVelocityX(-200);
            setTimeout(() => {
                this.currentAnimalImage.destroy();
                this.generateAnimal("toucan");
                this.monkey.display.clearTint();
            }, 2000)
        } else 
        {   
            this.currentAnimalImage.body.setVelocityX(200);
            setTimeout(() => {
                this.currentAnimalImage.destroy();
                this.generateAnimal("tiger");
            }, 2000)
        }
    }
    generateAnimal(animal) {
        if (this.currentAnimalImage) {
            this.currentAnimalImage.destroy();
        }
        if (animal === "toucan") {
            this.swingVideo.destroy();
            this.toucanVideo.play(true);
            this.currentAnimal = this.currentAnimal1.name;
            this.currentAnimalImage = this.physics.add.sprite(this.currentAnimal1.x, this.currentAnimal1.y, 'toucanI');
            console.log(this.currentAnimalImage);
        } else {
            this.tigerVideo.play(true);
            this.currentAnimal = this.currentAnimal2.name;
            this.currentAnimalImage = this.physics.add.sprite(this.currentAnimal2.x, this.currentAnimal2.y, 'tigerI');
        }
        this.currentAnimalImage.anims.play(`${animal}I`, true);
        console.log(this.currentAnimalImage.anims.currentAnim);
        if (this.currentAnimal === "toucan") {
            this.currentAnimalImage.body.setVelocityX(50);
        } else {
            this.currentAnimalImage.body.setVelocityX(-50);
        }
        this.physics.add.overlap(this.monkey.physicsDisplay3, this.currentAnimalImage, this.hitByAnimal, null, this);
        console.log(this.currentAnimalImage);
    }
    scareAnimal(animal) {
        if(this.currentAnimal === "toucan" && animal === "toucan") {
            this.currentAnimalImage.anims.play(`${this.currentAnimal}Dead`, true);
            this.currentAnimalImage.body.setVelocityX(-200);
            if (this.registry.get('gameMode') === "multi") {
                this.counter=4;
            } else {
                this.counter=2;
            }
            setTimeout(() => {
                this.generateAnimal("tiger");
            }, 2000)
        } else if (this.currentAnimal === "tiger" && animal === "tiger")
        {
            this.currentAnimalImage.anims.play(`${this.currentAnimal}Dead`, true);
            this.currentAnimalImage.body.setVelocityX(200);
            if (this.registry.get('gameMode') === "multi") {
                this.counter=6;
            } else {
                this.counter=4;
            }
            setTimeout(() => {
                this.scene.stop('Instructions');
                this.scene.start('Counter');
            }, 2000)
        }
    }
    collectBananas (player, banana) 
    {
        banana.destroy();
        var music = this.sound.add('monkeySound');
        music.play();
    
        //  Add and update the score
        this.score += 1;
        this.scoreText.setText(this.score);
        this.counter= 2;
        if (this.registry.get('gameMode') === "singleRope") {
            setTimeout(() => {
                this.scene.stop('Instructions');
                this.scene.start('Counter');
            }, 2000)
        } else {
            this.generateAnimal("toucan");
            this.title.setText("Jaag dieren weg");
        }
    }
    update ()
    {
        this.checkbar.setTexture(`checkbar-${this.registry.get('gameMode')}-${this.counter}`);

        if (this.registry.get('gameMode') !== "singleRope") {
            this.input.keyboard.on('keydown-D', () => {
                this.scareAnimal("toucan");
            });
            this.input.keyboard.on('keydown-B', () => {
                this.scareAnimal("tiger");
            });
        }
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        if(this.cursors.left.isDown || this.cursors.up.isDown) {
            if (this.cursors.left.isDown) {
                if (this.angularForce < 20) {
                    this.angularForce += 1;
                } 
                else {
                    this.angularForce = 20;
                }

            } else {
                if (this.angularForce < 40) {
                    this.angularForce += 1;
                } else {
                    this.angularForce = 40;
                }
            }
        } else if (this.cursors.right.isDown || this.cursors.down.isDown) {
            if (this.cursors.right.isDown) {
                if (this.angularForce > -20) {
                    this.angularForce -= 1;
                } 
                else {
                    this.angularForce = -20;
                }
            } else {
                if (this.angularForce > -40) {
                    this.angularForce -= 1;
                } else {
                    this.angularForce = -40;
                }
            }
        }
        else if (this.monkey.angle < 2 && this.monkey.angle > -2){
            this.monkey.display.anims.play('turn', true);
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.angularForce *= 0.95;
        }
        this.monkey.angle = this.angularForce;

        if (this.monkey.angle >= 30) {
            this.monkey.display.anims.play('left5', true);
        }
        else if (this.monkey.angle >= 20) {
            this.monkey.display.anims.play('left4', true);
        }
        else if (this.monkey.angle >= 10) {
            this.monkey.display.anims.play('left3', true);
        }
        else if (this.monkey.angle >= 5) {
            this.monkey.display.anims.play('left2', true);
        }
        else if (this.monkey.angle >= 0) {
            this.monkey.display.anims.play('left1', true);
        }

        if (this.monkey.angle <= -30) {
            this.monkey.display.anims.play('right4', true);
        }
        else if (this.monkey.angle <= -20) {
            this.monkey.display.anims.play('right3', true);
        }
        else if (this.monkey.angle <= -10) {
            this.monkey.display.anims.play('right2', true);
        }
        else if (this.monkey.angle <= -5) {
            this.monkey.display.anims.play('right1', true);
        }
        else if (this.monkey.angle <= 0) {
            this.monkey.display.anims.play('turn', true);
        }
    }
}

import { Scene } from 'phaser';
import Phaser from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

import MonkeyContainer from '../containers/MonkeyContainer'


export class GameSingleDrum extends Scene
{
    constructor ()
    {
        super('GameSingleDrum');
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
        this.animals = [{
            name: "parrot",
            x: 1300,
            y: 200,
            from: "right"
        }, {
            name: "tiger",
            x: 1300,
            y: 780,
            from: "right"
        }, {
            name: "toucan",
            x: -100,
            y: 200,
            from: "left"
        }, {
            name: "snake",
            x: -100,
            y: 780,
            from: "left"
        }];
        this.currentAnimal = "";
        this.currentAnimalImage = undefined;
        this.bananaLocations = [
            {
                x: 160,
                y: 100,
            },
            {
                x: 210,
                y: 180,
            },
            {
                x: 220,
                y: 120,
            },
            {
                x: 980,
                y: 120,
            },
            {
                x: 1030,
                y: 180,
            },
            {
                x: 1050,
                y: 140,
            }
        ]
        this.angle = 0;
        this.running = undefined;
        this.direction = 1;
        this.minAngle = -20;
        this.maxAngle = 20;

    }

    preload() {
    }

    create ()
    {
        this.style = new GlobalStyles(); 
        this.running = true;
        this.timeInSeconds = this.registry.get('time');
        this.score = this.registry.get('score');
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.bananas = this.physics.add.group();
        this.platforms.create(400, 970, 'ground').setScale(4).refreshBody();
        this.monkey = new MonkeyContainer(this, this.sys.game.config.width/2, 0);
        this.monkey.display.anims.play('right4');

        this.scoreImg = this.add.image(40, 50, 'score');
        this.scoreText = this.add.text(76, 16, '', { fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness: 4, });
        this.scoreText.setText(this.score);

        this.physics.add.collider(this.bananas, this.platforms);
        this.physics.add.overlap(this.monkey.physicsDisplay1, this.bananas, this.collectBananas, null, this);
        this.physics.add.overlap(this.monkey.physicsDisplay2, this.bananas, this.collectBananas, null, this);

        this.help = this.add.image(1090, 840, "helpButton");
        this.help.setScale(0.8);

        this.helpVideo = this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/2, 'help');
        this.helpVideo.setScale(0.7);
        this.helpVideo.depth = 100;

        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); 
        this.overlay.fillRect(0, 0, 1200, 900); 
        this.overlay.setVisible(false); 
        this.overlay.depth = 90;
        

        this.add.image(1050, 50, "clock");
        this.timeText = this.add.text(1080, 16, "3:00",{fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness: 4, });

        this.hitbytoucan = this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/2, 'hitbytoucan');
        this.hitbysnake = this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/2, 'hitbysnake');
        this.hitbyparrot = this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/2, 'hitbyparrot');
        this.hitbytiger = this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/2, 'hitbytiger');
        this.hitbytoucan.depth = 200;
        this.hitbyparrot.depth = 200;
        this.hitbysnake.depth = 200;
        this.hitbytiger.depth = 200;

        this.time.addEvent({
            delay: Phaser.Math.Between(6000, 9000), 
            callback: this.generateAnimal,
            callbackScope: this, 
            loop: true, 
        });
        this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this, 
            repeat: 180, 
        });
        this.time.addEvent({
            delay: 2000, 
            callback: this.randomizeBananas,
            callbackScope: this, 
            loop: true, 
        });
        this.time.addEvent({
            delay: 90000, 
            callback: this.dropBanana,
            callbackScope: this, 
            loop: true, 
        });
        this.input.keyboard.on('keydown-F', () => {
            this.noise = this.sound.add('middleButtons');
            this.noise.play();
            this.scene.start('MainMenu'); 
        });
        this.input.keyboard.on('keydown-G', () => {
            this.noise = this.sound.add('middleButtons');
            this.noise.play();
            this.scene.pause();
            this.overlay.setVisible(true);
            this.helpVideo.play();
        });
        this.helpVideo.on('complete', () => {
            this.helpVideo.setVisible(false);
            this.overlay.setVisible(false);
            this.scene.resume();
        }, this);
    }

    hitByAnimal() {
        if (this.currentAnimal.name != "") {
            this.running = false;
            switch (this.currentAnimal.name) {
                case "parrot": this.registry.set('gameOver', "parrot"); this.hitbyparrot.play(); break;
                case "toucan": this.registry.set('gameOver', "toucan"); this.hitbytoucan.play(); break;
                case "tiger": this.registry.set('gameOver', "tiger"); this.hitbytiger.play(); break;
                case "snake": this.registry.set('gameOver', "snake"); this.hitbysnake.play(); break;
            }
            setTimeout(() => {
                this.scene.start(`GameOver`);
            }, 4000)
        }
    }
    generateAnimal() {
        if (!this.running) {
            return;
        }
        if(this.currentAnimal !== "") {
            this.currentAnimalImage.destroy();
        }
        let index = Phaser.Math.Between(0, 3);
        this.currentAnimal = this.animals[index];
        this.currentAnimalImage = this.physics.add.sprite(this.currentAnimal.x, this.currentAnimal.y, this.currentAnimal.name);
        this.currentAnimalImage.anims.play(this.currentAnimal.name, true);
        // this.currentAnimalImage.body.setGravityX(800);
        if (this.currentAnimal.from === "left") {
            if (this.timeInSeconds < 60) {
                this.currentAnimalImage.body.setVelocityX(100);
            } else if(this.timeInSeconds < 120) {
                this.currentAnimalImage.body.setVelocityX(75);
            } else {
                this.currentAnimalImage.body.setVelocityX(50);
            }
        } else if (this.currentAnimal.from === "right") {
            if (this.timeInSeconds < 60) {
                this.currentAnimalImage.body.setVelocityX(-100);
            } else if(this.timeInSeconds < 120) {
                this.currentAnimalImage.body.setVelocityX(-75);
            } else {
                this.currentAnimalImage.body.setVelocityX(-50);
            }
        }
        this.physics.add.collider(this.monkey.physicsDisplay3, this.currentAnimalImage, this.hitByAnimal, null, this);
    }
    scareAnimal(animal) {
        if(this.currentAnimal !== "" && this.currentAnimal.name===animal) {
            if (this.currentAnimal.from === "left") {
                this.currentAnimalImage.anims.play(`${this.currentAnimal.name}Dead`, true);
                this.currentAnimalImage.body.setVelocityX(-200);
            } else if (this.currentAnimal.from === "right") {
                this.currentAnimalImage.anims.play(`${this.currentAnimal.name}Dead`, true);
                this.currentAnimalImage.body.setVelocityX(200);
            }
            setTimeout(() => {
                this.currentAnimalImage.destroy();
            }, 2000)
        }
    }
    updateTimer() {
        this.timeInSeconds--;
        let minutes = Math.floor(this.timeInSeconds / 60);
        let seconds = this.timeInSeconds - (minutes * 60);
        this.timeString = minutes + ":" + (seconds.toString().length < 2 ? "0" + seconds: seconds);
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
        this.bananas.create(location.x, location.y, 'banana').setScale(0.07).setFlipX(Phaser.Math.Between(0,1));
        this.bananas.children.iterate((banana) => {
            this.time.addEvent({
                delay: 2000, 
                callback: this.shakeBanana(banana),
                callbackScope: this, 
                loop: true, 
            });
            this.shakeBanana(banana);
        });
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
    dropBanana() {
        if (this.bananas.getLength()>0) {
            let random = Phaser.Math.Between(1,this.bananas.getLength());
            this.banana = this.bananas.children.entries.at(random).body.setGravityY(300);
            this.timeInSeconds-=10;
        }
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
    update ()
    {
        this.minAngle = Phaser.Math.Between(-25, -45);
        this.maxAngle = Phaser.Math.Between(25, 45);
        this.input.keyboard.on('keydown-D', () => {
            this.scareAnimal("toucan");
        });
        this.input.keyboard.on('keydown-B', () => {
            this.scareAnimal("tiger");
        });
        this.input.keyboard.on('keydown-Q', () => {
            this.scareAnimal("parrot");
        });
        this.input.keyboard.on('keydown-C', () => {
            this.scareAnimal("snake");
        });

        if (this.timeInSeconds === 0) {
            this.running = false;
            this.registry.set('gameOver', "timer");
            this.scene.start('GameOver');
        }
      
        if (this.monkey.angle >= this.maxAngle) {
            // this.monkey.angle = this.maxAngle;  
            this.direction = -1; 
        } else if (this.monkey.angle <= this.minAngle) {
            // this.monkey.angle = this.minAngle;  
            this.direction = 1;  
        } 
        this.monkey.angle += this.direction;

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

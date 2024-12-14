import { Scene } from 'phaser';
import Phaser from 'phaser';


import MonkeyContainer from '../containers/MonkeyContainer'


export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.running = undefined;
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
        this.animals = [{
            name: "parrot",
            x: 1200,
            y: 200,
            from: "right"
        }, {
            name: "tiger",
            x: 1200,
            y: 690,
            from: "right"
        }, {
            name: "toucan",
            x: 0,
            y: 200,
            from: "left"
        }, {
            name: "snake",
            x: 0,
            y: 650,
            from: "left"
        }];
        this.currentAnimal = "";
        this.currentAnimalImage = undefined;
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
                this.generateAnimal();
            }
        }, Phaser.Math.Between(6000, 9000));
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

    hitByAnimal() {
        if (this.currentAnimal.name != "") {
            this.running = false;
            switch (this.currentAnimal.name) {
                case "parrot": this.scene.start(`GameOverParrot`);
                case "toucan": this.scene.start(`GameOverToucan`);
                case "tiger": this.scene.start(`GameOverTiger`);
                case "snake": this.scene.start(`GameOverSnake`);
            }
        }
    }
    generateAnimal() {
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
            // this.currentAnimalImage.setScale(-1, 1);
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
        //////////// TO DO: ///////////
        // Na 15 sec inactiviteit een check van ben je er nog
        // (voor de niet-mvp) Na 1 min bananen gravity aanzetten
        // Na 1 min superbanaan
        // Na 2 min superbanaan
        // Na 2 min gravity harder
        // Na 2 min dieren vallen sneller aan

        const help = document.querySelector(".help");
        help.addEventListener('click', () => this.openInstructions);

        this.input.keyboard.on('keydown-D', () => {
            this.lastInteractionTime = 0;
            this.scareAnimal("toucan");
        });
        this.input.keyboard.on('keydown-B', () => {
            this.lastInteractionTime = 0;
            this.scareAnimal("tiger");
        });
        this.input.keyboard.on('keydown-Q', () => {
            this.lastInteractionTime = 0;
            this.scareAnimal("parrot");
        });
        this.input.keyboard.on('keydown-C', () => {
            this.lastInteractionTime = 0;
            this.scareAnimal("snake");
        });

        if (this.lastInteractionTime >= 15) {
            this.scene.switch('Pause');
            this.lastInteractionTime = 0;
        }

        if (this.timeInSeconds === 0) {
            this.running = false;
            this.scene.start('GameOver');
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.monkey.angle)
        
        if(this.cursors.left.isDown) {
            this.angularForce += 1;
            if (Math.abs(this.monkey.angle) >= 40) {
                this.monkey.display.anims.play('left5', true);
            }
            else if (Math.abs(this.monkey.angle) >= 30) {
                this.monkey.display.anims.play('left4', true);
            }
            else if (Math.abs(this.monkey.angle) >= 20) {
                this.monkey.display.anims.play('left3', true);
            }
            else if (Math.abs(this.monkey.angle) >= 10) {
                this.monkey.display.anims.play('left2', true);
            }
            else if (Math.abs(this.monkey.angle) >= 0) {
                this.monkey.display.anims.play('left1', true);
            }
        } else if (this.cursors.right.isDown) {
            this.angularForce += -1;
            if (Math.abs(this.monkey.angle) >= 40) {
                this.monkey.display.anims.play('right4', true);
            }
            else if (Math.abs(this.monkey.angle) >= 30) {
                this.monkey.display.anims.play('right3', true);
            }
            else if (Math.abs(this.monkey.angle) >= 20) {
                this.monkey.display.anims.play('right2', true);
            }
            else if (Math.abs(this.monkey.angle) >= 10) {
                this.monkey.display.anims.play('right1', true);
            }
            else if (Math.abs(this.monkey.angle) >= 0) {
                this.monkey.display.anims.play('turn', true);
            }
        }
        else if (this.monkey.angle < 2 && this.monkey.angle > -2){
            this.monkey.display.anims.play('turn', true);
        }
        this.angularForce *= 0.98;
        this.monkey.angle = this.angularForce;
    
    }
}

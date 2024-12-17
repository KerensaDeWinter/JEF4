import { Scene } from 'phaser';
import Phaser from 'phaser';


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
        this.angle = 0;
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


        setInterval(() =>{
            if (this.running) {
                this.generateAnimal();
            }
        }, Phaser.Math.Between(6000, 9000));
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

    hitByAnimal() {
        if (this.currentAnimal.name != "") {
            this.running = false;
            switch (this.currentAnimal.name) {
                case "parrot": this.registry.set("gameOver", "parrot");
                case "toucan": this.registry.set("gameOver", "toucan");
                case "tiger": this.registry.set("gameOver", "tiger");
                case "snake": this.registry.set("gameOver", "snake");
            }
            this.scene.start("GameOver");
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

        let direction = 1;
        const minAngle = -50;
        const maxAngle = 50;


        if (this.monkey.angle >= maxAngle) {
            this.monkey.angle = maxAngle;  
            direction = -1; 
        } else if (this.monkey.angle <= minAngle) {
            this.monkey.angle = minAngle;  
            direction = 1;  
        } else {
            this.monkey.angle += direction;
        }
        console.log(this.monkey.angle);
        console.log(direction);


    }
}

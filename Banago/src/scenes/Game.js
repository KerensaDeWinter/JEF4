import { Scene } from 'phaser';
import Phaser from 'phaser';
import serial from "../../serial";
import { GlobalStyles } from '../styles/GlobalStyles';


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
        this.angularForce = 0;
    }

    preload() {
    }

    create ()
    {
        this.style = new GlobalStyles();
        window.localStorage.setItem("animal", "");
        this.running = true;
        this.timeInSeconds = this.registry.get('time');
        this.score = this.registry.get('score');
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.bananas = this.physics.add.group();
        this.platforms.create(400, 970, 'ground').setScale(4).refreshBody();
        this.monkey = new MonkeyContainer(this, this.sys.game.config.width/2, 0);

        this.scoreImg = this.add.image(40, 50, 'score');
        this.scoreText = this.add.text(76, 16, '', { fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness: 4, });
        this.scoreText.setText(this.score);

        // this.physics.add.collider(this.bananas, this.platforms, this.destroyBanana, null, this);
        this.physics.add.overlap(this.monkey.physicsDisplay1, this.bananas, this.collectBananas, null, this);
        this.physics.add.overlap(this.monkey.physicsDisplay2, this.bananas, this.collectBananas, null, this);

        this.add.image(1050, 50, "clock");
        this.timeText = this.add.text(1080, 16, "3:00",{fontFamily: 'Jungle Hype', fontSize: 65, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness: 4, });

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


    openInstructions() {
        const instructions = document.querySelector('dialog');
        instructions.showModal();
    }

    hitByAnimal() {
        if (this.currentAnimal.name != "") {
            this.running = false;
            console.log(this.currentAnimal.name);
            window.localStorage.setItem("animal", "");
            switch (this.currentAnimal.name) {
                case "parrot": this.registry.set('gameOver', "parrot"); this.hitbyparrot.play(); break;
                case "toucan": this.registry.set('gameOver', "toucan"); this.hitbytoucan.play(); break;
                case "tiger": this.registry.set('gameOver', "tiger"); this.hitbytiger.play(); break;
                case "snake": this.registry.set('gameOver', "snake"); this.hitbysnake.play(); break;
            }
            setTimeout(() => {
                this.scene.start(`GameOver`);
            }, 4100)
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
        window.localStorage.setItem('animal', this.currentAnimal.name);
    
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
            window.localStorage.setItem("animal", "");
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

    dropBanana() {
        if (this.bananas.getLength()>0) {
            let random = Phaser.Math.Between(0,this.bananas.getLength()-1);
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

        this.cursors = this.input.keyboard.createCursorKeys();

        if(this.cursors.left.isDown || this.cursors.up.isDown) {
            if (this.cursors.left.isDown) {
                if (this.angularForce < 20) {
                    this.angularForce += 1;
                }
                else {
                    this.angularForce = 20;
                }
                console.log(this.angularForce);

            } else {
                if (this.angularForce < 40) {
                    this.angularForce += 1;
                } else {
                    this.angularForce = 40;
                }
                console.log(this.angularForce);
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

{
    'use strict';

    let connectButton = document.querySelector("#connect");
    // let statusDisplay = document.querySelector('#status');
    let dialog = document.querySelector('dialog');
    let port;

    const connect = () => {
        port.connect().then (() => {
            // statusDisplay.textContent = '';
            connectButton.textContent = 'Disconnect';
            dialog.style.display = 'none';
            port.onReceive = data => {
                let textDecoder = new TextDecoder();
            };
            port.onReceiveError = error => {
                console.error(error);
            };
        }, error => {
            // statusDisplay.textContent = error;
        });
    }

    const onUpdate = (firstRed, firstGreen, firstBlue, secondrgb, thirdrgb, fourthRed, fourthGreen, fourthBlue) => {
        if (!port) {
            return;
        }

        let view = new Uint8Array(8);
        view[0] = parseInt(firstRed);
        view[1] = parseInt(firstGreen);
        view[2] = parseInt(firstBlue);
        view[3] = parseInt(secondrgb);
        view[4] = parseInt(thirdrgb);
        view[5] = parseInt(fourthRed);
        view[6] = parseInt(fourthGreen);
        view[7] = parseInt(fourthBlue);
        port.send(view);
    };

    setInterval(() => {
        let animal = window.localStorage.getItem("animal");

        if (animal === "toucan") {
            onUpdate(255, 255, 255, 111, 0b011, 255, 255, 255);
        }

        else if (animal === "snake") {
            onUpdate(255, 0, 0, 111, 111, 255, 255, 255);
        }

        else if (animal === "tiger") {
            onUpdate(255, 255, 255, 111, 111, 255, 255, 0);
        }

        else if (animal === "parrot") {
            onUpdate(255, 255, 255, 0b001, 111, 255, 255, 255);
        }
        else {
            onUpdate(255, 255, 255, 111, 111, 255, 255, 255, 255, 255, 255, 255);
        }
    }, 100);

    connectButton.addEventListener('click', () => {
        if (port) {
            port.disconnect();
            connectButton.textContent = 'Connect';
            // statusDisplay.textContent = '';
            dialog.style.display = 'display';
            port = null;
        } else {
            serial.requestPort().then(selectedPort => {
                port = selectedPort;
                connect();
            }).catch(error => {
                statusDisplay.textContent = error;
            });
        }
    });

    serial.getPorts().then(ports => {
        if (ports.length == 0) {
            // statusDisplay.textContent = 'No device found.';
        } else {
            // statusDisplay.textContent = 'Connecting...';
            port = ports[0];
            connect();
        }
    });
}


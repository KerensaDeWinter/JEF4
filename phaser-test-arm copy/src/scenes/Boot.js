import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.setPath('/banago/assets');
        this.load.spritesheet('monkey', 'monkey-sprite.png', { frameWidth: 880, frameHeight: 1264 }); // 880 width
        this.load.image('background', 'Background.png');

        //Britt
        this.load.image('gameover-timer', 'gameover-timer.png');
        this.load.image('start-screen', 'start-screen.png');
        this.load.image('checkbar-1', 'checkbar-1.png');
        this.load.image('instruction-background', 'instruction-background.png');
        this.load.image('counter-background', 'countdown.png');

        this.load.spritesheet('snake', 'snake.png', { frameWidth: 432, frameHeight: 268 }); 
        this.load.spritesheet('toucan', 'toucan.png', { frameWidth: 471, frameHeight: 442 });
        this.load.spritesheet('tiger', 'tiger.png', { frameWidth: 378, frameHeight: 273 });
        this.load.spritesheet('parrot', 'parrot.png', { frameWidth: 432, frameHeight: 412 });

        this.load.image('ground', 'platform.png');
        this.load.image('banana', 'Banana.png');
        this.load.video('start', 'start.webm');
        this.load.image('drumO', 'DrumO.png');
        this.load.image('pause', 'pause.png');

        this.load.audio('monkeySound', 'sound/monkey.mp3');

        this.load.video('instructionswing', 'instructionswing.webm', true, true);
        this.load.video('instructiontoucan', 'instructiontoucan.mp4', true, true);
        this.load.video('instructiontiger', 'instructiontiger.mp4', true, true);

    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}

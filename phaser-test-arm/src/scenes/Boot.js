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

        this.load.spritesheet('snake', 'snake.png', { frameWidth: 576, frameHeight: 378 }); // done
        this.load.spritesheet('toucan', 'toucan.png', { frameWidth: 536, frameHeight: 493 }); // done
        this.load.spritesheet('tiger', 'tiger.png', { frameWidth: 431, frameHeight: 314 }); // done
        this.load.spritesheet('parrot', 'parrot.png', { frameWidth: 587, frameHeight: 560 }); // done

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

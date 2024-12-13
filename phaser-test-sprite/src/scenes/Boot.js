import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.image('monkey', '/assets/monkey-test.png');
        this.load.image('background', '/assets/Background.png');
        this.load.image('ground', '/assets/platform.png');
        this.load.image('banana', '/assets/Banana.png');
        this.load.image('hand', '/assets/Hand.png');
        this.load.image('drumO', '/assets/DrumO.png');
        this.load.audio('monkey', '/assets/sound/monkey.mp3');
        this.load.spritesheet('test', '/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}

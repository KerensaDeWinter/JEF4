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

        this.load.image('gameover-timer', 'gameover-timer.png');
        this.load.image('gameover-animal', 'gameover-animal.png');
        this.load.image('start-screen', 'start-screen.png');
        this.load.image('instruction-background', 'instruction-background.png');
        this.load.image('counter-background', 'countdown.png');

        this.load.spritesheet('snake', 'snake.png', { frameWidth: 431, frameHeight: 268 }); 
        this.load.spritesheet('toucan', 'toucan.png', { frameWidth: 470, frameHeight: 439 });
        this.load.spritesheet('tiger', 'tiger.png', { frameWidth: 378, frameHeight: 273 });
        this.load.spritesheet('parrot', 'parrot.png', { frameWidth: 432, frameHeight: 412 });
        this.load.spritesheet('snakeI', 'snakeI.png', { frameWidth: 431, frameHeight: 268 }); 
        this.load.spritesheet('toucanI', 'toucanI.png', { frameWidth: 470, frameHeight: 439 });
        this.load.spritesheet('tigerI', 'tigerI.png', { frameWidth: 378, frameHeight: 273 });
        this.load.spritesheet('parrotI', 'parrotI.png', { frameWidth: 432, frameHeight: 412 });

        this.load.image('ground', 'platform.png');
        this.load.image('banana', 'Banana.png');
        this.load.video('start', 'start.webm');
        this.load.image('drumO', 'DrumO.png');
        this.load.image('pause', 'pause.png');

        this.load.audio('monkeySound', 'sound/monkey.mp3');

        this.load.audio('drum', 'sound/drum.mp3');
        this.load.audio('gameModeButtons', 'sound/gameModeButtons.mp3');
        this.load.audio('gameoverSad', 'sound/gameoverSad.mp3');
        this.load.audio('gameoverHappy', 'sound/gameoverHappy.mp3');
        this.load.audio('middleButtons', 'sound/middleButtons.mp3');
        this.load.audio('storytelling', 'sound/storytelling.mp3');

        this.load.audio('parrotSound', 'sound/parrot.mp3');
        this.load.audio('snakeSound', 'sound/snake.mp3');
        this.load.audio('tigerSound', 'sound/tiger.mp3');
        this.load.audio('toucanSound', 'sound/toekan.mp3');

        this.load.video('instructionswing', 'instructionswing.webm', true, true);
        this.load.video('instructiontoucan', 'instructiontoucan.webm', true, true);
        this.load.video('instructiontiger', 'instructiontiger.webm', true, true);

        this.load.video('story', 'story.mp4', true);

        this.load.image('checkbar-singleDrum-1', 'checkbar-singleDrum-1.png');
        this.load.image('checkbar-singleDrum-2', 'checkbar-singleDrum-2.png');
        this.load.image('checkbar-singleDrum-3', 'checkbar-singleDrum-3.png');
        this.load.image('checkbar-singleDrum-4', 'checkbar-singleDrum-4.png');

        this.load.image('checkbar-singleRope-1', 'checkbar-singleRope-1.png');
        this.load.image('checkbar-singleRope-2', 'checkbar-singleRope-2.png');

        this.load.image('checkbar-multi-1', 'checkbar-multi-1.png');
        this.load.image('checkbar-multi-2', 'checkbar-multi-2.png');
        this.load.image('checkbar-multi-3', 'checkbar-multi-3.png');
        this.load.image('checkbar-multi-4', 'checkbar-multi-4.png');
        this.load.image('checkbar-multi-5', 'checkbar-multi-5.png');
        this.load.image('checkbar-multi-6', 'checkbar-multi-6.png');

        this.load.image('score', 'score.png');
        this.load.image('playselection', 'playselection.png');

        this.load.video('intro', 'intro.mp4', true, true);
        this.load.video('help', 'help.mp4', true, true);
        this.load.image('clock', 'clock.png');
        this.load.image('helpButton', 'help.png');

        this.load.video('hitbytoucan', 'hitByToucan.webm', true, true);
        this.load.video('hitbysnake', 'hitBySnake.webm', true, true);
        this.load.video('hitbyparrot', 'hitByParrot.webm', true, true);
        this.load.video('hitbytiger', 'hitByTiger.webm', true, true);
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}

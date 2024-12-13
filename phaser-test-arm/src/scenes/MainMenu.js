import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // let canvas = document.getElementById('game-container');
        // canvas.requestPointerLock({
        //     unadjustedMovement: true,
        // });
        this.registry.set('score', 0);
        this.registry.set('time', 180);
        this.registry.set('gameMode', undefined);

        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/3, 'BANAGO', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.orange,
            align: 'center',
        }).setOrigin(0.5, 0.5);

        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/1.6, 'drumO');
        this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/1.6, 'start');

        this.input.keyboard.on('keydown-Q', () => {

            this.scene.start('Game');

        });
        this.createAnims();
    }
    createAnims() {
        this.anims.create({
			key: 'parrot',
			frames: this.anims.generateFrameNumbers('parrot', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
        this.anims.create({
			key: 'parrotDead',
			frames: this.anims.generateFrameNumbers('parrot', { start: 2, end: 3 }),
			frameRate: 5,
			repeat: -1
		});
        this.anims.create({
			key: 'toucan',
			frames: this.anims.generateFrameNumbers('toucan', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
        this.anims.create({
			key: 'toucanDead',
			frames: this.anims.generateFrameNumbers('toucan', { start: 2, end: 3 }),
			frameRate: 5,
			repeat: -1
		});
        this.anims.create({
			key: 'snake',
			frames: this.anims.generateFrameNumbers('snake', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
        this.anims.create({
			key: 'snakeDead',
			frames: this.anims.generateFrameNumbers('snake', { start: 2, end: 3 }),
			frameRate: 5,
			repeat: -1
		});
        this.anims.create({
			key: 'tiger',
			frames: this.anims.generateFrameNumbers('tiger', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
        this.anims.create({
			key: 'tigerDead',
			frames: this.anims.generateFrameNumbers('tiger', { start: 2, end: 3 }),
			frameRate: 5,
			repeat: -1
		});

        this.anims.create({
			key: 'left1',
			frames: [ { key: 'monkey', frame: 4 } ],
			frameRate: 10,
			repeat: 1
		});

        this.anims.create({
			key: 'left2',
			frames: [ { key: 'monkey', frame: 3 } ],
			frameRate: 10,
			repeat: 1
		});
        this.anims.create({
			key: 'left3',
			frames: [ { key: 'monkey', frame: 2 } ],
			frameRate: 10,
			repeat: 1
		});
        this.anims.create({
			key: 'left4',
			frames: [ { key: 'monkey', frame: 1 } ],
			frameRate: 10,
			repeat: 1
		});
        this.anims.create({
			key: 'left5',
			frames: [ { key: 'monkey', frame: 0 } ],
			frameRate: 10,
			repeat: 1
		});

		this.anims.create({
			key: 'turn',
			frames: [ { key: 'monkey', frame: 5 } ],
			frameRate: 20
		});
	
		this.anims.create({
			key: 'right1',
			frames: [ { key: 'monkey', frame: 6 } ],
			frameRate: 10,
			repeat: 1
		});
        this.anims.create({
			key: 'right2',
			frames: [ { key: 'monkey', frame: 7 } ],
			frameRate: 10,
			repeat: 1
		});
        this.anims.create({
			key: 'right3',
			frames: [ { key: 'monkey', frame: 8 } ],
			frameRate: 10,
			repeat: 1
		});
        this.anims.create({
			key: 'right4',
			frames: [ { key: 'monkey', frame: 9 } ],
			frameRate: 10,
			repeat: 1
		});
    }

}

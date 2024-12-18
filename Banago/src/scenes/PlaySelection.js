import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class PlaySelection extends Scene
{
    constructor ()
    {
        super('PlaySelection');
    }

    create ()
    {
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'playselection');
        this.background.setScale(0.85);

        this.input.keyboard.on('keydown-D', () => {
			this.registry.set('gameMode', "multi");
            this.scene.start('Story'); 
        });
        this.input.keyboard.on('keydown-B', () => {
			this.registry.set('gameMode', "singleRope");
            this.scene.start('Story'); 
        });
		this.input.keyboard.on('keydown-C', () => {
			this.registry.set('gameMode', "singleDrum");
            this.scene.start('Story'); 
        });
        this.input.keyboard.on('keydown-F', () => {
            this.noise = this.sound.add('middleButtons');
            this.noise.play();
            this.scene.start('MainMenu'); 
        });
    }

}

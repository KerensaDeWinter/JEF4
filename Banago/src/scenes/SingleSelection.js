import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class SingleSelection extends Scene
{
    constructor ()
    {
        super('SingleSelection');
    }

    create ()
    {
        this.input.keyboard.on('keydown-B', () => {
			this.registry.set('gameMode', "singleRope");
            this.scene.start('Instructions'); 
        });
		this.input.keyboard.on('keydown-D', () => {
			this.registry.set('gameMode', "singleDrum");
            this.scene.start('Instructions'); 
        });
    }

}

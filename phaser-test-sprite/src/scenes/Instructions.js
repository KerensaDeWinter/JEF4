// de instructievideo moet afgelopen zijn en dan ga je over naar CountdownPlay
import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class Instructions extends Scene
{
    constructor ()
    {
        super('Instructions');
    }

    create ()
    {
        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/3, 'INSTRUCTIONS', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.orange,
            align: 'center',
        }).setOrigin(0.5, 0.5);
    }

    update () {
        setTimeout(() => {
            this.scene.start('Game');
        }, 3000);
    }
}

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
        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/3, 'BANAGO', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.orange,
            align: 'center',
        }).setOrigin(0.5, 0.5);

        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/1.6, 'drumO');
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/1.6, 'hand');

        this.input.keyboard.on('keydown-O', () => {

            this.scene.start('Game');

        });
        this.input.keyboard.on('keydown-Q', () => {

            console.log('Arduino check!');

        });
    }
}

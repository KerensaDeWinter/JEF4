import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';


export class GameOverParrot extends Scene
{
    constructor ()
    {
        super('GameOverParrot');
    }

    create ()
    {
        // let canvas = document.getElementById('game-container');
        // canvas.requestPointerLock({
        //     unadjustedMovement: true,
        //   });
        this.scene.stop('Game');

        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/3, 'GAME OVER', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.orange,
            align: 'center',
        }).setOrigin(0.5, 0.5);


        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}

import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class Pause extends Scene
{
    constructor ()
    {
        super('Pause');
    }

    create ()
    {
        // let canvas = document.getElementById('game-container');
        // canvas.requestPointerLock({
        //     unadjustedMovement: true,
        //   });
        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/3.5, 'Ben je er nog?', {
            fontFamily: 'Jungle Hype', fontSize: 150, color: this.style.colors.orange,
            align: 'center',
        }).setOrigin(0.5, 0.5);

        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/1.4, 'pause');

        this.input.keyboard.on('keydown-Q', () => {
            if (this.registry.get('gameMode') === "multi") {
                this.scene.switch('Game');
            }
        });
    }
}

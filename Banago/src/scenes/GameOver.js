import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';


export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
        //Britt
        // this.score = 0;
        // this.scoreText = undefined;
    }

    create ()
    {
        this.scene.stop('Game');

        this.style = new GlobalStyles(); // moet er altijd in
        if (this.registry.get('gameOver') === "timer") {
            this.background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gameover-timer');
        } else {
            this.background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gameover-animal');
        }
        this.background.setScale(0.72);

        this.add.text((this.sys.game.config.width / 2)+50, this.sys.game.config.height - 120, '2', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness:4,
            align: 'center',
        }).setOrigin(0.5, 0.5);


        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}

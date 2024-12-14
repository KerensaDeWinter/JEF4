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
        // let canvas = document.getElementById('game-container');
        // canvas.requestPointerLock({
        //     unadjustedMovement: true,
        //   });


        // Britt: hier wilde ik proberen om de score te tonen,
        // this.score = this.registry.get('score');
        // this.scoreText = this.add.text(16, 16, '', { fontSize: '2000px', fill: '#000' });
        // this.scoreText.setText('Bananas: ' + this.score);



        this.scene.stop('Game');

        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gameover-timer');
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

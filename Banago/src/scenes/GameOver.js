import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';


export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.style = new GlobalStyles(); // moet er altijd in
        if (this.registry.get('gameOver') === "timer") {
            this.background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gameover-timer');
            this.background.setScale(0.9);
        } else {
            this.background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gameover-animal');
            this.background.setScale(0.9);
        }

        this.scoreText = this.add.text((this.sys.game.config.width / 2)+60, this.sys.game.config.height - 140, '2', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.yellow100, stroke: this.style.colors.black, strokeThickness:4,
            align: 'center',
        }).setOrigin(0.5, 0.5);

        this.scoreText.setText(this.registry.get('score'));

        this.input.keyboard.on('keydown-F', () => {
            this.noise = this.sound.add('middleButtons');
            this.noise.play();
            this.scene.start('MainMenu'); 
        });

        // this.time.addEvent({
        //     delay: 10000, 
        //     callback: this.scene.start('MainMenu'),
        //     callbackScope: this,
        // });
    }
}

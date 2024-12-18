import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class Story extends Scene
{
    constructor ()
    {
        super('Story');
    }

    create ()
    {
        this.video = this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/2, 'story');
        this.video.setScale(0.85);
        this.video.play();

        setTimeout(() => {
            this.scene.start('Instructions'); 
        }, 20000);
        this.input.keyboard.on('keydown-F', () => {
            this.noise = this.sound.add('middleButtons');
            this.noise.play();
            this.scene.start('MainMenu'); 
        });

        this.noise = this.sound.add('storytelling');
        this.noise.play();
    }

}

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
        this.video = this.add.video(this.sys.game.config.width, this.sys.game.config.height, 'story');

        setTimeout(() => {
            this.video.play();
        }, 100);

        setTimeout(() => {
            this.scene.start('Instructions'); 
        }, 20000);
    }

}

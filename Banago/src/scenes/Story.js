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
        this.video.setScale(0.68);
        this.video.play();

        setTimeout(() => {
            this.scene.start('Instructions'); 
        }, 20000);
    }

}

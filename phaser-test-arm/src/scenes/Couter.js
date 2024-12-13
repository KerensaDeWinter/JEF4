import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class Counter extends Scene
{
    constructor ()
    {
        super('Counter');
        this.time = 5;
        this.timeText = undefined;
        this.running = undefined;
    }

    create ()
    {
        this.running = true;
        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/3, 'READY?', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.orange,
            align: 'center',
        }).setOrigin(0.5, 0.5);

        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/1.6, 'drumO');
        this.add.video(this.sys.game.config.width/2, this.sys.game.config.height/1.6, 'start');
        this.timeText = this.add.text(220, 30, "5",{font: '30px Arial', fill: 
            '#FFFFFF', align: 'center'});

        setInterval(() => {
            if (this.running) {
                this.updateTimer();
            }
        }, 1000);
        setTimeout(()=> {
            this.running = false;
            this.scene.start('GameSingleDrum');
        }, 5000);
    }
    updateTimer() {
        console.log("time");
        this.time--;
        this.timeText.setText(this.time);
    }
}

import { Scene } from 'phaser';
import { GlobalStyles } from '../styles/GlobalStyles';

export class Counter extends Scene
{
    constructor ()
    {
        super('Counter');
        this.remainingTime = 6;
        this.timeText = undefined;
        this.running = undefined;

    }

    create ()
    {
        
        this.running = true;
        this.style = new GlobalStyles(); // moet er altijd in
        this.background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'counter-background');

        this.timeText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Klaar?', {
            fontFamily: 'Jungle Hype', fontSize: 180, color: this.style.colors.orange, stroke: this.style.colors.black, strokeThickness: 4,
            align: 'center',
        }).setOrigin(0.5, 0.5);

        this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            repeat: 4, 
        });
        setTimeout(()=> {
            this.running = false;
            if (this.registry.get('gameMode') === "multi") {
                this.scene.start('Game');
            } else if (this.registry.get('gameMode') === "singleDrum") {
                this.scene.start('GameSingleDrum');
            } else {
                this.scene.start('GameSingleRope');
            }
        }, 6000);
        this.input.keyboard.on('keydown-F', () => {
            this.noise = this.sound.add('middleButtons');
            this.noise.play();
            this.scene.start('MainMenu'); 
        });
    }
  
    updateTimer() {
        this.remainingTime--;
        this.timeText.setText(this.remainingTime);
    }
}

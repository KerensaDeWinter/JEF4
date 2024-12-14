import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Instructions } from './scenes/Instructions';
import { Pause } from './scenes/Pause';
import { Counter } from './scenes/Counter';
import { GameSingleDrum } from './scenes/GameSingleDrum';
import { GameSingleRope } from './scenes/GameSingleRope';
import { Story } from './scenes/Story';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: window.innerHeight*1.3333,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        Boot,
        MainMenu,
        Instructions,
        Game,
        GameSingleDrum,
        GameSingleRope,
        GameOver,
        Pause,
        Counter,
        Story
    ],
    fps: {
        target: 9600,
        forceSetTimeOut: true,
    }
};

export default new Phaser.Game(config);

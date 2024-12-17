import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { GameOverParrot } from './scenes/GameOver-parrot';
import { GameOverSnake } from './scenes/GameOver-snake';
import { GameOverTiger } from './scenes/GameOver-tiger';
import { GameOverToucan } from './scenes/GameOver-toucan';
import { MainMenu } from './scenes/MainMenu';
import { Instructions } from './scenes/Instructions';
import { Counter } from './scenes/Couter';
import { GameSingleDrum } from './scenes/GameSingleDrum';
import { GameSingleRope } from './scenes/GameSingleRope';


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
        GameOverToucan,
        GameOverParrot,
        GameOverSnake,
        GameOverTiger,
        Pause,
        Counter
    ],
    fps: {
        target: 9600,
        forceSetTimeOut: true,
    }
};

export default new Phaser.Game(config);

import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Instructions } from './scenes/Instructions';
import { Counter } from './scenes/Counter';
import { GameSingleDrum } from './scenes/GameSingleDrum';
import { GameSingleRope } from './scenes/GameSingleRope';
import { Story } from './scenes/Story';
import { PlaySelection } from './scenes/PlaySelection';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    parent: 'game-container',
    backgroundColor: 'green',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
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
        Counter,
        Story,
        PlaySelection
    ],
    fps: {
        target: 60,
        forceSetTimeOut: true,
    }
};

export default new Phaser.Game(config);

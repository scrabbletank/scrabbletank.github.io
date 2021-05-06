import 'phaser';
import  { GameScene } from './scenes/GameScene';

var gameScene = new GameScene([200, 200], "DarkWorld");

var config = {
    type: Phaser.AUTO,
    parent: 'gameCanvas',
    width: 1100,
    height: 800,
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: [gameScene]
};

var game = new Phaser.Game(config);

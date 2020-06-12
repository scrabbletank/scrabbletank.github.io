import 'phaser';
import  { GameScene } from './scenes/GameScene';

var gameScene = new GameScene([200, 200], "DarkWorld");

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1100,
    height: 800,
    scale: {
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: [gameScene]
};

var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.image('logo', 'assets/logo.png');
// }

// function create ()
// {
//     var logo = this.add.image(400, 150, 'logo');

//     this.tweens.add({
//         targets: logo,
//         y: 450,
//         duration: 2000,
//         ease: 'Power2',
//         yoyo: true,
//         loop: -1
//     });

// }

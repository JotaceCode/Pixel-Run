import MainScene from "./scenes/MainScene.js";
import BootScene from "./scenes/BootScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import './style/style.css';


const config = {
  type: Phaser.AUTO,
  parent: 'game-game',
  width: 720,
  height: 480,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: [BootScene,MainScene,GameOverScene],
};

const game = new Phaser.Game(config);





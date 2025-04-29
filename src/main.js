import MainScene from "./scenes/MainScene.js";
import BootScene from "./scenes/BootScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import './style/style.css';
import PreloadScene from "./scenes/Preload.js";


const config = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  width: 720,
  height: 480,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: [PreloadScene,BootScene,MainScene,GameOverScene],
};

window.addEventListener('DOMContentLoaded', () => {
  new Phaser.Game(config);
});


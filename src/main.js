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
      debug: true,
    }
  },
  scene: [BootScene,MainScene,GameOverScene],
};

const game = new Phaser.Game(config);

// Hacer que el juego se ajuste si la ventana cambia de tamaño
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

// Cambiar a pantalla completa cuando sea necesario
window.addEventListener('keydown', (event) => {
  if (event.key === 'f') { // Puedes cambiar 'f' a cualquier tecla que quieras
    if (!game.scale.isFullscreen) {
      game.scale.startFullscreen();
    } else {
      game.scale.stopFullscreen();
    }
  }
});

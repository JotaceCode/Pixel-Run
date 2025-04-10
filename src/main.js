import MainScene from './scenes/MainScene.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: [MainScene]
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

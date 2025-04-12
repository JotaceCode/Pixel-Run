export const preloadEnemies = function () {
    this.load.spritesheet("enemy-idle", "assets/enemies/enemy-idle.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet("enemy-walk", "assets/enemies/enemy-walk.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet("enemy-attack", "assets/enemies/enemy-attack.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
  };
  
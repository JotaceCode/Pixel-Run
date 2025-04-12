export const preloadPlayer = function () {
    this.load.spritesheet("player-idle", "assets/player-idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player-jump", "assets/player-jump.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player-walk", "assets/player-walk.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player-attack", "assets/player-attack.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  };
  
export const createPlayerAnimations = function () {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player-walk", { start: 0, end: 3 }),
      frameRate: 10,
    });
  
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player-idle", { start: 0, end: 5 }),
      frameRate: 10,
    });
  
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player-jump", { start: 0, end: 8 }),
      frameRate: 10,
    });
  
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("player-attack", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0,
    });
  };
  
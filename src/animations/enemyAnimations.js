export const createEnemyAnimations = function () {
    this.anims.create({
      key: "enemy-idle",
      frames: this.anims.generateFrameNumbers("enemy-idle", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      key: "enemy-walk",
      frames: this.anims.generateFrameNumbers("enemy-walk", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      key: "enemy-attack",
      frames: this.anims.generateFrameNumbers("enemy-attack", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0,
    });
  };
  
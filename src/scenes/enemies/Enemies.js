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
  

export class createEnemies {
    constructor() {
        this.enemies = this.physics.add.group({
            key: "enemy-idle",
            repeat: 5,
            setXY: { x: 400, y: 0, stepX: 200 },
        });

        this.enemies.children.iterate(function (enemy) {
            enemy.setBounce(0.2);
            enemy.setCollideWorldBounds(true);
            enemy.setVelocityX(Phaser.Math.Between(-200, 200));
            enemy.play("enemy-idle");
        });

        this.physics.add.collider(this.enemies, this.platforms);
    }
}

// enemyAnimations.js
export const createEnemyAnimations = function () {
    this.anims.create({
      key: "enemy-idle",
      frames: this.anims.generateFrameNumbers("enemy-idle", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: "enemy-walk",
      frames: this.anims.generateFrameNumbers("enemy-walk", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: "enemy-attack",
      frames: this.anims.generateFrameNumbers("enemy-attack", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0
    });
  };
  
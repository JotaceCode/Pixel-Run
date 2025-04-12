export function createEnemies(map) {
  const enemies = this.physics.add.group({
    allowGravity: true,
    collideWorldBounds: true,
  });

  const enemyCount = Phaser.Math.Between(5, 10);
  for (let i = 0; i < enemyCount; i++) {
    const x = Phaser.Math.Between(100, map.widthInPixels - 100);
    const y = this.sys.game.config.height - 250;

    const enemy = enemies.create(x, y, "enemy-idle").setScale(0.8);
    enemy.body.setSize(32, 56);
    enemy.body.setOffset(32, 40);
    enemy.anims.play("enemy-idle", true);
  }

  return enemies;
}

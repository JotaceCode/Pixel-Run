export class Enemy extends Phaser.Physics.Arcade.Sprite {
  lifePoints = 2;
  damage = 1;
  attackRange = 40;
  patrolDistance = 200;

  constructor(scene, x, y) {
    super(scene, x, y, "enemy-idle");
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.setScale(3);
    this.setSize(32, 56);
    this.setOffset(32, 40);

    this.speed = 50;
    this.startX = x;
    this.direction = 1;
    this.isDead = false;
    this.isAttacking = false;
    this.aggroRange = 200;

    this.refreshBody();
  }

  takeDamage(amount) {
    if (this.isDead) return;

    this.lifePoints -= amount;
    if (this.lifePoints <= 0) {
      this.die();
    }
  }

  attack(target) {
    if (this.isDead) return;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);

    if (distance < this.attackRange) {
      if (target && target.takeDamage) {
        this.setVelocityX(0);
        this.anims.play("enemy-attack", true);

        // ✅ Solo reproducir "idle" si aún existe y no está muerto
        this.scene.time.delayedCall(1500, () => {
          if (this.scene && this.anims && !this.isDead && this.active) {
            this.anims.play("enemy-idle", true);
          }
        });

        target.takeDamage(this.damage);
        console.log("Enemy attacked target!");
      }
    } else {
      if (!this.isDead && this.anims) {
        this.anims.play("enemy-idle", true);
      }
      console.log("Enemy is too far to attack!");
    }
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    console.log("Enemy died!");
    
    this.anims.play("enemy-death", true);

    // ✅ Proteger el callback para evitar errores si el enemigo ya fue destruido
    this.scene.time.delayedCall(1000, () => {
      if (!this.scene || !this.active) return;
      this.setActive(false);
      this.setVisible(false);
      this.destroy(); // Esto eliminará el sprite correctamente
    });
  }

  update(player) {
    if (this.isDead || !this.active || !this.body) return;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

    // Ataque
    if (distance < 80) {
      this.anims.play("enemy-idle", true);

      if (!this.isAttacking) {
        this.isAttacking = true;
        this.attack(player);

        // Cooldown del ataque
        this.scene.time.delayedCall(2000, () => {
          if (this && this.active) {
            this.isAttacking = false;
          }
        });
      }
      return;
    }

    // Persecución
    if (distance < this.aggroRange) {
      const directionToPlayer = player.x < this.x ? -1 : 1;
      this.setVelocityX(directionToPlayer * this.speed);
      this.anims.play("enemy-walk", true);
      this.flipX = directionToPlayer < 0;
      return;
    }

    // Patrullaje
    this.setVelocityX(this.speed * this.direction);
    this.anims.play("enemy-walk", true);
    this.flipX = this.direction < 0;

    const distanceFromStart = this.x - this.startX;
    if (Math.abs(distanceFromStart) >= this.patrolDistance) {
      this.direction *= -1;
    }
  }

  // ✅ Sobrescribir destroy para cancelar futuras acciones si fuera necesario
  destroy(fromScene) {
    this.isDead = true;
    super.destroy(fromScene);
  }
}

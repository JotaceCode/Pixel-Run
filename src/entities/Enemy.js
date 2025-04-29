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
    if (this.isDead || this.isAttacking || !target || !target.active) return;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    if (distance > this.attackRange) return;

    this.isAttacking = true;
    this.setVelocityX(0);
    this.play("enemy-attack", true);

    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      const stillClose = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y) <= this.attackRange;

      if (!this.isDead && this.active && target.active && stillClose) {
        target.takeDamage(this.damage);
        console.log("✅ Enemy attacked target after animation");
      }

      if (!this.isDead && this.active) {
        this.play("enemy-idle", true);
      }

      this.scene.time.delayedCall(1000, () => {
        if (this && this.active) {
          this.isAttacking = false;
        }
      });
    });
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    console.log("Enemy died!");

    this.anims.play("enemy-death", true);

    this.scene.time.delayedCall(1000, () => {
      if (!this.scene || !this.active) return;
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    });
  }

  jump() {
    if (this.body.blocked.left || this.body.blocked.right) {
      this.setVelocityY(-300);
    }
  }

  update(player) {
    if (this.isDead || !this.active || !this.body) return;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

    this.jump();

    if (distance < 20) {
      this.attack(player);
      return;
    }

    if (distance < this.aggroRange && !this.isAttacking) {
      const directionToPlayer = player.x < this.x ? -1 : 1;
      this.setVelocityX(directionToPlayer * this.speed);
      this.anims.play("enemy-walk", true);
      this.flipX = directionToPlayer < 0;
      return;
    }

    // Patrullaje básico
    this.setVelocityX(this.speed * this.direction);
    this.anims.play("enemy-walk", true);
    this.flipX = this.direction < 0;
    console.log("direccion:" + this.direction);
    

    const distanceFromStart = this.x - this.startX;
    if (Math.abs(distanceFromStart) >= this.patrolDistance) {
      this.direction *= -1;
    } 
  }

  destroy(fromScene) {
    this.isDead = true;
    super.destroy(fromScene);
  }
}

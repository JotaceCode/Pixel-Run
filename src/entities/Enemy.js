export class Enemy extends Phaser.Physics.Arcade.Sprite {
  lifePoints = 2;
  damage = 1;

  constructor(scene, x, y) {
    super(scene, x, y, "enemy-idle");
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setScale(1.5);
    this.setSize(32, 56);
    this.setOffset(32, 40);

    this.speed = 50;

    this.startX = x; // guardar posición inicial
    this.patrolDistance = 150;
    this.direction = 1; // 1 = derecha, -1 = izquierda
    this.isDead = false;
    this.isAttacking = false; // Variable para controlar el estado de ataque
  }

  takeDamage(amount) {
    if (this.isDead) return;

    this.lifePoints -= amount;
    if (this.lifePoints <= 0) {
      this.die();
    }
  }

  attack(target) {
    if (target && target.takeDamage) {
      this.setVelocityX(0);
      this.anims.play("enemy-attack", true);
      this.scene.time.delayedCall(500, () => {
        this.anims.stop();
        this.anims.play("enemy-idle", true);
      });
      target.takeDamage(this.damage);
      console.log("Enemy attacked target!");
    }
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;

    console.log("Enemy died!");

    this.setVelocity(0);
    this.anims.play("enemy-death", true);

    this.scene.time.delayedCall(1000, () => {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    });
  }

  update(player) {
    if (this.isDead || !this.active || !this.body) return;
  
    // Si el jugador está cerca
    const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    if (player && distance < 40) {
      this.setVelocityX(0);
      this.anims.play("enemy-idle", true);
  
      if (!this.isAttacking) {
        this.isAttacking = true; // bloquear ataques durante cooldown
        this.attack(player);
  
        // Esperar 2 segundos antes de permitir otro ataque
        this.scene.time.delayedCall(4000, () => {
          this.isAttacking = false;
        });
      }else{
        
        this.setVelocityX(0);
        this.anims.play("enemy-idle", true);
      }
  
    }
  
    // Movimiento de patrullaje
    this.setVelocityX(this.speed * this.direction);
    this.anims.play("enemy-walk", true);
    this.flipX = this.direction < 0;
  
    const distanceFromStart = this.x - this.startX;
    if (Math.abs(distanceFromStart) >= this.patrolDistance) {
      this.direction *= -1;
    }
  }
  
}

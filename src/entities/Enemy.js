export class Enemy extends Phaser.Physics.Arcade.Sprite {
  lifePoints = 2;
  damage = 1;
  attackRange = 40; // Rango de ataque

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
    this.aggroRange = 200; // Rango de persecución
  }

  takeDamage(amount) {
    if (this.isDead) return;

    // Moverse hacia atrás al recibir daño IMPLEMENTAR EN EL FUTURO
    
    this.lifePoints -= amount;
    if (this.lifePoints <= 0) {
      this.die();
    }
  }

  attack(target) {
    // Verificar si el objetivo es un jugador y si está dentro del rango de ataque
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      target.x,
      target.y
    );
    if (distance < this.attackRange){
      if (target && target.takeDamage) {
        this.anims.play("enemy-attack", true);
        this.scene.time.delayedCall(500, () => {
          this.anims.stop();
          this.anims.play("enemy-idle", true);
        });
        target.takeDamage(this.damage);
        console.log("Enemy attacked target!");
      }


    }else{
      this.setVelocityX(0);
      this.anims.play("enemy-idle", true);
      console.log("Enemy is too far to attack!");
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

    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      player.x,
      player.y
    );

    // Si el jugador está cerca para atacar
    if (distance < 80) {
      this.anims.play("enemy-idle", true);
      if (!this.isAttacking) {
        this.isAttacking = true;
        this.attack(player);

        // Cooldown de 2 segundos
        this.scene.time.delayedCall(2000, () => {
          this.isAttacking = false;
        });
      }

      return;
    }

    // Si el jugador está en rango de persecución
    if (distance < this.aggroRange) {
      const directionToPlayer = player.x < this.x ? -1 : 1;
      this.setVelocityX(directionToPlayer * this.speed);
      this.anims.play("enemy-walk", true);
      this.flipX = directionToPlayer < 0;
      return;
    }

    // Patrullaje normal
    this.setVelocityX(this.speed * this.direction);
    this.anims.play("enemy-walk", true);
    this.flipX = this.direction < 0;

    const distanceFromStart = this.x - this.startX;
    if (Math.abs(distanceFromStart) >= this.patrolDistance) {
      this.direction *= -1;
    }
  }
}

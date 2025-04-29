import { actualizarVidaUI } from "../ui/utils";


export class Player extends Phaser.Physics.Arcade.Sprite {
  lifePoints = 3;
  attackPower = 1;
  attackRange = 40;

  constructor(scene, x, y) {
    super(scene, x, y, "player-idle");
    this.scene = scene;
    this.setOrigin(0.5, 0.5); 
    this.setScale(.8); // Escala del sprite
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    // Boolean para controlar el estado de ataque
    this.isAttaking = false;
    this.isDead = false;

    // Controles
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.attackKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );

    // Movimiento
    this.speed = 150;
    this.jumpPower = 300;
    this.isJumping = false;
  }

  attack() {
    // Buscar enemigos dentro del rango
    const enemigosCercanos = this.scene.enemies.getChildren().filter(enemy => {
      return (
        enemy.active &&
        Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y) <= this.attackRange
      );
    });
  
    if (enemigosCercanos.length === 0) return;
  
    // Puedes atacar a todos, o solo al primero:
    enemigosCercanos.forEach(enemy => {
      console.log("Player attacks:", enemy.name || "un enemigo");
      enemy.takeDamage(this.attackPower);
    });
  }
  

  takeDamage(damage) {
    this.lifePoints -= damage;
    actualizarVidaUI(this.lifePoints); // Actualiza la UI con la nueva vida
    console.log("Player takes damage:", damage);
    if (this.lifePoints <= 0) {
      this.die();
    }
    console.log("Player life points:", this.lifePoints);
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    console.log("Player died!");
    this.setVelocity(0);
    this.anims.play("player-death", true);
    this.scene.time.delayedCall(1000, () => {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    });
  }

  
  

  update() {
    // Verificar si el jugador está muerto o no activo
    if (this.isDead || !this.active || !this.body) return;

    // Actualizar vidas en la UI
    // no actualizar si no hay cambios
    

    actualizarVidaUI(this.lifePoints);
    
    const onGround = this.body?.onFloor?.() || this.body?.touching?.down || false;
    const currentAnim = this.anims.currentAnim?.key;

    // No permitir moverse ni hacer nada mientras ataca
    if (this.isAttaking) return;

    // Movimiento lateral
    if (this.cursors.left.isDown) {
      this.setVelocityX(-this.speed);
      this.flipX = true;
      this.anims.play("walk", true);
      this.lastDirection = "left";
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.flipX = false;
      this.anims.play("walk", true);
      this.lastDirection = "right";
    } else if (currentAnim !== "attack") {
      this.setVelocityX(0);
      this.anims.play("idle", true);
    } else {
      this.setVelocityX(0);
      this.anims.play("idle", true);
    }



    // Saltar
    if (this.cursors.up.isDown && onGround && !this.isJumping) {
      this.setVelocityY(-this.jumpPower);
      this.isJumping = true;
      this.anims.play("jump", true);
    }

    if (onGround) {
      this.isJumping = false;
    }

    // Ataque
    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      this.setVelocityX(0);
      this.anims.play("attack", true);
      this.isAttaking = true;

      // Atacar a los enemigos
      this.attack(this.scene.enemies);

      // Esperar que termine la animación para volver a permitir movimiento
      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isAttaking = false;
      });
    }

    // Ajuste de colisionador
    if (currentAnim && currentAnim !== this.currentAnim) {
      this.currentAnim = currentAnim;

      if (["walk", "idle"].includes(currentAnim)) {
        this.body.setSize(32, 64).setOffset(48, 64);
      } else if (currentAnim === "attack") {
        this.body
          .setSize(80, 64)
          .setOffset(this.lastDirection === "right" ? 40 : -3, 64);
      } else if (currentAnim === "jump") {
        this.body.setSize(28, 64).setOffset(48, 64);
      }
    }
  }
}

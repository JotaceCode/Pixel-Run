


export class Player extends Phaser.Physics.Arcade.Sprite {
  lifePoints = 3;
  attackPower = 1;
  attackRange = 50;

  constructor(scene, x, y) {
    super(scene, x, y, "player-idle");
    this.scene = scene;
    this.setOrigin(0.5, 0.5);
    this.setScale(0.8);
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

   
    // Controles
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.attackKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );


    // Movimiento
    this.speed = 200;
    this.jumpPower = 400;
    this.isJumping = false;

    
  }

  attack(enemy) {
    const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
    if (distance <= this.attackRange) {
      console.log("Player attacks with power:", this.attackPower);
      console.log("Enemy hit:", enemy);
      enemy.takeDamage(this.attackPower);
    }
  }

  takeDamage(damage) {
    this.lifePoints -= damage;
    console.log("Player takes damage:", damage);
    if (this.lifePoints <= 0) {
      this.die();
    }
    console.log("Player life points:", this.lifePoints);
  }

  die() {
    console.log("Player has died");
    // Puedes pausar la escena o cambiar a otra
    this.anims.play("death", true);
    this.setActive(false);
    this.setVisible(false);
    this.body.enable = false; // Desactivar la física del jugador
  }

  
  update() {
    if (!this.active || !this.body) return;
  
    const onGround = this.body.onFloor();
    const currentAnim = this.anims.currentAnim?.key;
  
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
  
    // Resetear salto si está en el suelo
    if (onGround) {
      this.isJumping = false;
    }
  
    // Ataque
    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      this.setVelocityX(0); // Detener movimiento
      this.anims.play("attack", true);
      //dejar un tiempo para que el ataque se ejecute
      this.scene.time.delayedCall(10000, () => {
        this.anims.play("idle", true);
      });
      this.attack(this.scene.enemies); // Atacar
    }
  
    // Ajustar colisionador según la animación
    if (currentAnim && currentAnim !== this.currentAnim) {
      this.currentAnim = currentAnim;
  
      if (["walk", "idle"].includes(currentAnim)) {
        this.body.setSize(32, 64).setOffset(48, 64);
      } else if (currentAnim === "attack") {
        this.body.setSize(80, 64).setOffset(this.lastDirection === "right" ? 40 : -3, 64);
      } else if (currentAnim === "jump") {
        this.body.setSize(28, 64).setOffset(48, 64);
      }
    }
  }

  
  
}


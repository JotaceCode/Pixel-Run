import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // Cargar recursos
    this.load.image("background", "assets/background.png");
    this.load.image("ground", "assets/ground.png");

    this.load.spritesheet("player-idle", "assets/player-idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player-jump", "assets/player-jump.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player-walk", "assets/player-walk.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player-attack", "assets/player-attack.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    // Cargar sprites enemigos
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
  }

  create() {
    // Fondo
    this.add.image(400, 300, "background").setScale(0.9); // Ajustar la escala del fondo

    // Añadir al jugador
    this.player = this.physics.add.sprite(100, this.sys.game.config.height - 250, "player-idle")
      .setScale(1.8); // Ajustar la posición del jugador

    // Añadir cámara que sigue al jugador
    this.cameras.main.setBounds(0, 0, 3000, this.sys.game.config.height); // Limitar el ancho del mundo
    this.cameras.main.startFollow(this.player, true, 1, 0.1); // Sigue al jugador con suavizado

    // Añadir el suelo
    this.platforms = this.physics.add.staticGroup();

    // Crear el suelo (ajustar la posición y tamaño)
    this.platforms.create(0, this.sys.game.config.height - 50, "ground")
      .setScale(2)  // Asegura que el suelo cubra el ancho de la pantalla
      .setOrigin(0, 0)  // Establece el origen en la parte izquierda
      .refreshBody();  // Refresca el cuerpo para que tenga la forma correcta

    // Añadir enemigo 
    this.enemy = this.physics.add.sprite(400, this.sys.game.config.height - 250, "enemy-idle")
      .setScale(1.8); // Ajustar la posición del enemigo

    // Añadir animaciones para el enemigo
    this.anims.create({
      key: "enemy-walk",
      frames: this.anims.generateFrameNumbers("enemy-walk", { start: 0, end: 5 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-idle",
      frames: this.anims.generateFrameNumbers("enemy-idle", { start: 0, end: 4 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-attack",
      frames: this.anims.generateFrameNumbers("enemy-attack", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0, // Solo se repite una vez
    });

    // Añadir colisión entre el jugador y el enemigo
    this.physics.add.collider(this.player, this.enemy, () => {
      if (this.enemy.anims.currentAnim && this.enemy.anims.currentAnim.key !== "enemy-attack") {
        this.enemy.anims.play("enemy-attack", true);
      }
      // Aquí puedes agregar lógica adicional, como restar vida al jugador o finalizar el juego
    });

    // Añadir colisión entre el enemigo y el suelo
    this.physics.add.collider(this.enemy, this.platforms);

    // Establecer que el jugador se detenga al colisionar con el suelo
    this.physics.add.collider(this.player, this.platforms);
    this.player.setCollideWorldBounds(true); // Evitar que el jugador salga del mundo
    this.player.addCollidesWith

    // Configurar la gravedad
    this.physics.world.gravity.y = 600; // Ajusta la gravedad a tu gusto

    // Animaciones del jugador
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
      frames: this.anims.generateFrameNumbers("player-jump", { start: 0, end: 7 }), // Ajustado a 3 en lugar de 8
      frameRate: 10,
    });

    // Animación de ataque
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("player-attack", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0, // Solo se repite una vez
    });

    // Crear teclas para movimiento
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear una tecla personalizada para atacar (tecla 'E')
    this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  update() {
    const onGround = this.player.body.touching.down;
    const centerX = this.cameras.main.worldView.centerX; // Centro de la cámara

    // Movimiento horizontal
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      if (this.player.anims.currentAnim && this.player.anims.currentAnim.key !== "attack") {
        this.player.anims.play("walk", true);
      }
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      if (this.player.anims.currentAnim && this.player.anims.currentAnim.key !== "attack") {
        this.player.anims.play("walk", true);
      }
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      if (this.player.anims.currentAnim && this.player.anims.currentAnim.key !== "attack") {
        this.player.anims.play("idle", true);
      }
    }

    // Movimiento del enemigo (solo si está lo suficientemente lejos)
    const distance = Math.abs(this.enemy.x - this.player.x);
    if (distance > 150) {  // Solo moverse si está más de 150 píxeles de distancia
      this.enemy.setFlipX(true);
      if (this.enemy.x < this.player.x) {
        this.enemy.setVelocityX(100);
        this.enemy.anims.play("enemy-walk", true);
      } else {
        this.enemy.setVelocityX(-100);
        this.enemy.anims.play("enemy-walk", true);
      }
    } else {
      // Aquí prevenimos que el enemigo empuje al jugador
      this.enemy.setVelocityX(0);
      this.enemy.anims.play("enemy-idle", true);

      // Si el enemigo está lo suficientemente cerca, evitamos la colisión durante el ataque
      if (this.attackKey.isDown && !this.player.anims.isPlaying) {
        this.physics.world.removeCollider(this.player.body.collider);
      } else {
        this.physics.world.addCollider(this.player.body.collider);
      }
    }

    // Ataque con la tecla E
    if (this.attackKey.isDown && !this.player.anims.isPlaying) {
      this.player.setVelocityX(0); // Detener el movimiento horizontal
      this.player.anims.play("attack", true); // Reproducir la animación de ataque
    }

    // Asegurarse de que la animación de ataque se complete y luego vuelva a idle
    if (this.player.anims.currentAnim && this.player.anims.currentAnim.key === "attack" && !this.player.anims.isPlaying) {
      this.player.anims.play("idle"); // Regresar a la animación idle
    }

    // Hacer que la cámara se mueva solo cuando el jugador pasa el centro de la pantalla
    if (this.player.x > centerX) {
      this.cameras.main.scrollX = this.player.x - centerX;
    }

    // Salto
    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-330); // Ajusta la fuerza del salto
      this.player.anims.play("jump");
    }
  }
}

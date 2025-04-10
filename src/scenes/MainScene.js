import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // Cargar recursos
    this.load.image("background", "assets/background.png");
    this.load.image("ground", "assets/ground.png"); // Asegúrate de tener esta imagen
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 90, // Ajustar al tamaño real del sprite
      frameHeight: 115, // Ajustar al tamaño real del sprite
    });
  }

  create() {
    // Fondo
    this.add.image(400, 300, "background").setScale(0.9); // Ajustar la escala del fondo

    //Agregar camara que sigue al jugador
    this.cameras.main.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

    // Agregar al jugador
    this.player = this.physics.add.sprite(100, this.sys.game.config.height - 150, "player")
    .setScale(.8); // Ajustar la posición del jugador

    // Añadir el suelo
    this.platforms = this.physics.add.staticGroup();

    // Crear el suelo (ajustar la posición y tamaño)
    this.platforms.create(0, this.sys.game.config.height - 50, "ground")
      .setScale(2)  // Asegura que el suelo cubra el ancho de la pantalla
      .setOrigin(0,0)  // Establece el origen en la parte izquierda
      .refreshBody();  // Refresca el cuerpo para que tenga la forma correcta

    // Establecer que el jugador se detenga al colisionar con el suelo
    this.physics.add.collider(this.player, this.platforms);

    // Configurar la gravedad
    this.physics.world.gravity.y = 600; // Ajusta la gravedad a tu gusto

    // Animaciones
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: 1 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "jump",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Verificar si el jugador está tocando el suelo
    const onGround = this.player.body.touching.down;

    // Movimiento horizontal
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("walk", true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("walk", true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    }

    // Salto
    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-330); // Ajusta la fuerza del salto
      this.player.anims.play("jump");
    }

    // Interactuar con objetos (ejemplo: recoger un objeto) con letra "E"
    if (this.cursors.space.isDown) {
      // Aquí puedes añadir la lógica para interactuar con objetos
      console.log("Interactuar con objeto");
    }
  }
}

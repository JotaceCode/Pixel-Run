import Phaser from "phaser";
import { preloadEnemies } from "./enemies/Enemies";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("background", "assets/background.png");

    // Cargar mapa y tileset
    this.load.tilemapTiledJSON("mundo", "assets/mundo-01.json");
    this.load.image("tiles", "assets/Proyecto nuevo.png");

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

    preloadEnemies.call(this);
  }

  create() {
    this.fondo = this.add.image(360, 220, "background").setScale(0.5);

    const map = this.make.tilemap({ key: "mundo" });
    const tileset = map.addTilesetImage("suelo1", "tiles"); // "suelo1" es el nombre del tileset en Tiled
    const sueloLayer = map.createLayer("suelo", tileset, 0, 0);
    sueloLayer.setCollisionByExclusion([-1]); // Excluye el tile -1 si existe
    sueloLayer.setCollisionByProperty({ collides: true });
    
    // Añadir player
    this.player = this.physics.add
      .sprite(100, this.sys.game.config.height - 250, "player-idle")
      .setScale(.8);

    // Colisiones con el mapa
    this.physics.add.collider(this.player, sueloLayer);

    // Cámaras
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 1, 0.1);

    // Fondo parallax
    this.fondo.setScrollFactor(0.1);
    this.fondo.setDepth(-1);

    // Gravedad
    this.physics.world.gravity.y = 600;

    // Animaciones
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player-walk", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player-idle", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player-jump", {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("player-attack", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.attackKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );
  }

  update() {
    const onGround = this.player.body.onFloor() || this.player.body.touching.down;
    const currentAnim = this.player.anims.currentAnim?.key;

    if (currentAnim !== "attack") {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("walk", true);
        this.player.setFlipX(true);
        this.lastDirection = "left";
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play("walk", true);
        this.player.setFlipX(false);
        this.lastDirection = "right";
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("idle", true);
      }

      if (this.cursors.up.isDown && onGround) {
        this.player.setVelocityY(-380);
        this.player.anims.play("jump");
      }
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.attackKey) &&
      currentAnim !== "attack"
    ) {
      this.player.setVelocityX(0);
      this.player.anims.play("attack", true);
    }

    if (currentAnim === "attack" && !this.player.anims.isPlaying) {
      this.player.anims.play("idle", true);
    }

    if (currentAnim && currentAnim !== this.currentAnim) {
      this.currentAnim = currentAnim;

      if (currentAnim === "walk") {
        this.player.body.setSize(32, 64);
        this.player.body.setOffset(48, 64);
      } else if (currentAnim === "idle") {
        this.player.body.setSize(32, 64);
        this.player.body.setOffset(48, 64);
      } else if (currentAnim === "attack") {
        this.player.body.setSize(80, 64);
        this.player.body.setOffset(
          this.lastDirection === "right" ? 40 : -3,
          64
        );
      } else if (currentAnim === "jump") {
        this.player.body.setSize(28, 64);
        this.player.body.setOffset(48, 64);
      }
    }
  }
}

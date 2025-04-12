import Phaser from "phaser";
import { preloadPlayer } from "../preload/preloadPlayer";
import { preloadEnemies } from "../preload/preloadEnemies";
import { createPlayer } from "../entities/Player";
import { createEnemies } from "../entities/Enemy";
import { createPlayerAnimations } from "../animations/playerAnimations";
import { createEnemyAnimations } from "../animations/enemyAnimations";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.tilemapTiledJSON("mundo", "assets/mundo-01.json");
    this.load.image("tiles", "assets/Proyecto nuevo.png");

    preloadPlayer.call(this);
    preloadEnemies.call(this);
  }

  create() {
    this.fondo = this.add.image(360, 220, "background").setScale(0.5);

    const map = this.make.tilemap({ key: "mundo" });
    const tileset = map.addTilesetImage("suelo1", "tiles");
    const sueloLayer = map.createLayer("suelo", tileset, 0, 0);
    sueloLayer.setCollisionByExclusion([-1]);//importante para que use el suelo de la capa
    sueloLayer.setCollisionByProperty({ collides: true });

    this.fondo.setScrollFactor(0.1);
    this.fondo.setDepth(-1);

    this.physics.world.gravity.y = 600;

    this.player = createPlayer.call(this);
    this.enemies = createEnemies.call(this, map);

    this.physics.add.collider(this.player, sueloLayer);
    this.physics.add.collider(this.enemies, sueloLayer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 1, 0.1);

    createPlayerAnimations.call(this);
    createEnemyAnimations.call(this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.attackKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );
  }

  update() {
    const onGround = this.player.body.onFloor();
    const currentAnim = this.player.anims.currentAnim?.key;

    if (currentAnim !== "attack") {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160).anims.play("walk", true).setFlipX(true);
        this.lastDirection = "left";
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160).anims.play("walk", true).setFlipX(false);
        this.lastDirection = "right";
      } else {
        this.player.setVelocityX(0).anims.play("idle", true);
      }

      if (this.cursors.up.isDown && onGround) {
        this.player.setVelocityY(-380).anims.play("jump");
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      this.player.setVelocityX(0).anims.play("attack", true);
    }

    if (currentAnim === "attack" && !this.player.anims.isPlaying) {
      this.player.anims.play("idle", true);
    }

    if (currentAnim && currentAnim !== this.currentAnim) {
      this.currentAnim = currentAnim;

      if (["walk", "idle"].includes(currentAnim)) {
        this.player.body.setSize(32, 64).setOffset(48, 64);
      } else if (currentAnim === "attack") {
        this.player.body.setSize(80, 64).setOffset(
          this.lastDirection === "right" ? 40 : -3,
          64
        );
      } else if (currentAnim === "jump") {
        this.player.body.setSize(28, 64).setOffset(48, 64);
      }
    }
  }
}

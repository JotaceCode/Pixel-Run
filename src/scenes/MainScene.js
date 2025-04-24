import Phaser from "phaser";
import { preloadPlayer } from "../preload/preloadPlayer";
import { preloadEnemies } from "../preload/preloadEnemies";
import { Enemy } from "../entities/Enemy";
import { createPlayerAnimations } from "../animations/playerAnimations";
import { createEnemyAnimations } from "../animations/enemyAnimations";
import { Player } from "../entities/Player";
import { SpeechBubble } from "../ui/SpeechBubble";

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
    sueloLayer.setCollisionByExclusion([-1]);
    sueloLayer.setCollisionByProperty({ collides: true });

    this.fondo.setScrollFactor(0.1);
    this.fondo.setDepth(-1);

    this.physics.world.gravity.y = 600;

    this.player = new Player(this, 160, this.sys.game.config.height - 50);
    this.player.setScale(0.5);
    this.player.setOrigin(0.5, 1);

    this.enemies = new Enemy(this, 400, 100);
    this.enemies.setScale(0.5);
    this.enemies.setOrigin(0.5, 1);
    this.enemies.setCollideWorldBounds(true);

    createPlayerAnimations.call(this);
    createEnemyAnimations.call(this);

    this.physics.add.collider(this.player, sueloLayer);
    this.physics.add.collider(this.enemies, sueloLayer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 1, 0.1);

    new SpeechBubble(this, "¡Hola! Este es un mensaje del narrador.", this.player, [this.enemies], {
      speed: 30,
    });
  }

  update() {
    if (!this.player || !this.player.active || !this.player.body) return;

    if (this.player.isDead) {
      this.scene.start("GameOverScene");
      return;
    }

    this.player.update();

    if (this.enemies?.update) {
      this.enemies.update(this.player);
    }
  }
}

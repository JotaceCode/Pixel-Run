import Phaser from "phaser";
import { preloadPlayer } from "../preload/preloadPlayer";
import { preloadEnemies } from "../preload/preloadEnemies";
import { Enemy } from "../entities/Enemy";
import { createPlayerAnimations } from "../animations/playerAnimations";
import { createEnemyAnimations } from "../animations/enemyAnimations";
import { Player } from "../entities/Player";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // Cargar los assets necesarios para el juego
    // Cargar el fondo y el mapa
    this.load.image("background", "assets/background.png");
    this.load.tilemapTiledJSON("mundo", "assets/mundo-01.json");
    this.load.image("tiles", "assets/Proyecto nuevo.png");

    // Cargar los sprites del jugador y el enemigo
    preloadPlayer.call(this);
    preloadEnemies.call(this);
  }

  create() {

    // Crear el fondo y el mapa
    this.fondo = this.add.image(360, 220, "background").setScale(0.5);

    const map = this.make.tilemap({ key: "mundo" });
    const tileset = map.addTilesetImage("suelo1", "tiles");
    const sueloLayer = map.createLayer("suelo", tileset, 0, 0);
    sueloLayer.setCollisionByExclusion([-1]);
    sueloLayer.setCollisionByProperty({ collides: true });

    // Mover el fondo
    this.fondo.setScrollFactor(0.1);
    this.fondo.setDepth(-1);

    // Crear el mundo físico
    this.physics.world.gravity.y = 600;

    // Crear el jugador y el enemigo
    this.player = new Player(this, 100, this.sys.game.config.height - 250);
    this.player.setScale(0.5);
    this.player.setOrigin(0.5, 1);
    this.player.showSpeech("¡Vamos a luchar!");

    this.enemies = new Enemy(this, 400, 100);
    this.enemies.setScale(0.5);
    this.enemies.setOrigin(0.5, 1);
    this.enemies.setCollideWorldBounds(true);

    // se crean las animaciones de los personajes y enemigos
    createPlayerAnimations.call(this);
    createEnemyAnimations.call(this);

    // Crear las colisiones entre el jugador, los enemigos y el suelo
    this.physics.add.collider(this.player, sueloLayer);
    this.physics.add.collider(this.enemies, sueloLayer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 1, 0.1);

    
  }

  update() {
    // Actualizar jugador y enemigos
    // Comprobar si el jugador y el enemigo están activos
    if (!this.player || !this.player.active || !this.player.body) return;
  
    // Cargar la escena de GameOver si el jugador está muerto
    // Comprobar si el jugador está muerto
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

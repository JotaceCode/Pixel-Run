import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    // Carga la imagen de fondo de Game Over si la tienes
    //this.load.image("gameover", "assets/gameover.png");
  }

  create() {
    // Mostrar fondo de Game Over centrado
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "gameover").setScale(0.5);

    // Texto de Game Over con efecto rebote
    const gameOverText = this.add.text(
      this.cameras.main.width / 2,
      100,
      "Game Over",
      { font: "40px Arial", fill: "white" }
    ).setOrigin(0.5);

    this.tweens.add({
      targets: gameOverText,
      y: 80,
      duration: 500,
      ease: "Bounce.easeOut",
      yoyo: true,
      repeat: -1,
    });

    // Instrucción para reiniciar
    const restartText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height - 100,
      "Presiona ENTER para reiniciar",
      { font: "24px Arial", fill: "white" }
    ).setOrigin(0.5);

    // Capturar la tecla ENTER
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    // Si se presiona ENTER, volver a la escena inicial
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.scene.start("BootScene");
    }
  }
}

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    this.load.image("gameover", "assets/gameover.png");
  }

  create() {
    this.add.image(360, 220, "gameover").setScale(0.5);
    this.input.on("pointerup", () => {
      this.scene.start("MainScene");
    });

    // Cuenta atrás para reiniciar el juego
    this.time.delayedCall(3000, () => {
      this.scene.start("MainScene");
    });

    // Texto de Game Over
    const style = { font: "40px Arial", fill: "white" };
    const text = this.add.text(360, 100, "Game Over", style).setOrigin(0.5);
    text.setShadow(2, 2, "#000000", 2);
    text.setStroke("#000000", 2);
    text.setAlign("center");
    text.setWordWrapWidth(600, true);
    text.setLineSpacing(10);
    text.setDepth(1); // Asegúrate de que el texto esté por encima de otros elementos
    
  }

    update() {
        // No hay lógica de actualización en esta escena
        // Press any key to restart the game
        if (this.input.activePointer.isDown) {
            this.scene.start("MainScene");
        }
    }
}
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "logo")
      .setScale(0.5);

   
    // Start after pressing enter key
    this.input.keyboard.once("keydown-ENTER", () => {
      this.scene.start("MainScene");
    });

    // animar el texto con un efecto de rebote
    this.tweens.add({
      targets: this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 100,
        "Press Enter to Start",
        { fontSize: "32px", fill: "#fff" , backgroundColor: "#000", padding: { x: 10, y: 5 } }
      ).setOrigin(0.5),
      y: "-=10",
      duration: 500,
      ease: "Bounce.easeOut",
      yoyo: true,
      repeat: -1,
    });
  }
}

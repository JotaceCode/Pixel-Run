export default class BootScene extends Phaser.Scene {
    constructor() {
      super("BootScene");
    }
  
    preload() {
      this.load.image("logo", "assets/logo.png");
    }
  
    create() {
      this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "logo").setScale(0.5);
  
      this.time.delayedCall(2000, () => {
  
        this.time.delayedCall(2000, () => {
          this.scene.start("MainScene");
        });
      });
    }
  }
  
export class SpeechBubble extends Phaser.GameObjects.Container {
  constructor(scene, text, player, enemies = [], options = {}) {
    super(scene);
    this.scene = scene;
    this.player = player;
    this.enemies = enemies;
    this.width = options.width || scene.scale.width - 40;
    this.height = options.height || 80;
    this.textContent = text;
    this.baseSpeed = options.speed || 40;
    this.speed = this.baseSpeed;

    const x = scene.scale.width / 2 - this.width / 2;
    const y = scene.scale.height - this.height - 20;
    this.setPosition(x, y);

    // Fondo del bocadillo
    const bubble = scene.add.graphics();
    bubble.fillStyle(0xffffff, 1);
    bubble.fillRoundedRect(0, 0, this.width, this.height, 12);
    bubble.lineStyle(2, 0x000000, 1);
    bubble.strokeRoundedRect(0, 0, this.width, this.height, 12);
    this.add(bubble);

    // Texto animado
    this.textObject = scene.add.text(10, 10, "", {
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#000",
      wordWrap: { width: this.width - 30 }
    });
    this.add(this.textObject);

    scene.add.existing(this);

    this.freezeCharacters();

    this.textComplete = false;
    this.typeWriterEffect(text);

    // Guardamos la referencia al evento
    this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spaceHandler = () => {
      if (!this.textComplete) {
        if (this.timer) this.timer.delay = 10;
      } else {
        this.close();
      }
    };
    scene.input.keyboard.on("keydown-SPACE", this.spaceHandler);
  }

  freezeCharacters() {
    if (this.player?.body) this.player.body.enable = false;
    if (this.enemies.length) {
      this.enemies.forEach(enemy => {
        if (enemy?.body) enemy.body.enable = false;
      });
    }
  }

  unfreezeCharacters() {
    if (this.player?.body) this.player.body.enable = true;
    if (this.enemies.length > 0) {
      this.enemies.forEach(enemy => {
        if (enemy?.body) enemy.body.enable = true;
      });
    }
  }

  typeWriterEffect(fullText) {
    let i = 0;
    this.textObject.text = "";

    this.timer = this.scene.time.addEvent({
      delay: this.speed,
      repeat: fullText.length - 1,
      callback: () => {
        this.textObject.text += fullText[i];
        i++;
        if (i >= fullText.length) {
          this.textComplete = true;
        }
      }
    });
  }

  close() {
    // Quitar el input listener de forma segura
    if (this.scene?.input?.keyboard) {
      this.scene.input.keyboard.off("keydown-SPACE", this.spaceHandler);
    }

    this.unfreezeCharacters();
  
    this.destroy();
  }
}

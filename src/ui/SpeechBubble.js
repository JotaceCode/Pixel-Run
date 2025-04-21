// src/ui/SpeechBubble.js
export class SpeechBubble extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, text, options = {}) {
      super(scene, x, y);
  
      this.scene = scene;
      this.width = width;
      this.height = height;
      this.textContent = text;
      this.speed = options.speed || 40; // ms por letra
  
      // Crear fondo gráfico
      const bubble = scene.add.graphics();
      bubble.fillStyle(0xffffff, 1);
      bubble.fillRoundedRect(0, 0, width, height, 10);
      bubble.lineStyle(2, 0x000000, 1);
      bubble.strokeRoundedRect(0, 0, width, height, 10);
      bubble.fillTriangle(width / 2 - 10, height, width / 2 + 10, height, width / 2, height + 12);
      this.add(bubble);
  
      // Crear texto
      this.textObject = scene.add.text(10, 10, "", {
        fontFamily: "Arial",
        fontSize: "14px",
        color: "#000000",
        wordWrap: { width: width - 20 },
      });
      this.add(this.textObject);
  
      // Añadir a la escena
      scene.add.existing(this);
  
      // Iniciar animación de texto
      this.typeWriterEffect(text);
    }
  
    typeWriterEffect(fullText) {
      let i = 0;
      this.textObject.text = "";
  
      this.scene.time.addEvent({
        delay: this.speed,
        repeat: fullText.length - 1,
        callback: () => {
          this.textObject.text += fullText[i];
          i++;
        },
      });
    }
  }
  
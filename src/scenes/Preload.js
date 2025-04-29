export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.spritesheet("made", "assets/load1.png", {
            frameWidth: 700,
            frameHeight: 480
        });
        this.load.spritesheet("made2", "assets/load2.png", {
            frameWidth: 700,
            frameHeight: 480
        });
    }

    create() {
        this.anims.create({
            key: "logoAnim1",
            frames: this.anims.generateFrameNumbers("made", { start: 0, end: 64 }),
            frameRate: 24,
            repeat: 0
        });

        this.anims.create({
            key: "logoAnim2",
            frames: this.anims.generateFrameNumbers("made2", { start: 0, end: 64 }),
            frameRate: 24,
            repeat: 0
        });

        // Sprite
        const logo = this.add.sprite(330, 200, "made")
            .setScale(1)
            .play("logoAnim1");

        // Cuando termina la primera animación...
        logo.on('animationcomplete-logoAnim1', () => {
            logo.setTexture('made2'); // Cambia el spritesheet
            logo.play('logoAnim2');   // Reproduce la segunda animación
        });

        

        // Y cuando termina la segunda animación, cambiamos de escena
        logo.on('animationcomplete-logoAnim2', () => {
            this.scene.start("BootScene");
        });
    }
}
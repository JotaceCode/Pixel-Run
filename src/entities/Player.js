export function createPlayer() {
    const player = this.physics.add
      .sprite(100, this.sys.game.config.height - 250, "player-idle")
      .setScale(0.8);
  
    return player;
  }
  
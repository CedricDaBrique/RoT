let gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 900,
    backgroundColor: '#BCE6E5',
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {

            debug : true,
            gravity: { y: 600},
            fps : 60
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);

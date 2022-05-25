let gameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#5fcde4',
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {

            debug : false ,
            gravity: { y: 600},
            fps : 60
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);

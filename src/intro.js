class intro extends Phaser.Scene{

    constructor() {
        super("menu");
    }

    preload(){

    }

    create(){

        this.scene.start("menu");

    }

}
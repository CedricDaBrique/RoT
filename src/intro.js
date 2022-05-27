class intro extends Phaser.Scene{

    constructor() {
        super("menuGame");
    }

    preload(){
        this.load.image("bouton1", "assets/menu/bouton1.png");
        this.load.image("bouton2", "assets/menu/bouton2.png");
        this.load.image("menu", "assets/menu/menu.png");

    }

    create(){
        this.scale.resize(1000, 800);
        const menu= this.add.image(0, 0, 'menu').setOrigin(0, 0);
        let bouton1 = this.add.image(500,680,'bouton1');
        //button.setScale(1);
        bouton1.setInteractive();
        bouton1.on("pointerover",()=>{
            console.log("over")
            bouton1.setTexture('bouton2')
        })
        bouton1.on("pointerout",()=>{
            console.log("out")
            bouton1.setTexture('bouton1')
        })
        bouton1.on("pointerup",()=>{
            console.log("up")
            bouton1.setTexture('bouton2')
            this.scene.start("mainGame")

        })

    }

}
class credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload(){

        this.load.image('end', 'assets/menu/btfin.png');
        this.load.image('fin', 'assets/menu/end.png');
    }

    create() {

        const back = this.add.image(0, 0, 'fin').setOrigin(0, 0);


        const buttonNextSprite = this.add.image(330, 700, 'end')
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0.7)
            .setVisible(true);

        this.buttonNext = this.add.rectangle(buttonNextSprite.x, buttonNextSprite.y,350,150,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                this.scene.start('menuGame');
                this.buttonNext.disableInteractive();


            })
            .on('pointerover',function(){
                buttonNextSprite.setAlpha(1);
            })
            .on('pointerout',function(){
                buttonNextSprite.setAlpha(0.7);
            })

    }
}
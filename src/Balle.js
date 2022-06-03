class Balle {
    constructor(Tableau1) {
        let me = this
        this.scene = Tableau1
        this.balle = this.scene.physics.add.sprite(this.scene.boss.x, this.scene.boss.y, 'tir').setOrigin(0, 0);
        this.balle.setDisplaySize(17, 17);
        this.balle.body.setBounce(1.1, 1.1);
        this.balle.body.setMaxVelocityX(800);
        this.balle.body.setMaxVelocityY(700);
        this.balle.body.setAllowGravity(false)

        this.scene.physics.moveToObject(this.balle, this.scene.player, 200);

        this.scene.physics.add.collider(this.balle, this.scene.player, function () {
            me.scene.respawn()

        })

        this.scene.physics.add.overlap(this.balle, this.scene.collidersMur, function()
        {
            me.balle.destroy()
        });

    }
}
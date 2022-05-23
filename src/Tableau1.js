class Tableau1 extends Phaser.Scene {


    preload() {

        this.load.image("tilemap2", "assets/tiLed.png");

        this.load.image("bg", "assets/TEST1.png");
        this.load.image("bgf", "assets/bg2.png");
        this.load.image("bgf2", "assets/bg3.png");
        this.load.image("vide", "assets/images/vide.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
        //chargement des animations
        for(let i=1;i<=5;i++){
            this.load.image('player'+i, 'assets/idle/idle'+i+'.png');
        }
        for(let i=1;i<=4;i++){
            this.load.image('dash'+i, 'assets/animation/dash/dash'+i+'.png');
        }
        for(let i=1;i<=7;i++){
            this.load.image('jump'+i, 'assets/animation/jump/jump'+i+'.png');
        }
        for(let i=1;i<=6;i++){
            this.load.image('move'+i, 'assets/animation/Move/Move'+i+'.png');
        }
    }


    onEvent() {
    }

    create() {

        this.turn = false;
        this.jump = false;


        this.largeurniveau = 8064;
        this.hauteurniveau = 8064;
        this.largeurcamera = 1200;
        this.hauteurcamera = 640;


        this.cursors = this.input.keyboard.createCursorKeys();

        //CAMERA
        this.zoom = 1.5;
        this.cameras.main.setZoom(this.zoom);

        //Ajout de l'arrière plan
        this.bg2 = this.add.sprite(0,0, 'bg').setOrigin(0,0);
        this.bg = this.add.sprite(0,0, 'bg').setOrigin(0,1);
        this.bg3 = this.add.sprite(0,0, 'bg').setOrigin(0,2);
        this.bgf = this.add.sprite(0,0, 'bgf').setOrigin(0,3);



        this.speed = {
            speedDash: 1,
        }

        this.dash = this.tweens.add({
            targets: this.speed,
            speedDash: 0,
            ease: "Circ.easeInOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 300,
            //onUpdate : function (){
                //this.player.setVelocityX(900 * this.speedDash);
            //}

        });


        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        /*
        const tileset = map.addTilesetImage(
            "game_tile",
            "tilemap2"
        );

         */

        const tileset2 = map.addTilesetImage('tiled', 'tilemap2');

        // chargement du calque plateformes
        const platforms = map.createLayer(
            "calque_plateformes",
            tileset2
        );

        // chargement du calque décors
        /*
        const decors = map.createLayer(
            "calque_objet_visible",
            tileset
        );

         */

        // chargement du calque plateformes
        const platform = map.createLayer(
            "plateforme",
            tileset2
        );

        this.speciales = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('platforms_colliders').objects.forEach((platform) => {
            this.specialesboup = this.speciales.create(platform.x, platform.y-platform.height,'vide').setOrigin(0).setDisplaySize(platform.width,platform.height);
        });

        this.collidersMur = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('colliders').objects.forEach((collider) => {
            console.log("collider",collider);
            this.colliderMurboup = this.collidersMur.create(collider.x, collider.y,'vide')
                                                    .setRotation(Phaser.Math.DegToRad(collider.rotation))
                                                    .setOrigin(0)
                                                    .setDisplaySize(collider.width,collider.height);
        });

        platforms.setCollisionByExclusion(-1, true);

        // Création du personnage de base
        this.player = this.physics.add.sprite(150, 200, 'player1').setOrigin(0, 0);
        this.player.setDisplaySize(64, 64);
        this.player.body.setAllowGravity(true);
        this.player.setVisible(true);
        this.player.setVelocityY(0);
        //this.player.setBodySize(1,1)
        this.player.scale = 0.6

        //Creation des animations du personnage
        this.anims.create({
            key: 'player',
            //frames: this.getFrames('player', 5),
            frames: [
                {key:'player1'},
                {key:'player2'},
                {key:'player3'},
                {key:'player4'},
                {key:'player5'},
            ],
            frameRate: 5,
            repeat: -1,
        });
        this.player.play('player');

        this.anims.create({
            key: 'jump',
            frames: [
                {key:'jump1'},
                {key:'jump2'},
                {key:'jump3'},
                {key:'jump4'},
                {key:'jump5'},
                {key:'jump6'},
                {key:'jump7'},
            ],
            frameRate: 7,

        });

        this.anims.create({
            key: 'dash',
            frames: [
                {key:'dash1'},
                {key:'dash2'},
                {key:'dash3'},
                {key:'dash4'},
            ],
            frameRate: 4,
        });

        this.anims.create({
            key: 'move',
            frames: [
                {key:'move1'},
                {key:'move2'},
                {key:'move3'},
                {key:'move4'},
                {key:'move5'},
                {key:'move6'},
            ],
            frameRate: 6,
            repeat: -1,
        });


        // Creation des collision
        this.physics.add.collider(this.player, this.collidersMur);

        this.physics.add.collider(this.player, this.speciales);



        this.cameras.main.startFollow(this.player);


        this.initKeyboard();
    }

    // fonction pour faire regarder s'il y a un overlaps donc deux objets qui se touche pour l'utilisé plus facilement.

    checkCollider(Objet1x, Objet1y, Object1TailleLargeur, Object1TailleHauteur, Objet2x, Objet2y, Objet2TaileLargeur, Objet2TailleHauteur) {
        if (Objet1x + Object1TailleLargeur > Objet2x && Objet1x < Objet2x + Objet2TaileLargeur
            &&
            Objet1y + Object1TailleHauteur > Objet2y && Objet1y < Objet2y + Objet2TailleHauteur) {
            // Si toutes les conditons sont vrais alors il y a bien un overlaps, on renvoie donc true/vrai a notre foncion sinon on ne renvoie rien
            return true
        }
    }


    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.leftDown = false
                    me.player.setVelocityX(0);
                    me.player.play('player');



                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.rightDown = false;
                    me.player.setVelocityX(0);
                    me.player.play('player');



                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown = false;
                    me.player.stop("dash")
                    break;

                default:
                    me.player.play('player')
                    break;




            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:


                    me.gauche = true;
                    me.player.setVelocityX(-200);
                    me.leftDown=true;
                    console.log(me.gauche)
                    if (this.gauche === true){
                        me.player.flipX(true)
                    }
                    me.player.play('move',true);



                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.rightDown = true
                        me.player.setVelocityX(300);
                        me.gauche = false
                        me.turn = false;
                        console.log(me.gauche)
                    me.player.play('move',true);

                        if (this.gauche === false){

                    }
                    else{
                        me.player.setFlipX(false)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.player.body.onFloor())
                    {
                        me.player.setVelocityY(-500);
                        me.player.play('jump');
                        this.jump = true;
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown = true;
                    me.player.play('dash');
                    break;







            }
        })
    }

    stop(){
        console.log("stop")
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {

            this.player.play('player',true)
        }
    }

    update(){

       let me = this
        console.log(this.jump);
       // me.cameras.main.startFollow(me.player.player, true, 0, 0,0,0).setDeadzone(undefined,0);
        if (this.jump === true)
        {

            if(this.player.body.onFloor())
            {
                this.player.play('player');
                this.jump = false;
            }
        }

        if (this.player.body.velocity.y >= 0)
        {
            for (var i = 0; i<this.speciales.getChildren().length;i++)
            {
                this.speciales.getChildren()[i].body.enable = true;
            }
        }
        else
        {

            for (var i = 0 ; i < this.speciales.getChildren().length ;i++)
            {
                this.speciales.getChildren()[i].body.enable = false;
            }
        }


        if (this.shiftDown && this.rightDown) {
            if (this.flag) {

            } else {
                this.dash.play();
                this.flag = true;
            }
            this.player.setVelocityX(4000 * this.speed.speedDash);
            console.log(this.speed.speedDash);
        }

        if (this.shiftDown && this.leftDown) {
            if (this.flag) {

            } else {
                this.dash.play();
                this.flag = true;
            }
            this.player.setVelocityX(-4000 * this.speed.speedDash);
            console.log(this.speed.speedDash);
        }

        if (!this.shiftDown) {
            if (this.flag) {
                this.flag = false;
            }
        }

        if (!this.shiftDown && this.rightDown) {
            this.player.setVelocityX(200);
        } else if (!this.shiftDown && this.leftDown) {
            this.player.flipX = true;
            this.player.setVelocityX(-200);
        }











    }


}
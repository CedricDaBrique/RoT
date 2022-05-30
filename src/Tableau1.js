class Tableau1 extends Phaser.Scene {

    constructor() {
        super("mainGame");
    }

    preload() {

        this.load.image("tilemap2", "assets/tiled.png");
        //d
        this.load.image("bg", "assets/TEST1.png");
        this.load.image("bg2", "assets/test2.png");
        this.load.image("bgf", "assets/bg2.png");
        this.load.image("bgf2", "assets/bg3.png");
        this.load.image("vide", "assets/images/vide.png");
        this.load.image("so", "assets/parallax.png");
        this.load.image("bgb", "assets/bgb.png");


        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
        //chargement des animations
        for (let i = 1; i <= 5; i++) {
            this.load.image('player' + i, 'assets/idle/idle' + i + '.png');
        }
        for (let i = 1; i <= 24; i++) {
            this.load.image('laser' + i, 'assets/animation/laser/laser' + i + '.png');
        }
        for (let i = 1; i <= 4; i++) {
            this.load.image('dash' + i, 'assets/animation/dash/dash' + i + '.png');
        }
        for (let i = 1; i <= 7; i++) {
            this.load.image('jump' + i, 'assets/animation/jump/jump' + i + '.png');
        }
        for (let i = 1; i <= 6; i++) {
            this.load.image('move' + i, 'assets/animation/Move/Move' + i + '.png');
        }
        for (let i = 1; i <= 4; i++) {
            this.load.image('teleporter' + i, 'assets/animation/teleporter/teleporter' + i + '.png');
        }
        for (let i = 1; i <= 6; i++) {
            this.load.image('boss' + i, 'assets/animation/boss/antagoniste' + i + '.png');
        }
        for (let i = 1; i <= 7; i++) {
            this.load.image('ennemi' + i, 'assets/animation/ennemi/ennemis' + i + '.png');
        }
        for (let i = 1; i <= 9; i++) {
            this.load.image('death' + i, 'assets/animation/death/death' + i + '.png');
        }
        for (let i = 1; i <= 8; i++) {
            this.load.image('balancier' + i, 'assets/animation/balancier/balancier' + i + '.png');
        }
    }


    onEvent() {
    }

    create() {
        let me = this;



        this.scale.resize(1000, 800);
        this.turn = false;
        this.cursors = this.input.keyboard.createCursorKeys();


        //CAMERA


        //Ajout de l'arrière plan
        this.bg2 = this.add.sprite(0, -3200, 'bg2').setOrigin(0, 0);
        this.bg = this.add.sprite(0, -3200, 'bg').setOrigin(0, 0);
        this.bgb = this.add.sprite(-700, -6000, 'bgb').setOrigin(0, 0);


        this.so = this.add.sprite(-3010, 1900, 'so').setOrigin(0, 0);
        this.so2 = this.add.sprite(-2010, 1900, 'so').setOrigin(0, 0);
        this.so3 = this.add.sprite(-1010, 2000, 'so').setOrigin(0, 0);

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

        const decors = map.createLayer(
            "decors",
            tileset2
        );

        const spike = map.createLayer(
            "spike",
            tileset2
        );


        this.speciales = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('platforms_colliders').objects.forEach((platform) => {
            this.specialesboup = this.speciales.create(platform.x, platform.y - platform.height, 'vide').setOrigin(0).setDisplaySize(platform.width, platform.height);
        });

        this.checkpoint=this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('checkpoint').objects.forEach((point)=>{
        this. checkpoint_boup = this.checkpoint.create(point.x, point.y, "vide").setOrigin(0).setDisplaySize(point.width, point.height);
        });

        this.collidersMur = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('colliders').objects.forEach((collider) => {

            this.colliderMurboup = this.collidersMur.create(collider.x, collider.y, 'vide')
                .setRotation(Phaser.Math.DegToRad(collider.rotation))
                .setOrigin(0)
                .setDisplaySize(collider.width, collider.height);
        });


        this.spikecolliders = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('spikecolliders').objects.forEach((oignon) => {
            this.spikecollider = this.spikecolliders.create(oignon.x,oignon.y, 'vide').setOrigin(0).setDisplaySize(oignon.width, oignon.height);
        });





        platforms.setCollisionByExclusion(-1, true);


        // Création du personnage de base
        this.player = this.physics.add.sprite(-3040 , 2200, 'player1').setOrigin(0, 0); ///750  -2900
        this.player.setDisplaySize(64, 64);
        this.player.body.setAllowGravity(true);
        this.player.setVisible(true);
        this.player.setSize(100, 135);
        this.player.setOffset(40, 40);
        this.player.setVelocityY(0);
        this.player.scale = 0.6

        this.physics.add.overlap(this.player, this.checkpoint, function()
        {
            me.checkpointX = me.player.x;
            me.checkpointY = me.player.y;
        });

        //Ajouts d'animations
        this.teleporter1 = this.add.sprite(190, 2260, 'teleporter').setOrigin(0, 0);
        this.teleporter2 = this.add.sprite(640, 595, 'teleporter').setOrigin(0, 0);
        this.teleporter3 = this.add.sprite(740, -3090, 'teleporter').setOrigin(0, 0);
        this.teleporter4 = this.add.sprite(740, -4655, 'teleporter').setOrigin(0, 0);
        this.balancier1 = this.add.sprite(110, 155, 'balancier').setOrigin(0, 0);
        this.balancier2 = this.add.sprite(885, -100, 'balancier').setOrigin(0, 0).setDisplaySize(50  ,50);

        this.boss = this.add.sprite(800, -5248, 'boss').setOrigin(0, 0);
        this.ennemi = this.add.sprite(-767, 2220, 'ennemi').setOrigin(0, 0);



        this.ennemi1 = this.add.sprite(1230, -1950, 'ennemi').setOrigin(0, 0);
        var tween = this.tweens.add({
            targets: this.ennemi1,
            x: 600,
            ease: 'ennemi1',
            duration: 3000,
            flipX: true,
            yoyo: true,
            repeat: -1,
            onStart: function () { console.log('onStart'); console.log(arguments); },
            onComplete: function () { console.log('onComplete'); console.log(arguments); },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });


        this.ennemi2 = this.add.sprite(200, -2320, 'ennemi').setOrigin(0, 0).setFlipX(true);
        var tween = this.tweens.add({
            targets: this.ennemi2,
            x: 600,
            ease: 'ennemi2',
            duration: 3000,
            flipX: true,
            yoyo: true,
            repeat: -1,
            onStart: function () { console.log('onStart'); console.log(arguments); },
            onComplete: function () { console.log('onComplete'); console.log(arguments); },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
















        //Creation des animations
        this.anims.create({
            key: 'player',
            //frames: this.getFrames('player', 5),
            frames: [
                {key: 'player1'},
                {key: 'player2'},
                {key: 'player3'},
                {key: 'player4'},
                {key: 'player5'},
            ],
            frameRate: 5,
            repeat: -1,
        });
        this.player.play('player');

        this.anims.create({
            key: 'jump',
            frames: [
                {key: 'jump1'},
                {key: 'jump2'},
                {key: 'jump3'},
                {key: 'jump4'},
                {key: 'jump5'},
                {key: 'jump6'},
                {key: 'jump7'},
            ],
            frameRate: 7,

        });


        this.anims.create({
            key: 'balancier',
            frames: [
                {key: 'balancier1'},
                {key: 'balancier2'},
                {key: 'balancier3'},
                {key: 'balancier4'},
                {key: 'balancier5'},
                {key: 'balancier6'},
                {key: 'balancier7'},
                {key: 'balancier8'}
            ],
            frameRate: 8,
            repeat : -1,

        });
        this.balancier1.play('balancier');
        this.balancier2.play('balancier');

        this.anims.create({
            key: 'dash',
            frames: [
                {key: 'dash1'},
                {key: 'dash2'},
                {key: 'dash3'},
                {key: 'dash4'},
            ],
            frameRate: 4,
        });
        this.anims.create({
            key: 'death',
            frames: [
                {key: 'death1'},
                {key: 'death2'},
                {key: 'death3'},
                {key: 'death4'},
                {key: 'death5'},
                {key: 'death6'},
                {key: 'death7'},
                {key: 'death8'},
                {key: 'death9'},
            ],
            frameRate: 9,
        });

        this.anims.create({
            key: 'move',
            frames: [
                {key: 'move1'},
                {key: 'move2'},
                {key: 'move3'},
                {key: 'move4'},
                {key: 'move5'},
                {key: 'move6'},
            ],
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: 'ennemi',
            frames: [
                {key: 'ennemi1'},
                {key: 'ennemi2'},
                {key: 'ennemi3'},
                {key: 'ennemi4'},
                {key: 'ennemi5'},
                {key: 'ennemi6'},
                {key: 'ennemi7'},
            ],
            frameRate: 7,
            repeat: -1,
        });
        this.ennemi.play('ennemi');
        this.ennemi1.play('ennemi');
        this.ennemi2.play('ennemi');


        this.anims.create({
            key: 'boss',
            frames: [
                {key: 'boss1'},
                {key: 'boss2'},
                {key: 'boss3'},
                {key: 'boss4'},
                {key: 'boss5'},
                {key: 'boss6'},
            ],
            frameRate: 6,
            repeat: -1,

        });
        this.boss.play('boss');

        this.anims.crea
        this.anims.create({
            key: 'teleporter',
            frames: [
                {key: 'teleporter1'},
                {key: 'teleporter2'},
                {key: 'teleporter3'},
                {key: 'teleporter4'},

            ],
            frameRate: 6,
            repeat: -1,



        });
        this.teleporter1.play('teleporter');
        this.teleporter2.play('teleporter');
        this.teleporter3.play('teleporter');
        this.teleporter4.play('teleporter');


        this.anims.create({
            key: 'laser',
            frames: [
                {key: 'laser1'},
                {key: 'laser2'},
                {key: 'laser3'},
                {key: 'laser4'},
                {key: 'laser5'},
                {key: 'laser6'},
                {key: 'laser7'},
                {key: 'laser8'},
                {key: 'laser9'},
                {key: 'laser10'},
                {key: 'laser11'},
                {key: 'laser12'},
                {key: 'laser13'},
                {key: 'laser14'},
                {key: 'laser15'},
                {key: 'laser16'},
                {key: 'laser17'},
                {key: 'laser18'},
                {key: 'laser19'},
                {key: 'laser20'},
                {key: 'laser21'},
                {key: 'laser22'},
                {key: 'laser23'},
                {key: 'laser24'},
            ],
            frameRate: 24,

        });



        // Creation des collision
        this.physics.add.collider(this.player, this.collidersMur);
        this.physics.add.collider(this.player, this.spikecolliders,function()
        {
            me.respawn();
        });

        this.physics.add.collider(this.player, this.speciales);




        //this.cameras.main.startFollow(this.player, false);
        this.cameras.main.startFollow(this.player, true)
        ;


        this.initKeyboard();

        const objectsLayer = map.getObjectLayer('tp')
         objectsLayer.objects.forEach(objData => {
            const {x = 0, y = 0, name} = objData

            switch (name) {
                case 'tp1': {
                    this.tp1 = this.physics.add.sprite(x, y , 'teleporter').setOrigin(0, 0);

                    this.tp1.setDisplaySize(64, 64);
                    this.tp1.body.setAllowGravity(false);
                    this.tp1.setVisible(false);


                    this.physics.add.collider(this.tp1, this.collidersMur)



                }
                case 'tp2': {

                    let me = this;
                    this.tp2 = this.physics.add.sprite(x, y , 'teleporter').setOrigin(0, 0);

                    this.tp2.setDisplaySize(64, 64);
                    this.tp2.body.setAllowGravity(false);
                    this.tp2.setVisible(false);

                    this.physics.add.collider(this.tp2, this.collidersMur)

                    this.physics.add.overlap(this.player, this.tp1, function () {

                        me.player.x = me.tp2.x
                        me.player.y = me.tp2.y - 100
                    })

                    break;
                }
                case 'tp3': {

                    this.tp3 = this.physics.add.sprite(x, y, 'teleporter').setOrigin(0, 0);

                    this.tp3.setDisplaySize(64, 64);
                    this.tp3.body.setAllowGravity(false);
                    this.tp3.setVisible(false);
                    this.physics.add.collider(this.tp3, this.collidersMur)




                }
                case 'tp4': {

                    let me = this;
                    this.tp4 = this.physics.add.sprite(x, y, 'teleporter').setOrigin(0, 0);
                    this.tp4.setDisplaySize(64, 64);
                    this.tp4.body.setAllowGravity(false);
                    this.tp4.setVisible(false);
                    this.physics.add.collider(this.tp4, this.collidersMur)
                    this.physics.add.overlap(this.player, this.tp3, function () {


                        console.log(me.tp4.x)
                        console.log(me.player.x)
                        me.player.x = me.tp4.x
                        me.player.y = me.tp4.y - 100
                    })

                }
            }
        })

        //Ajout laser
        const objectsLayerLaser = map.getObjectLayer('laser')
        objectsLayerLaser.objects.forEach(objData => {
            const {x = 0, y = 0, name} = objData
            {
                const {x = 0, y = 0, name} = objData

                switch (name) {
                    case 'laser1': {

                        this.laser1 = this.physics.add.sprite(x, y - 200, 'laser1').setOrigin(0, 0);
                        this.laser1.body.setAllowGravity(false);
                        this.laser1.setVisible(true);
                        this.time.addEvent({
                            delay: 5000,
                            callback: ()=>{
                                this.laser1.play("laser")
                            },
                            loop: true
                        })
                        this.laser1.x = x;
                        this.laser1.y = y;




                    }
                    case 'laser2': {

                        this.laser2 = this.physics.add.sprite(x, y - 200, 'laser2').setOrigin(0, 0);
                        this.laser2.body.setAllowGravity(false);
                        this.laser2.setVisible(true);



                        this.time.addEvent({
                            delay: 5000,
                            callback: ()=>{
                                this.laser2.play("laser")
                            },
                            loop: true
                        })
                        this.laser2.x = x;
                        this.laser2.y = y;




                    }
                }
            }
        })
    }


    respawn()
    {

        this.player.setPosition(this.checkpointX,this.checkpointY);

    }


    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.leftDown = false
                    me.player.setVelocityX(0);
                    break;


                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.rightDown = false;
                    me.player.setVelocityX(0);
                    break;

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


                    me.player.setVelocityX(-200);
                    me.leftDown=true;

                    me.player.setFlipX(true)

                    me.player.play('move',true);



                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.rightDown = true
                        me.player.setVelocityX(300);
                        me.turn = false;

                    me.player.play('move',true);
                    me.player.setFlipX(false)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.player.body.onFloor())
                    {
                        me.player.setVelocityY(-500);
                        me.player.play('jump');
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

        // this.player.x = this.laser1.x
        // this.player.y = this.laser1.y - 100



        if(this.player.body.velocity.x===0){
            if (this.player.body.onFloor()) {
                this.player.play('player',true)
            }
        }

       let me = this

       // me.cameras.main.startFollow(me.player.player, true, 0, 0,0,0).setDeadzone(undefined,0);

            if(this.player.body.velocity < 0)
            {
                this.player.play('player');
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
            this.player.setVelocityX(1500 * this.speed.speedDash);
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
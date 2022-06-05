import Palas from "../gameObjects/palas.js"
class Scene_play extends Phaser.Scene{
    constructor(){
        super({key:"Scene_play"});
    }

    create(){
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        //Separador
        this.add.image(center_width, center_height, "separador");
        //Palas
        //this.izquierda = this.add.image(30, center_height, "izquierda");
        this.izquierda = new Palas(this, 30, center_height, "izquierda");
        
        //this.derecha = this.add.image(this.sys.game.config.width-30, center_height, "derecha");
        this.derecha = new Palas(this, this.sys.game.config.width-30, center_height, "derecha" )
        
        //Bola
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.bola = this.physics.add.image(center_width, center_height, "bola");
        this.bola.setCollideWorldBounds(true);
        this.bola.setBounce(1.1);
        this.bola.setVelocityX(-180);

        //Fisicas
        this.physics.add.collider(this.bola, this.izquierda, this.chocaPala , null, this);
        this.physics.add.collider(this.bola, this.derecha, this.chocaPala ,null, this);

        //Controles
        //Pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();
        //Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        if(this.bola.x <0 || this.bola.x > this.sys.game.config.width){
            this.bola.setPosition(center_width, center_height);
            const posiciones = [-180, 180];
            const posicion = Math.floor(Math.random() * posiciones.length);

            this.bola.setVelocityX(posiciones[posicion]);
        }
        // control de las palas
        // Control de pala derecha
        if (this.cursor.down.isDown) {
            this.derecha.body.setVelocityY(300);
        } else {
            if (this.cursor.up.isDown) {
                this.derecha.body.setVelocityY(-300);
            } else {
                this.derecha.body.setVelocityY(0);
            }
        }

        // Control pala izquierda
        if (this.cursor_S.isDown) {
            this.izquierda.body.setVelocityY(300);
        } else {
            if (this.cursor_W.isDown) {
                this.izquierda.body.setVelocityY(-300);
            } else {
                this.izquierda.body.setVelocityY(0);
            }
            
            
        }

    }

    chocaPala(){
        this.bola.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}

export default Scene_play; 
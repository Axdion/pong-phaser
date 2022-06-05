

class Bootloader extends Phaser.Scene{
    constructor(){
        super({key:"Bootloader"});
    }

    preload(){
        this.load.on("complete", ()=>{
            this.scene.start("Scene_play");
        });

        this.load.image("bola", "./assets/ball.png");
        this.load.image("izquierda", "./assets/izquierda.png");
        this.load.image("derecha", "./assets/derecha.png");
        this.load.image("separador", "./assets/separador.png");

        
    }

    create(){
        
    }
}

export default Bootloader;

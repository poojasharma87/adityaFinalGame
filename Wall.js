class WallPair{
    constructor(x1, y1, x2, y2, player){
        this.wall1 = createSprite(x1, y1, 500, 40);
        this.wall2 = createSprite(x2, y2, 500, 40);
        this.wall1.shapeColor = "white";
        this.wall2.shapeColor = "white";
        this.player = player;
        this.a = 0;
        this.b = 0;
    }

    move(rand){
        if(rand === 3){
        if(this.a === 0){
            this.wall1.velocityX = 0;
            this.wall2.velocityX = 0;
            }

            if(true){
                if(this.b === 0){
                    this.wall1.velocityX = 40;
                    this.wall2.velocityX = -40;
                    this.a = 1;
                    this.b = 1;
                    }
                   

                if(this.wall1.x > 1300){
                    this.wall1.velocityX = -40;
                    this.wall2.velocityX = 40;
                }
                    
                }
            }
            if(this.wall1.x < 750){
                this.b = 0;
                this.a = 0;
                this.wall1.velocityX = 0;
                this.wall2.velocityX = 0;
                this.wall1.x = 750;
                this.wall2.x = 235;
        }

    }

    Check(){
        if(this.wall1.isTouching(this.player)){
            console.log("GAME OVER");
            return true;
        }
    }

    stop(){
        this.wall1.x = 800;
        this.wall2.x = 200;
    }
}
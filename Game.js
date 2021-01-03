class Game {
    constructor(){
  
    }
     
    getState(){
      var gameStateRef  = database.ref("gameState");
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      car1 = createSprite(340,200);
      car1.addImage(p2)
      car1.scale=0.1
      car2 = createSprite(560,200);
      car2.addImage(p3)
      car2.scale=0.1
      car3 = createSprite(760,200);
      car3.addImage(p4)
      car3.scale=0.1
      car4 = createSprite(960,200);
      car4.addImage(p5)
      car4.scale=0.1
      cars = [car1, car2, car3, car4];
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      player.carsAddend()
      if(allPlayers !== undefined){
        background(bg)
        image(T,0,-displayHeight*4,displayWidth,displayHeight*5)
        var index = 0;
  
       
        var x = 175;
        var y;
  
        for(var plr in allPlayers){
         
        index=index+1
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
         // cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.x=displayWidth/2
            camera.position.y=cars[index-1].y
          }
         
         
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if (player.distance>3860){
        gameState=2
        player.rank=player.rank+1
        playerrank=player.rank
        Player.updatecarsAddend(player.rank)
      }
      drawSprites();
    }
    end(){
      console.log("gameEnd")
      //console.log(player.rank)
      p=createElement("h1",playerrank)
      p.position(displayWidth/2,200)
    }
  
  }
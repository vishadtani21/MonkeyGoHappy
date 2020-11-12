var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var ground, groundImage;
var survivalTime=0;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  console.log(ground.x);
  
  
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
}


function draw() {
  background("lightgreen");

  stroke("blue");
  textSize(20);
  fill("black");
  text("Survival Time: "+survivalTime,100,50);
  

  if(gameState===PLAY){
    
    survivalTime=Math.ceil(frameCount/frameRate())
    
    if(keyDown("space")&&monkey.y>=100){
        monkey.velocityY=-12;
   }

     monkey.velocityY=monkey.velocityY+0.8;
    
   
    if(ground.x<0){
      ground.x=ground.width/2;
    }
  
    
  
   if(obstaclesGroup.isTouching(monkey)){ 
     gameState=END;
   } 
    
    
    Food();
    obstacles();
    
  }
  
   else if(gameState===END){
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     ground.velocityX=0;
   }
       
  monkey.collide(ground);
  
  drawSprites();
  
}


function Food(){
 if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}


function obstacles(){
 if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,327,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX=-3;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}




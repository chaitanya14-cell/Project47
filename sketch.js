
var human,humanImage,humanImage1;
var powerup,powerupImage;
var backGround,backgroundImage;
var zombies,zombiesImage;
var disadvantage,disadvantageImage;
var invisibleGround;
var obstacle;
var gamestate="start"
var obstacleGroup,disadvantageGroup;
var advantageGroup;
var advantage;
var score=0;
var sound1,sound2;
var reset,gameover;
var button;

function preload(){
humanImage=loadAnimation("images/man1.png","images/man2.png","images/man3.png")
humanImage1=loadAnimation("images/man1.png")
powerupImage=loadImage("images/powerUp.png")
backgroundImage=loadImage("images/bk2.jpg")
disadvantageImage=loadImage("images/disadvantage.png")
//zombiesImage=loadImage("images/zombies.png")
obstacleImage=loadImage("images/Obstacle.png")
advantageImage=loadImage("images/powerUp.png")
sound1=loadSound("end.wav")
sound2=loadSound("jump.wav")
gameover=loadImage("images/reset.png")

}

function setup()
{
  createCanvas(600,200);
backGround=createSprite(300,80);
backGround.addImage(backgroundImage)
backGround.scale=0.73

human=createSprite(100,100)
human.addAnimation("running",humanImage)
human.addAnimation("stop",humanImage1)
human.scale=0.2
invisibleGround=createSprite(300,200,600,10)
obstacleGroup=new Group()
disadvantageGroup=new Group()
advantageGroup=new Group()
human.debug=true;
human.setCollider("rectangle",0,0,10,human.height)
button=createSprite(300,100);
button.addImage(gameover)

}

function draw() 
{
  background(51);
  
    console.log(human.y)
if(gamestate==="start"){
  score=score+Math.round(frameCount/100)
  if(backGround.x<0){
    backGround.x=150  }
    backGround.velocityX=-3
    button.visible=false;
    if(keyDown("space")&& human.y>=150){
      human.velocityY=-15   
      sound2.play();
    }
    human.velocityY=human.velocityY+0.8
    spawnObstacle();
    spawnDa();
    spawnAdvantages();
    if(human.isTouching(obstacleGroup)){
      gamestate="end"
      sound1.play();
      button.visible=true;
    }
}
if(gamestate==="end"){ 
  backGround.velocityX=0;
  obstacleGroup.setVelocityXEach(0)
  disadvantageGroup.setVelocityXEach(0)
  advantageGroup.setVelocityXEach(0)
  obstacleGroup.setLifetimeEach(-1)
  disadvantageGroup.setLifetimeEach(-1)
  advantageGroup.setLifetimeEach(-1)
  human.changeAnimation("stop",humanImage1)
  
}


    
   
    human.collide(invisibleGround)
    
  drawSprites();
  fill("white")
text("Score "+score,500,25)

 
}

function spawnObstacle() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
     obstacle= createSprite(600,180,40,10);
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 250;
    
    
    
    //adding cloud to the group
   //cloudsGroup.add(cloud);
   obstacleGroup.add(obstacle)
    }
}
function spawnDa() {
  //write code here to spawn the clouds
  console.log("executed")
  if (frameCount % 100 === 0) {
     disadvantage= createSprite(600,50,40,10);
    
     disadvantage.addImage(disadvantageImage);
     disadvantage.scale=0.5
     disadvantage.velocityX = -3;
    
     //assign lifetime to the variable
    disadvantage.lifetime = 250;
    disadvantage.y = Math.round(random(20,60));

    //adding cloud to the group
   //cloudsGroup.add(cloud);

   disadvantageGroup.add(disadvantage)
   
    }
    
}
function spawnAdvantages(){
  if (frameCount % 140 === 0) {
    advantage= createSprite(600,50,40,10);
   
   advantage.addImage(advantageImage);
    advantage.scale=0.125
    advantage.velocityX = -3;
   
    //assign lifetime to the variable
   advantage.lifetime = 250;
   advantage.y = Math.round(random(20,60));

   //adding cloud to the group
  //cloudsGroup.add(cloud);

  advantageGroup.add(advantage)
  
   }
}




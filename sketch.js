var ghost;
var climbersGroup, doorsGroup, invisibleBlockGroup;
var climberImg, doorImg, backgroundImg;
var gameState = "play";
var score ;


function preload()
{
  
    ghost_jumping = loadAnimation("ghost-jumping.png","ghost-standing.png");
    backgroundImage = loadImage("tower.png");
    climberImg = loadImage("climber.png");
    doorImg = loadImage("door.png");
    spookySound = loadSound("spooky.wav");
    obstacleImg = loadImage("obstacle.png");
  
}

function setup()
{
  createCanvas(600,600)
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",backgroundImage);
  tower.velocityY = 2;
  
  
  ghost = createSprite(200,200,20,20);
  ghost.addAnimation("jumping", ghost_jumping);
  ghost.scale = 0.32;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
  obstaclesGroup = createGroup();
  
  score = 0;
  
}

function draw()
{
  background(0);
  
  if (gameState === "play") 
  {
   
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space"))
    {
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400)
    {
      tower.y = 300
    }
    
    spawnDoors();
    spawnRock();

    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) ||obstaclesGroup.isTouching(ghost)|| ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
    }

    if (gameState === "end")
    {

      stroke("yellow");
      fill("yellow");
      textSize(40);
      text("Game Over", 210,250)
    }

      stroke("white");
      textSize(20);
      fill("white");
      text("Score:" + score, 450,50);
}

function spawnDoors()
{
  
  if(frameCount % 120 === 0){
    
    var door = createSprite(200,-90);
    door.addImage(doorImg);
    door.velocityY = 2 ;
    door.lifetime = 800;
    
    var climber = createSprite(200,-30);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climber.lifetime = 800;
    
    var invisibleBlock = createSprite(200,-25);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 2;
    invisibleBlock.lifetime = 800;
    invisibleBlock.shapeColor = "lightgreen";
    
    ghost.depth = door.depth;
    ghost.depth = door.depth + 1;
    
    door.x = Math.round(random(120,400));
    climber.x = Math.round(random(120,400));
    door.x = climber.x;
    invisibleBlock.x = door.x;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
   }
}


function spawnRock(){
  if(frameCount % 240 === 0){
  var obstacle = createSprite(300,0,10,10);
  obstacle.addImage(obstacleImg);
  obstacle.scale = 0.15;
  obstacle.velocityY = 11;
  obstacle.x = Math.round(random(120,400));
  obstacle.lifetime = 100;
  obstaclesGroup.add(obstacle)
  }
  
}
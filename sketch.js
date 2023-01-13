var bg, bgImg;
var player, shooterImg, shooter_shooting;
var gamestate = 1;
var play;
var score = 0
var count = 3;
var temp = false
function preload() {
  playImg = loadImage("assets/start.png");
  restartImg = loadImage("assets/restart.png")
  cenario1 = loadImage("assets/cenario1.png");
  cenario2 = loadImage("assets/cenario2.png");
  bonnie = loadImage("assets/bonnie.gif");
  burntrap = loadImage("assets/burntrap.png");
  foxy = loadImage("assets/foxy.png");
  glich = loadImage("assets/glich.png");
  freddy = loadImage("assets/freddy.png");
  sonic = loadImage("assets/sonic.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(sonic);
  player.scale = 1.5;
  player.setCollider("rectangle", 0, 0, 150, 150);
  start = createSprite(width / 2, height / 2);
  start.addImage(playImg);
  start.scale = 5;
  barra = createSprite(windowWidth,windowHeight/2,10,windowHeight)
  barra.visible=false
  restart = createSprite(width / 8, height / 8);
  restart.addImage(restartImg);
  // restart.scale = 5;
  restart.visible=false
  animatronicGroup = new Group();
}

function draw() {
  if (gamestate === 1) {
    player.visible = false;
    image(cenario2, 0, 0, windowWidth, windowHeight);
    start.visible = true;
    player.x = displayWidth - 1150;
    if (mousePressedOver(start)) {
      start.visible = false;
      gamestate = 2;
    }
  } else if (gamestate === 2) {
    
    score = score + Math.round(getFrameRate()/60);
    player.visible = true;
    image(cenario1, 0, 0, windowWidth, windowHeight);

    if (player.isTouching(animatronicGroup)) {
      for (var i = 0; i < animatronicGroup.length; i++) {
        if (animatronicGroup[i].isTouching(player)) {
          count -= 1;
          player.x = displayWidth - 1150;
        }
      }
    }
    if (count === 0) {
      count=3
      gamestate = 1;
      player.visible = false;
      animatronicGroup.destroyEach();
    }
    if(player.x >= barra.x){
      gamestate=3
      player.visible = false;
      animatronicGroup.destroyEach();
    }
    animatronicspawn();
   

  }else if(gamestate===3){
    textSize(70);
    fill("red")
    text("Você ganhou!!",windowWidth/2, windowHeight /2);
    restart.visible=true
    if (mousePressedOver(restart)) {
      console.log("aa")
      restart.visible = false;
      gamestate = 1;
    }
  }

  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30;
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30;
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30;
  }

  textSize(70);
  text("VIDAS: " + count, windowWidth - 1150, windowHeight / 8);
  text("Pontuação: "+ score,windowWidth - 1150, windowHeight / 8 +80);
 
  drawSprites();
}

function animatronicspawn() {
  if (frameCount % 60 === 0) {
    animatronic = createSprite(width / 2 + 250, random(height / 2), 40, 40);
    animatronic.velocityX = Math.round(random(-(6 + 3*score/100), 5));
    animatronic.velocityY = Math.round(random(-(6 + 3*score/100), 7));
    animatronic.scale = 0.5;
    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:
        animatronic.addImage(freddy);
        break;
      case 2:
        animatronic.addImage(bonnie);
        break;
      case 3:
        animatronic.addImage(foxy);
        break;
      case 4:
        animatronic.addImage(burntrap);
        break;
      case 5:
        animatronic.addImage(glich);
        break;
      default:
        break;
    }
    animatronic.lifetime = 600;
    animatronicGroup.add(animatronic);
  }
}

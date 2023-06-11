var sans, sans_normal, sans_dodge;
var sanness, sannessImg;
var blaster, blaster_active, blasterGroup, blastRay, blaster_activeImg, blasterImg;
var bone, boneGroup, boneImg;
var backgroundeImg, backgrounde, ground;
var weapon_select;
var GAMESTATE;
var kill;
var hp, hp_num;
var gameOver, gameOverIMG;

function preload(){
    backgroundeImg = loadImage("background.png");
    sans_normal = loadImage("sans-normal.png");
    sans_dodge = loadImage("sans-dodge.png");
    sannessImg = loadImage("sanness.png");
    boneImg = loadImage("bone.png");
    blasterImg = loadImage("blaster.png");
    blaster_activeImg = loadImage("blaster-active.png");
    gameOverIMG = loadImage("gameOver.png");
}

function setup() {
    createCanvas(1794, 900);
    backgrounde = createSprite(900, 400, 0, 100);
    backgrounde.addImage(backgroundeImg);

    kill = false;
    
    blasterGroup = createGroup();
    boneGroup = createGroup();

    sans = createSprite(800, 555);
    sans.addImage(sans_normal);
    sans.scale = 0.2

    sanness = createSprite(100, 539);
    sanness.addImage(sannessImg);
    sanness.scale = 0.4;

    ground = createSprite(500, 604, 1000, 8);
    ground.visible = false;

    gameOver = createSprite(900, 250);
    gameOver.addImage(gameOverIMG);
    gameOver.scale = 4;
    gameOver.visible = false;

    hp = 200;

    GAMESTATE = "PLAY";
}

function throwBone() { 
    bone = createSprite(210, 551);
    bone.addImage(boneImg);
    bone.scale = 0.2
    bone.velocityX = 10
    bone.lifetime = 150;
    boneGroup.add(bone);
}

function gasterBlast() {
    blaster = createSprite(230, 551);
    blastRay = createSprite(1155, 551, 1794, 47);
    blastRay.visible = false;
    blaster.addImage(blasterImg);
    blasterGroup.add(blaster);
    blasterGroup.add(blastRay);
    setTimeout(() => {
        blaster.addImage(blaster_activeImg);
        blastRay.visible = true;
        kill = true;
        blaster.lifetime = 50;
        blastRay.lifetime = 50;
        setTimeout(() => {
            kill = false;
        }, 150);
      }, 1000);
     
    
}

function draw() {
    background(0);
    
    drawSprites();

    if (GAMESTATE == "PLAY") { 
        fill(240)
        textSize(50)
        text("HP: "+ hp, 720,50);

        if (World.frameCount % 150 == 0) {
            weapon_select = Math.round(random(1,2));
            if (weapon_select == 1) {
                throwBone();
            } else if (weapon_select == 2) {
                gasterBlast();
            }
        }

        if(keyDown("space")) {
            sans.addImage(sans_dodge);
            sans.velocityY = -14;
        } 

        sans.velocityY = sans.velocityY + 0.8

        if (hp <= 0) {
            GAMESTATE = "END";
        }

        if (blasterGroup.isTouching(sans) && kill == true) {
            hp = hp - 3;
        }

        if (boneGroup.isTouching(sans)) {
            hp = hp - 5;
            boneGroup.destroyEach();
        }

        if (ground.isTouching(sans)) {
            sans.collide(ground);
            sans.addImage(sans_normal);
        }
    }

    if (GAMESTATE == "END") {
        blasterGroup.destroyEach();
        boneGroup.destroyEach();
        sans.destroy();
        sanness.destroy();
        ground.destroy();
        
    }
}


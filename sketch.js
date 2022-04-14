var trex;
var treximagem;
var solo;
var soloimagem;
var soloinvisivel;
var nuvens;
var nuvemimagem;
var obstaculos;
var obstaculos1;
var obstaculos2;
var obstaculos3;
var obstaculos4;
var obstaculos5;
var obstaculos6;
var jogar=1;
var fim=0;
var estadodejogo=jogar;
var pontos=0;
var grupodenuvens;
var grupodeobstaculos;
var trexfim;
var gameover;
var imagemgameover;
var recomecar;
var imagemrecomecar;

function preload(){

//animação trex
treximagem=loadAnimation("trex1.png","trex3.png","trex4.png");
obstaculos1=loadImage("obstacle1.png");
obstaculos2=loadImage("obstacle2.png");
obstaculos3=loadImage("obstacle3.png");
obstaculos4=loadImage("obstacle4.png");
obstaculos5=loadImage("obstacle5.png");
obstaculos6=loadImage("obstacle6.png");
trexfim=loadAnimation("trex_collided.png");
imagemgameover=loadImage("gameOver.png");
imagemrecomecar=loadImage("restart.png");



//imagem solo
soloimagem=loadImage("ground2.png");
//imagem nuvem
nuvemimagem=loadImage("cloud.png");
}


function setup(){

createCanvas(windowWidth,windowHeight);
trex=createSprite(50,height-70,20,50);
trex.scale=0.5;
trex.addAnimation("correndo",treximagem);
trex.addAnimation("colidindo",trexfim);
trex.changeAnimation("correndo");

solo=createSprite(width/2,height-10,width,2);
solo.addImage(soloimagem);


soloinvisivel=createSprite(width/2,height-10,width,0.2);
soloinvisivel.visible=false;

grupodeobstaculos=createGroup();
grupodenuvens=createGroup();


gameover=createSprite(width/600*300,height/200*100);
gameover.addImage(imagemgameover);
gameover.scale=0.5;

recomecar=createSprite(width/600*300,height/200*110);
recomecar.addImage(imagemrecomecar);
recomecar.scale=0.4;


}

function draw(){

background("white");

//raio colisor
trex.debug=false;
trex.setCollider("circle",0,0,40);


text ("pontos  : "+pontos,width/600*550,height/200*20);

//ESTADO DE JOGO JOGAR
if(estadodejogo===jogar){

solo.velocityX=-(5+pontos/1000);

//pontos
pontos=pontos+Math.round(getFrameRate()/60);

//redefinir solo
if(solo.x<0){
    solo.x=solo.width/2;

}

//pulo
if(keyDown("space")&&trex.y>650){

trex.velocityY=-5;

}

//gravidade
trex.velocityY=trex.velocityY+0.5;

gerarobstaculos();
gerarnuvens();

if(grupodeobstaculos.isTouching(trex)){

    estadodejogo=fim
}

gameover.visible=false;
recomecar.visible=false;

}


//ESTADO DE JOGO FIM
else if(estadodejogo===fim){

solo.velocityX=0;
trex.velocityY=0;
grupodeobstaculos.setVelocityXEach(0);
grupodenuvens.setVelocityXEach(0);

//vida infinta
grupodenuvens.setLifetimeEach(-1);
grupodeobstaculos.setLifetimeEach(-1);

trex.changeAnimation("colidindo");

gameover.visible=true;
recomecar.visible=true;




}

//colidir
trex.collide(solo);


if(mousePressedOver(recomecar)){

  reset();  
}


drawSprites();


}

function gerarnuvens(){
    if(frameCount%60===0){
    nuvem=createSprite(width/600*601, height/200*150, width/600*40, height/200*10);
    nuvem.velocityX=-(5+pontos/1000);
    nuvem.addImage(nuvemimagem);
nuvem.y=Math.round(random(1,height/200*165))
nuvem.lifetime=700;
nuvem.depth=trex.depth;
trex.depth=trex.depth+1;
console.log(trex.depth);   
console.log(nuvem.depth);
grupodenuvens.add(nuvem);

}
    

}

function gerarobstaculos(){

if(frameCount%60===0){
 
    obstaculos=createSprite(width/600*601, height/200*193, width/600*10, height/200*40);
    obstaculos.velocityX=-(5+pontos/1000);
    obstaculos.scale=0.4;
    obstaculos.lifetime=700;
    grupodeobstaculos.add(obstaculos);
    obstaculos.debug=false; 
    
    
    var value=Math.round(random(1,6));
     switch(value){
         case 1:
            obstaculos.addImage(obstaculos1);
            break;
         case 2:
            obstaculos.addImage(obstaculos2);
            break;
         case 3:
            obstaculos.addImage(obstaculos3);
            break;
        case 4:
            obstaculos.addImage(obstaculos4);
            obstaculos.setCollider("circle",0,0,15)
            break;
        case 5:
            obstaculos.addImage(obstaculos5);
            break;
        case 6:
            obstaculos.addImage(obstaculos6);
            obstaculos.setCollider("circle",0,0,15);
            break;
            default:
            break;
     }  
    }

}

function reset(){

    estadodejogo=jogar;
    trex.changeAnimation("correndo");
    grupodeobstaculos.destroyEach();
    grupodenuvens.destroyEach();
    pontos=0;
    frameCount=0;
}

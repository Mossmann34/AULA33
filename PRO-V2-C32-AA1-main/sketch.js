const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con2, fruit_con3;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var rope2,rope3;

var camW, camH;

var music;
var cut;
var sadS;
var eatMusic;
var balon;
var airbalon;

var button2,button3;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  music = loadSound('sound1.mp3');
  cut = loadSound('rope_cut.mp3');
  sadS = loadSound('sad.wav');
  eatMusic = loadSound('eating_sound.mp3');
  balon = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    camW = displayWidth;
    camH = displayHeight;
    createCanvas(displayWidth+80, displayHeigh)
  } else {
    camW = windowWidth
    camH = windowHeight
    createCanvas(windowWidth, windowHeight);
  }


  frameRate(80);

  music.play();
  music.setVolume(0.05);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(330, 35);
  button2.size(50,50);
  button2.mouseClicked(drop2)

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(50,50)
  button3.mouseClicked(drop3);


  // airbalon = createImg('balloon.png');
  // airbalon.position(10,250);
  // airbalon.size(150, 100);
  // airbalon.mouseClicked(airBlow);

  mute_btn = createImg('mute.png');
  mute_btn.position(420,30);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370, y:40});
  rope3 = new Rope(4,{x:400, y:225})


  ground = new Ground(200,camH,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,camH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+150, displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatMusic.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    music.stop();
    sadS.play();
    fruit=null;
    
   }
   
}

function drop()
{
  cut.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}

function drop3()
{
  cut.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow() {
  Matter.Body.applyForce(fruit,{x:0, y:0}, {x:0.01, y:0})
  balon.play();
  balon.setVolume(0.1);

}

function mute() {
  if (music.isPlaying()) {
    music.stop();
    
  } else {
    music.play();

  }

}
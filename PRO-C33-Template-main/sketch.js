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
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;
let button, button2,button3;
var doremon;

//Sounds
var cutSound,
airSound,
eatingSound,
sadSound;


function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
  doremon=loadSound("doremon.mp3");
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

  //sounds
  sadSound=loadSound("sadSound.wav");
  cutSound=loadSound("rope.mp3");
  airSound=loadSound("airSound.wav");
  eatingSound=loadSound("eatSound.mp3");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = 
  {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(width/2,height/1.5,80,80);
  bubble.addImage(bubble_img);
  bubble.scale = 0.15;
  
  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(width/2,height/10,100,100);
  bunny.setCollider("rectangle",0,-20,bunny.width*2, bunny.height*4);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(bunny.x-300,(bunny.y)-230,200,200);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  angleMode(DEGREES);
 

  //btn 1
  button = createImg('cut_btn.png');
  button.position(bunny.x-100,320);
  button.size(50,50);
  

  button2 = createImg('cut_btn.png');
  button2.position(bunny.x-300,420);
  button2.size(50,50);

  rope = new Rope(5,{x:button.x,y:button.y});
  rope2 = new Rope(5,{x:button2.x,y:button2.y});

  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);
  
  button.mouseClicked(drop);
  button2.mouseClicked(drop2);

  button3=createImg("balloon.png");
  button3.position(button.x+160,button.y);
  button3.size(80,80);
  button3.mouseClicked(airblow);
  ellipseMode(RADIUS);
}

function draw() 
{
 
  background(51);

  //doremon.play();
  image(bg_img,0,0,width,height);
  if(!doremon.isPlaying())
  {
    doremon.play();
    doremon.setVolume(0.09);
    doremon.looping=true;
    
  }
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  //play the background song
  
  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,100)==true)
  {
    

   remove_rope();
   bunny.changeAnimation('eating');

   bubble.visible = false;
   fruit.width=2,fruit.height=0;

    World.remove(engine.world,fruit);
    fruit = null;

    eatingSound.play();

  /* setTimeout(() => {
     reset();
   }, 2000);*/
    setTimeout(() =>
    {
            swal(
              {
                  title: `Yeah!!!You've fed the bunny!!!`,
                  text: "Thanks for playing!!",
                  imageUrl:
                    "https://github.com/spaceresearchmamon/RabbitEating/blob/main/PRO-C33-Template-main/melon.png",
                  imageSize: "50x50",
                  confirmButtonText: "Play Again",
              },
                function(isConfirm)
                {
                  if (isConfirm) 
                  {
                    location.reload();
                  }
                }
              );
    },2000

    );
  }
 
 
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }
   

  drawSprites();

}

function drop()
{
  rope.break();
  con.dettach();
  con = null; 
  cutSound.play();
}
function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
  cutSound.play();

}


function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:-0.01,y:0});
  airSound.play();
}

function reset()
{
 
}
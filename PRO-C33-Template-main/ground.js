class Ground 
{
  constructor(x, y, w, h) 
  {
    let options = {
      isStatic:true
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    this.image=loadImage("asteroid2.png");
  }

  show() {
    let pos = this.body.position;

    push();
    rectMode(CENTER);
    stroke(255);
    fill(127);
    rect(pos.x, pos.y, this.w, this.h);
    image(this.image,pos.x+(pos.x)/2,pos.y+200,this.w,this.h)
    pop();
  }
}
let leader;
let followers = [];

function setup(){
    createCanvas(600,600);
    leader = new Leader;
    for (let i = 0; i < random(20,100); i++) {
    followers.push(new follower());
  }
}

function draw(){
    background(200,200,255);
    for (let i = 0; i < followers.length; i++) {
      followers[i].move();
      followers[i].show();
      followers[i].bounce();
  }
    leader.move();
    leader.bounce();
    leader.show();
}
class Leader{
    constructor(){
        this.location = createVector(width/2,height/2);
        this.velocity = createVector(random(-7,7),random(-7,7));
    }

    move(){
        this.wobble = createVector(random(-0.5,0.5),random(-0.5,0.5));
        this.velocity.add(this.wobble);
        this.velocity.limit(15);
        this.location.add(this.velocity); 
    }

    show(){
        fill(255,0,0);
        ellipse(this.location.x,this.location.y,20);
    }

    bounce(){
        if (this.location.y > height || this.location.y < 0){
            this.velocity.y = this.velocity.y * -1
        }
        if (this.location.x > width || this.location.x < 0){
            this.velocity.x = this.velocity.x * -1
        }
    }
}

class follower{
  constructor(){
    this.location = createVector(random(0,width),random(0,height));
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.radius = random(10,50);
    this.c = 100;
  }

  move(){
    this.leader = createVector(leader.location.x,leader.location.y);
    this.leader.sub(this.location);
    this.leader.setMag(0.3*map(this.radius,10,50,1,0.8));
    this.velocity.limit(14)
    this.acceleration = this.leader;
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }


  show(){
    this.colour_holder = createVector(leader.location.x,leader.location.y);
    this.colour_holder.sub(this.location);
    this.c = this.colour_holder.mag()
    fill(this.c);
    noStroke();
    ellipse(this.location.x,this.location.y,this.radius);
    
  }

  bounce(){
        if (this.location.y > height || this.location.y < 0){
            this.velocity.y = this.velocity.y * -1
        }
        if (this.location.x > width || this.location.x < 0){
            this.velocity.x = this.velocity.x * -1
        }
    }
}

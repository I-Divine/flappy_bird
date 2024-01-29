let failed = false;
let started = false;
let jumpsound = document.getElementById("jumpsound");
let pointsound = document.getElementById("pointsound");
let hitsound = document.getElementById("hitsound");
const startInstr = document.getElementById("atStart");
const endInstr = document.getElementById("atEnd");
const flappy = {
  bird: document.getElementById("flappy"),
  yPos: 300,
  xPos: 20,
  yVelocity: 0,
  jumping: false,
  g: 0.375,
  score: 0,
  start: function () {
    // started=true;
    this.gravity();
    this.addScore();
  },
  gravity: function () {
    const vChange = setInterval(() => {
      if (started) this.yVelocity += this.g;
    }, 30);
    const yChange = setInterval(() => {
      this.yPos += this.yVelocity;
      this.bird.style.top = this.yPos + "px";
      if (this.yPos >= window.innerHeight - 50) {
        document.getElementById("atEnd").style = "display:block";
        // window.alert("Game Over => Press R to start over");
        clearInterval(yChange);
      }
      if (failed) {
        document.getElementById("atEnd").style = "display:block";

        // window.alert("Game Over => Press R to start over");
        clearInterval(yChange);
      }
    }, 30);
  },
  jump: function () {
    this.yVelocity = -6.0;
    jumpsound.play();
    console.log(jumpsound);
    // console.log(this.jumping);
  },
  addScore: function () {
    const changeScore = setInterval(() => {
      if (started && !failed) {
        this.score += 1;
        pointsound.play();
        console.log(this.score);
      }
    }, 2000);
  },
};
// class Pipe{
//     constructor(pipe){
//         this.pipe = pipe;
//     }
//     move() {

//         console.log(this.pipe)
//     }
// }

flappy.start();

window.addEventListener("keydown", (event) => {
  if (!failed) {
    if (event.key == " " || event.key == "s") {
      started = true;
      startInstr.style.visibility = "hidden";
    }
    if (event.key == "w" || (event.key == " " && started)) flappy.jump();
  } else {
    if (event.key == "r") location.reload();
  }
});

// this moves the pipes from left to right
const move = (pipe, pipe_speed = 0.8) => {
  // let pipe_speed = 0.8;
  let xPos = Number(pipe.style.left.split("v")[0]);
  xPos -= pipe_speed;
  pipe.style.left = xPos + "vw";
};

const pipes = document.querySelectorAll(".pipe");

const pipeCode = setInterval(() => {
  pipes.forEach((pipe) => {
    if (started) move(pipe);
    if (collisionCheck(pipe, flappy.bird)) {
      clearInterval(pipeCode);
      failed = true;
      hitsound.play();
    }
    if (Number(pipe.style.left.split("v")[0]) <= 0) pipe.style.left = "680vw";
  });
}, 30);

const collisionCheck = (element1, element2) => {
  const domRect1 = element1.getBoundingClientRect();
  const domRect2 = element2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
};
// console.log(pipes);
// const realtimePos = setInterval(()=>{
//     console.log(flappy.bird.style.top)
// },1000);
// realtimePos;

// console.log(document.querySelector(".pipe").style.left);
// const Pipes = [];
// const pipes = Array(document.getElementsByClassName("pipe"));
// pipes.forEach(pipe => {
//     Pipes.push(new Pipe(pipe));
// });
// Pipes.forEach(Pipe=>{
//     Pipe.move();
// })
// flappy.bird.addEventListener()
// const velocity = (y,v)=>{
//     const interval = setInterval(()=>{
//         y+= v;
//         if(y>= 100)
//             clearInterval(interval);
//     }, 1000)
// }

// const bird = document.getElementById("flappy");
// const gravity= ()=>{
//     console.log(bird, bird.style)
//     // console.log(bird.style.bottom)
// }
// gravity();

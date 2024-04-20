let failed = false;
let started = false;
let jumpsound = document.getElementById("jumpsound");
let pointsound = document.getElementById("pointsound");
let hitsound = document.getElementById("hitsound");
const startInstr = document.getElementById("atStart");
const endInstr = document.getElementById("atEnd");
const displayScore = document.getElementById("displayScore");
const flappy = {
  bird: document.getElementById("flappy"),
  yPos: 300,
  xPos: 20,
  yVelocity: 0,
  jumping: false,
  g: 0.375,
  score: 0,
  start: function () {
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
        clearInterval(yChange);
      }
      if (failed) {
        document.getElementById("atEnd").style = "display:block";
        clearInterval(yChange);
      }
    }, 30);
  },
  jump: function () {
    this.yVelocity = -6.0;
    jumpsound.play();
    console.log(jumpsound);
  },
  addScore: function () {
    const changeScore = setInterval(() => {
      if (started && !failed) {
        this.score += 1;
        displayScore.textContent = `Score : ${this.score}`;
        pointsound.play();
        console.log(this.score);
      } else if (failed) {
        clearInterval(changeScore);
      }
    }, 2000);
  },
};

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

const move = (pipe, pipe_speed = 0.8) => {
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

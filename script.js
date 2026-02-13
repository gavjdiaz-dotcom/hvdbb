const envelopeContainer = document.getElementById("envelopeContainer");
const flap = document.getElementById("flap");
const heartSeal = document.getElementById("heartSeal");
const messagePanel = document.getElementById("messagePanel");
const music = document.getElementById("bgMusic");
const popSound = document.getElementById("popSound");

const title = document.getElementById("title");
const question = document.getElementById("question");
const popup = document.getElementById("popup");
const questionChoices = document.getElementById("questionChoices");
const letterPages = document.getElementById("letterPages");

const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let opened = false;

// Confetti particles
const confettiParticles = [];
for (let i = 0; i < 150; i++) {
  confettiParticles.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10 + 5,
    color: `hsl(${Math.random()*360}, 80%, 60%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncrement: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  });
}

function drawConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += (Math.cos(p.d) + 3 + p.r/2)/2;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    confettiCtx.beginPath();
    confettiCtx.lineWidth = p.r/2;
    confettiCtx.strokeStyle = p.color;
    confettiCtx.moveTo(p.x + p.tilt + p.r/4, p.y);
    confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/4);
    confettiCtx.stroke();
  });
  requestAnimationFrame(drawConfetti);
}

// Start confetti
function startConfetti() {
  drawConfetti();
  setTimeout(() => confettiParticles.forEach(p => p.y = -Math.random()*confettiCanvas.height), 2000);
}

// Envelope click opens message
envelopeContainer.addEventListener("click", () => {
  if (!opened) {
    flap.style.transform = "rotateX(-180deg)";
    heartSeal.classList.add("fly");
    startConfetti();

    setTimeout(() => {
      messagePanel.classList.remove("hidden");
      music.volume = 0.4;
      music.play();
      document.body.classList.add("open");
    }, 600);

    opened = true;
  }
});

function answer(correct) {
  popSound.play();
  if (!correct) {
    popup.textContent = "wrong 😳 Try again!";
    popup.classList.remove("hidden");
    return;
  }
  popup.textContent = "correct 💕";
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
    questionChoices.classList.add("hidden");
    title.classList.add("hidden");
    question.classList.add("hidden");
    letterPages.classList.remove("hidden");
    document.getElementById("page1").classList.remove("hidden");
  }, 1000);
}

function nextPage(pageNum) {
  document.querySelectorAll(".letter-page").forEach(p => p.classList.add("hidden"));
  document.getElementById("page" + pageNum).classList.remove("hidden");
}

function yes() {
  alert("thank you for staying, baby. I LOVE YOU SO MUCH.");
}

const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.left = Math.random() * 100 - 50 + "px";
  noBtn.style.top = Math.random() * 100 - 50 + "px";
});
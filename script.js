const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const glow = document.querySelector(".mouse-glow");
const card = document.querySelector(".card");
const icon = document.getElementById("seasonIcon");
const dropdown = document.querySelector(".dropdown");
const btn = document.getElementById("dropdownBtn");
const menu = document.getElementById("menu");

const isTouch = 'ontouchstart' in window;

// تنظیم اندازه canvas
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

// موس
let mouse = { x: innerWidth/2, y: innerHeight/2 };
if (!isTouch) {
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    glow.style.left = mouse.x + "px";
    glow.style.top = mouse.y + "px";
  });
} else {
  glow.style.display = "none";
}

// Dropdown
btn.onclick = () => dropdown.classList.toggle("open");
menu.onclick = e => {
  if (e.target.dataset.season) {
    setSeason(e.target.dataset.season);
    dropdown.classList.remove("open");
  }
};

// فصل‌ها
const seasons = {
  winter: { bg:["#1c1f3a","#07070c"], text:"#fff", glow:"#9fb4ff", icon:"assets/santa-hat.png" },
  spring: { bg:["#fef6d8","#9be7c4"], text:"#1e3d2f", glow:"#4cffb0", icon:"assets/spring.png" },
  summer: { bg:["#ffb347","#ffcc33"], text:"#4a3b00", glow:"#ffd84c", icon:"assets/summer.png" },
  autumn: { bg:["#ff9f43","#ff6b6b"], text:"#3a1f0f", glow:"#ff944c", icon:"assets/autumn-leaf.png" }
};

let season = "winter";
let particles = [];

function setSeason(s) {
  season = s;
  const c = seasons[s];
  document.body.style.background =
    `radial-gradient(circle,${c.bg[0]},${c.bg[1]})`;
  card.style.color = c.text;
  btn.style.color = c.text;
  btn.style.borderColor = c.text;
  glow.style.background = c.glow;
  icon.src = c.icon;
  document.querySelector(".logo").style.color = c.text;
  initParticles();
}

function initParticles() {
  particles = [];
  const count = innerWidth < 600 ? 30 : 120;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: Math.random() * 1.6 + 0.3,
      r: Math.random() * 3 + 1
    });
  }
}

const drawParticle = {
  winter(p) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  },
  spring(p) {
    ctx.fillStyle = "rgba(100,255,200,.9)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r+2, 0, Math.PI*2);
    ctx.fill();
  },
  summer(p) {
    ctx.fillStyle = "rgba(255,220,100,.85)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r+3, 0, Math.PI*2);
    ctx.fill();
  },
  autumn(p) {
    ctx.fillStyle = "#8b4513";
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.y % 50) * 0.01);
    ctx.fillRect(-p.r,-p.r,p.r*2,p.r);
    ctx.restore();
  }
};

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    if(!isTouch){
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      if(d < 120){
        p.x += dx/d;
        p.y += dy/d;
      }
    }

    drawParticle[season](p);
    p.y += p.vy;
    if(p.y > canvas.height){
      p.y = -10;
      p.x = Math.random()*canvas.width;
    }
  });

  requestAnimationFrame(animate);
}

// شروع با زمستان
setSeason("winter");
animate();

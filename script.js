/* ---------- Responsive Canvas ---------- */
const canvas = document.getElementById("seasonCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ---------- Mouse Glow ---------- */
const glow = document.querySelector(".mouse-glow");
window.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

/* ---------- Birthday Countdown (شمسی ثابت) ---------- */
const daysEl = document.getElementById("days");
const today = new Date();
const birthday = new Date(today.getFullYear(), 4, 2);

if (birthday < today) birthday.setFullYear(birthday.getFullYear() + 1);
daysEl.textContent = Math.ceil((birthday - today) / 86400000);

/* ---------- Season Detection ---------- */
const month = new Date().getMonth();
let season =
    month <= 1 || month === 11 ? "winter" :
    month <= 4 ? "spring" :
    month <= 7 ? "summer" :
    "autumn";

/* ---------- Season Icons ---------- */
const icon = document.getElementById("seasonIcon");
icon.src =
    season === "winter" ? "https://i.imgur.com/7yUvePI.png" :
    season === "spring" ? "https://i.imgur.com/Y0XQZ5T.png" :
    season === "summer" ? "https://i.imgur.com/0Pz6B5F.png" :
    "https://i.imgur.com/J5LVHEL.png";

/* ---------- Particles ---------- */
let particles = [];
for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vx: 0,
        vy: Math.random() * 1 + 0.4
    });
}

window.addEventListener("mousemove", e => {
    particles.forEach(p => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
            p.x += dx / dist * 2;
            p.y += dy / dist * 2;
        }
    });
});

/* ---------- Draw ---------- */
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle =
        season === "winter" ? "#fff" :
        season === "autumn" ? "#ff9f43" :
        season === "spring" ? "#7bed9f" :
        "#feca57";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.vy;
        if (p.y > canvas.height) p.y = -10;
    });

    requestAnimationFrame(draw);
}
draw();

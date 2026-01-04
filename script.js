/* ---------- Mouse Glow ---------- */
const glow = document.querySelector('.mouse-glow');
window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

/* ---------- Birthday Countdown ---------- */
const daysEl = document.getElementById('days');
const birthday = new Date(new Date().getFullYear(), 9, 2); // 2 مهر (ماه از 0 شروع میشه)

if (birthday < new Date()) {
    birthday.setFullYear(birthday.getFullYear() + 1);
}

const diff = Math.ceil((birthday - new Date()) / (1000 * 60 * 60 * 24));
daysEl.textContent = diff;

/* ---------- Seasonal Effects ---------- */
const canvas = document.getElementById("seasonCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
const month = new Date().getMonth();

let type =
    month <= 1 || month === 11 ? "winter" :
    month <= 4 ? "spring" :
    month <= 7 ? "summer" :
    "autumn";

for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        s: Math.random() * 1 + 0.5
    });
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle =
        type === "winter" ? "white" :
        type === "autumn" ? "#ff9f43" :
        type === "spring" ? "#7bed9f" :
        "#feca57";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();

        p.y += p.s;
        if (p.y > canvas.height) p.y = -10;
    });

    requestAnimationFrame(draw);
}
draw();

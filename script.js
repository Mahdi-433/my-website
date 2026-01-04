/* ---------- Responsive Canvas ---------- */
const canvas = document.getElementById("seasonCanvas");
const ctx = canvas.getContext("2d");
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ---------- Mouse Glow ---------- */
const glow = document.querySelector(".mouse-glow");
window.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

/* ---------- Birthday Countdown ---------- */
const daysEl = document.getElementById("days");
const today = new Date();
const birthday = new Date(today.getFullYear(), 4, 2);
if (birthday < today) birthday.setFullYear(today.getFullYear() + 1);
daysEl.textContent = Math.ceil((birthday - today)/(1000*60*60*24));

/* ---------- Seasons & Icons ---------- */
const icon = document.getElementById("seasonIcon");
const body = document.body;
const card = document.querySelector(".card");

const seasons = ["winter","spring","summer","autumn"];
let currentSeason = 0;

const seasonIcons = {
    "winter": "assets/santa-hat.png",
    "spring": "assets/spring.png",
    "summer": "assets/summer.png",
    "autumn": "assets/autumn-leaf.png"
};

const seasonColors = {
    "winter": ["#1c1f3a","#07070c","#fff"],
    "spring": ["#a3f7bf","#7bed9f","#d0f4de"],
    "summer": ["#ffe066","#feca57","#ffd32a"],
    "autumn": ["#ff9f43","#ff6b6b","#f08a5d"]
};

function setSeason(season) {
    currentSeason = seasons.indexOf(season);
    icon.src = seasonIcons[season];

    // تغییر رنگ پس زمینه و particles
    const [bg1,bg2,particleColor] = seasonColors[season];
    body.style.background = `radial-gradient(circle at center, ${bg1}, ${bg2})`;
    card.style.background = `rgba(255,255,255,0.05)`;

    particles.forEach(p => {
        p.color = particleColor;
        p.x = Math.random()*canvas.width;
        p.y = Math.random()*canvas.height;
    });
}

/* ---------- تعیین فصل اولیه بر اساس ماه ---------- */
const month = today.getMonth();
if(month<=1 || month===11) setSeason("winter");
else if(month<=4) setSeason("spring");
else if(month<=7) setSeason("summer");
else setSeason("autumn");

/* ---------- Dropdown ---------- */
const dropdown = document.getElementById("seasonDropdown");
dropdown.addEventListener("change", e => {
    setSeason(e.target.value);
});

/* ---------- Particles ---------- */
let particles = [];
for(let i=0;i<120;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*3+1,
        vy: Math.random()*0.4+0.4,
        color: seasonColors[seasons[currentSeason]][2]
    });
}

/* ---------- Mouse Interaction ---------- */
window.addEventListener("mousemove", e => {
    particles.forEach(p=>{
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
            p.x += dx/dist*2;
            p.y += dy/dist*2;
        }
    });
});

/* ---------- Draw ---------- */
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y += p.vy;
        if(p.y>canvas.height) p.y=-10;
    });
    requestAnimationFrame(draw);
}
draw();

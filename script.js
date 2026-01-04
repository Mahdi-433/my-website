const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const glow=document.querySelector(".mouse-glow");
const card=document.querySelector(".card");
const icon=document.getElementById("seasonIcon");
const dropdown=document.querySelector(".dropdown");
const btn=document.getElementById("dropdownBtn");
const menu=document.getElementById("menu");

function resize(){
canvas.width=innerWidth;
canvas.height=innerHeight;
}
resize();
window.onresize=resize;

let mouse={x:0,y:0};
window.addEventListener("mousemove",e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
glow.style.left=mouse.x+"px";
glow.style.top=mouse.y+"px";
});

btn.onclick=()=>dropdown.classList.toggle("open");

menu.onclick=e=>{
if(e.target.dataset.season){
setSeason(e.target.dataset.season);
dropdown.classList.remove("open");
}
};

const seasons={
winter:{
bg:["#1c1f3a","#07070c"],
text:"#fff",
glow:"#9fb4ff",
icon:"assets/santa-hat.png"
},
spring:{
bg:["#fef6d8","#9be7c4"],
text:"#1e3d2f",
glow:"#4cffb0",
icon:"assets/spring.png"
},
summer:{
bg:["#ffb347","#ffcc33"],
text:"#4a3b00",
glow:"#ffd84c",
icon:"assets/summer.png"
},
autumn:{
bg:["#ff9f43","#ff6b6b"],
text:"#3a1f0f",
glow:"#ff944c",
icon:"assets/autumn-leaf.png"
}
};

let season="winter";
let particles=[];
let wind=0;

function setSeason(s){
season=s;
const c=seasons[s];
document.body.style.background=`radial-gradient(circle,${c.bg[0]},${c.bg[1]})`;
card.style.color=c.text;
btn.style.color=c.text;
btn.style.borderColor=c.text;
glow.style.background=c.glow;
icon.src=c.icon;
initParticles();
}

function initParticles(){
particles=[];
for(let i=0;i<120;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*3+1,
vy:Math.random()*1+.5
});
}
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
wind+=.002;

particles.forEach(p=>{
let dx=p.x-mouse.x;
let dy=p.y-mouse.y;
let d=Math.sqrt(dx*dx+dy*dy);
if(d<120){
p.x+=dx/d*1.2;
p.y+=dy/d*1.2;
}

ctx.save();
if(season==="winter"){
ctx.fillStyle="#fff";
ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
}
if(season==="spring"){
ctx.fillStyle="rgba(100,255,200,.9)";
ctx.beginPath();ctx.arc(p.x,p.y,p.r+2,0,Math.PI*2);ctx.fill();
}
if(season==="summer"){
ctx.fillStyle="rgba(255,220,100,.85)";
ctx.beginPath();ctx.arc(p.x,p.y,p.r+3,0,Math.PI*2);ctx.fill();
}
if(season==="autumn"){
ctx.fillStyle="#8b4513";
ctx.translate(p.x,p.y);
ctx.rotate(p.y*.01);
ctx.fillRect(-p.r,-p.r,p.r*2,p.r);
}
ctx.restore();

p.x+=Math.sin(wind)*.4;
p.y+=p.vy;
if(p.y>canvas.height){
p.y=-10;
p.x=Math.random()*canvas.width;
}
});

requestAnimationFrame(draw);
}

setSeason("winter");
draw();

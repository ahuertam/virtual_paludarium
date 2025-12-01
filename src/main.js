import {setupTerrain,generateTerrain as genTerrain,groundYAt as gy,drawSky as sky,drawFoliage as foliageDraw,drawSoil as soilDraw,digCircle as dig,isSolid as solid,alphaAt as alpha} from './terrain.js';
import {createFood as mkFood,updateFood as updFood,drawFood as paintFood} from './entities/food.js';
import {createStick as mkStick,updateStick as updStick,drawStick as paintStick,eat as stickEat} from './entities/stick.js';
import {createAnt as mkAnt,updateAnt as updAnt,drawAnt as paintAnt} from './entities/ant.js';
import {rand,lerp} from './utils.js';
const canvas=document.getElementById("sim");
const ctx=canvas.getContext("2d");
const dpi=window.devicePixelRatio||1;
let W=0,H=0;
let heightmap=[];
let foliage=[];
let soilMaskCanvas=null,soilMaskCtx=null;
const insects=[];
const ants=[];
const foods=[];
let gravity=0.6;

function resize(){W=window.innerWidth;H=window.innerHeight;canvas.width=W*dpi;canvas.height=H*dpi;canvas.style.width=W+"px";canvas.style.height=H+"px";ctx.setTransform(dpi,0,0,dpi,0,0);setupTerrain(W,H);genTerrain();}
function generateCurve(count,baseline,amp){const pts=new Array(count);let p=rand()*1000;for(let i=0;i<count;i++){p+=0.25;const r=Math.sin(p*0.23)+Math.cos(p*0.11)*0.5+Math.sin(p*0.07)*0.33;pts[i]=baseline+amp*r;}return pts;}
function resampleCurve(curve){const n=curve.length;const out=new Array(W);for(let x=0;x<W;x++){const t=x*(n-1)/(W-1);const i=Math.floor(t);const f=t-i;const a=curve[i];const b=curve[Math.min(i+1,n-1)];out[x]=lerp(a,b,smoothstep(f));}return out;}
function generateTerrain(){const base=H*0.5;const amp=H*0.12;heightmap=resampleCurve(generateCurve(120,base,amp));const thickness=H*0.12;let p=rand()*1000;foliage=new Array(W);for(let x=0;x<W;x++){p+=0.25;const j=Math.sin(p*0.23)*H*0.02+Math.cos(p*0.17)*H*0.015;foliage[x]=heightmap[x]-thickness+j;}soilMaskCtx.clearRect(0,0,W,H);soilMaskCtx.fillStyle="#5a3a2e";soilMaskCtx.beginPath();soilMaskCtx.moveTo(0,H);for(let x=0;x<W;x++)soilMaskCtx.lineTo(x,heightmap[x]);soilMaskCtx.lineTo(W,H);soilMaskCtx.closePath();soilMaskCtx.fill();}
function drawSky(){sky(ctx);}
function drawFoliage(){foliageDraw(ctx);} 
function drawSoil(){soilDraw(ctx);} 
function groundYAt(x){return gy(x);} 
function addFood(){foods.push(mkFood(W));}
function addStickInsect(){insects.push(mkStick(W,groundYAt));}
function addRedAnt(){ants.push(mkAnt(W,groundYAt));}
function updateFood(f){updFood(f,groundYAt,gravity);} 
function drawFood(f){paintFood(ctx,f);} 
function updateInsect(i){updStick(i,groundYAt,W);} 
function drawInsect(i){paintStick(ctx,i);} 
function alphaAt(x,y){return alpha(x,y);} 
function isSolid(x,y){return solid(x,y);} 
function updateAnt(a){updAnt(a,W,gravity,groundYAt,isSolid,dig);} 
function drawAnt(a){paintAnt(ctx,a);} 
function digCircle(x,y,r){dig(x,y,r);} 
function handleStickEating(){stickEat(insects,foods);} 
function step(){
  drawSky(); drawFoliage(); drawSoil();
  for(let k=0;k<foods.length;k++) updateFood(foods[k]);
  for(let k=0;k<insects.length;k++) updateInsect(insects[k]);
  for(let k=0;k<ants.length;k++) updateAnt(ants[k]);
  handleStickEating();
  for(let k=0;k<foods.length;k++) drawFood(foods[k]);
  for(let k=0;k<insects.length;k++) drawInsect(insects[k]);
  for(let k=0;k<ants.length;k++) drawAnt(ants[k]);
  requestAnimationFrame(step);
}
const insectBtn=document.getElementById("insectMenuButton");
const insectDrop=document.getElementById("insectDropdown");
const addStick=document.getElementById("addStickInsect");
const foodBtn=document.getElementById("foodButton");
const addRedAntBtn=document.getElementById("addRedAnt");
insectBtn.addEventListener("click",()=>{insectDrop.classList.toggle("hidden")});
addStick.addEventListener("click",()=>{addStickInsect();insectDrop.classList.add("hidden")});
addRedAntBtn.addEventListener("click",()=>{addRedAnt();insectDrop.classList.add("hidden")});
foodBtn.addEventListener("click",()=>addFood());
window.addEventListener("resize",resize);
resize();
step();

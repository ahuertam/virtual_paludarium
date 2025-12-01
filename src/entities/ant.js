import {rand} from '../utils.js';
export function createAnt(W,groundYAt){const x=(80+(W-160)*rand());const y=-40;const dir=rand()<0.5?-1:1;return{x,y,vx:dir*0.9,vy:0,dir,len:12,leg:8,r:8,t:0,burrow:false,air:true};}
export function updateAnt(a,W,gravity,groundYAt,isSolid,digCircle){
  const gy=groundYAt(a.x);
  if(a.air){
    a.vy+=gravity*0.6;
    a.y+=a.vy;
    if(a.y>=gy-10){a.y=gy-10;a.vy=0;a.air=false;}
    return;
  }
  if(!a.burrow){
    a.x+=a.vx;
    if(a.x<20){a.x=20;a.vx=Math.abs(a.vx);}if(a.x>W-20){a.x=W-20;a.vx=-Math.abs(a.vx);} 
    a.y=gy-10;
    a.t++; if(a.t%12===0){const dx=(rand()-0.5)*8; const dy=8+rand()*6; digCircle(a.x+dx,gy+dy,a.r*0.9);} 
    if(!isSolid(a.x,gy+4)||!isSolid(a.x,gy+6)){a.burrow=true;a.y=gy+6;a.vy=0.5;}
    return;
  }
  a.vy+=gravity*0.25;
  let nx=a.x+a.vx;
  const left=isSolid(nx-a.r,a.y), right=isSolid(nx+a.r,a.y);
  if((a.vx<0&&left)||(a.vx>0&&right)){a.vx*=-1;}else{a.x=nx;}
  let ny=a.y+a.vy;
  const down=isSolid(a.x,ny+a.r), up=isSolid(a.x,ny-a.r);
  if(a.vy>0&&down){a.vy=0;}else if(a.vy<0&&up){a.vy=0;}else{a.y=ny;}
  a.t++; if(a.t%9===0){digCircle(a.x,a.y,a.r*0.85);} 
}
export function drawAnt(ctx,a){ctx.strokeStyle="#c0392b";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(a.x-a.len/2,a.y);ctx.lineTo(a.x+a.len/2,a.y);ctx.stroke();ctx.beginPath();ctx.moveTo(a.x-a.len*0.25,a.y);ctx.lineTo(a.x-a.len*0.25,a.y+a.leg);ctx.moveTo(a.x+a.len*0.25,a.y);ctx.lineTo(a.x+a.len*0.25,a.y+a.leg);ctx.stroke();}

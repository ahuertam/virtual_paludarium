import {rand,lerp} from '../utils.js';
export function createFood(W){const size=16;const x=lerp(40,W-40,rand());return{x,y:-40,vx:0,vy:0,size,rest:false};}
export function updateFood(f,groundYAt,gravity){if(!f.rest){f.vy+=gravity;f.y+=f.vy;const gy=groundYAt(f.x);if(f.y+f.size>=gy){f.y=gy-f.size;f.vy=0;f.rest=true;}}}
export function drawFood(ctx,f){ctx.fillStyle="#2ecc71";ctx.fillRect(f.x-f.size/2,f.y,f.size,f.size);} 

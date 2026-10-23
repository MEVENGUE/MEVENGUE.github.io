import{e as A,c as $,b as w,p as k,m as F,a as f}from"./chrome-BqE1ziQq.js";import{t as p}from"./index-C9RxrNRS.js";function S(t,r,c,n){return r*Math.sin(2*Math.PI*t/c+n)}function M(t,r,c,n,a,l){const e=[];for(let i=0;i<=l;i++){const o=n+(a-n)*i/l;e.push({x:o,y:S(o,t,r,c)})}return e}function q(t){t.append(A(`
    <div class="viz">
      <div class="viz-controls">
        <label class="ctrl">${p("viz.waves.amp")}
          <input type="range" name="A" min="0.2" max="2.2" step="0.05" value="1" />
          <span data-for="A"></span>
        </label>
        <label class="ctrl">${p("viz.waves.period")}
          <input type="range" name="T" min="1" max="8" step="0.1" value="4" />
          <span data-for="T"></span>
        </label>
        <label class="ctrl">${p("viz.waves.phase")}
          <input type="range" name="phi" min="-3.14" max="3.14" step="0.02" value="0" />
          <span data-for="phi"></span>
        </label>
      </div>
      <div class="host"></div>
      <p class="viz-readout"></p>
    </div>`));const r=t.querySelector(".host"),c=t.querySelector(".viz-readout"),{canvas:n,ctx:a,resize:l}=$(r,1.7);let e={A:1,T:4,phi:0};function i(){const o=n.clientWidth,T=n.clientHeight,s=k(a,o,T),v=0,d=12,m=-2.4,u=2.4;a.strokeStyle="rgba(18,36,58,0.15)",a.beginPath();const h=f(0,m,u,s.y0,s.y1);a.moveTo(s.x0,h),a.lineTo(s.x1,h),a.stroke();const z=M(e.A,e.T,e.phi,v,d,240);a.beginPath(),z.forEach((x,g)=>{const y=F(x.x,v,d,s.x0,s.x1),b=f(x.y,m,u,s.y0,s.y1);g?a.lineTo(y,b):a.moveTo(y,b)}),a.strokeStyle="#1a6a88",a.lineWidth=2.2,a.stroke(),c.innerHTML=`f(x) = ${e.A.toFixed(2)} · sin(2π x / ${e.T.toFixed(2)} + ${e.phi.toFixed(2)})`}return w(t,o=>{e=o,i()}),{resize(){l(),i()},destroy(){}}}export{q as mount};

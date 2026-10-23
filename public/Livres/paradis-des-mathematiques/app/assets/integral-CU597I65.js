import{s as v,i as L,f as x}from"./calculus-B25l6VcQ.js";import{e as P,c as E,p as A,a as B,m as X}from"./chrome-BqE1ziQq.js";import{t as c}from"./index-C9RxrNRS.js";const y=-1.2,f=5.2,Y=-1.6,w=2.6;function N(i){i.append(P(`
    <div class="viz">
      <div class="viz-controls">
        <label class="ctrl">${c("viz.integral.boundA")}
          <input type="range" name="a" min="-1" max="4.5" step="0.05" value="0.4" />
          <span data-for="a"></span>
        </label>
        <label class="ctrl">${c("viz.integral.boundB")}
          <input type="range" name="b" min="-1" max="4.8" step="0.05" value="3.2" />
          <span data-for="b"></span>
        </label>
      </div>
      <div class="host"></div>
      <p class="viz-readout"></p>
    </div>`));const{ctx:e,canvas:d,resize:h}=E(i.querySelector(".host"),1.65),g=i.querySelector(".viz-readout"),b=i.querySelector("[name=a]"),u=i.querySelector("[name=b]"),T=i.querySelector("[data-for=a]"),S=i.querySelector("[data-for=b]");let t=.4,a=3.2;function m(){t>a&&([t,a]=[a,t]);const z=d.clientWidth,F=d.clientHeight,s=A(e,z,F),o=n=>X(n,y,f,s.x0,s.x1),l=n=>B(n,Y,w,s.y0,s.y1);e.strokeStyle="rgba(18,36,58,0.12)",e.beginPath(),e.moveTo(s.x0,l(0)),e.lineTo(s.x1,l(0)),e.stroke();const k=v(x,t,a,80);e.beginPath(),e.moveTo(o(t),l(0)),k.forEach(n=>e.lineTo(o(n.x),l(n.y))),e.lineTo(o(a),l(0)),e.closePath(),e.fillStyle="rgba(201,162,39,0.38)",e.fill();const q=v(x,y,f,240);e.beginPath(),q.forEach((n,$)=>$?e.lineTo(o(n.x),l(n.y)):e.moveTo(o(n.x),l(n.y))),e.strokeStyle="#1a6a88",e.lineWidth=2.2,e.stroke(),e.strokeStyle="#c45c9a",e.setLineDash([3,3]),e.beginPath(),e.moveTo(o(t),s.y0),e.lineTo(o(t),s.y1),e.moveTo(o(a),s.y0),e.lineTo(o(a),s.y1),e.stroke(),e.setLineDash([]);const p=L(t,a);g.innerHTML=`f(x) = sin x + 0,18 x &nbsp;·&nbsp; F(x) = −cos x + 0,09 x²
      <br>∫<sub>${t.toFixed(2)}</sub><sup>${a.toFixed(2)}</sup> f = F(b) − F(a) = <b>${p.toFixed(4)}</b>
      ${p<0?" "+c("viz.integral.signed"):""}`}function r(){t=Number(b.value),a=Number(u.value),T.textContent=t.toFixed(2),S.textContent=a.toFixed(2),m()}return b.addEventListener("input",r),u.addEventListener("input",r),r(),{resize(){h(),m()},destroy(){}}}export{N as mount};

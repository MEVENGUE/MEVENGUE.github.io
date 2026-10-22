import{s as E,f as h,d as L}from"./calculus-B25l6VcQ.js";import{e as k,c as $,p as F,a as P,m as q}from"./chrome-BqE1ziQq.js";import{t as y}from"./index-BCa5qDPf.js";const l=-3.4,v=3.4,w=-3.2,M=3.2;function Y(d){d.append(k(`
    <div class="viz">
      <div class="viz-controls">
        <label class="ctrl">${y("viz.tangent.point")}
          <input type="range" name="x0" min="-3" max="3" step="0.02" value="0.8" />
          <span data-for="x0"></span>
        </label>
      </div>
      <div class="host"></div>
      <p class="viz-readout"></p>
    </div>`));const{ctx:t,canvas:s,resize:g}=$(d.querySelector(".host"),1.65),z=d.querySelector(".viz-readout"),m=d.querySelector("input"),S=d.querySelector("[data-for=x0]");let i=.8;function f(){const c=s.clientWidth,p=s.clientHeight,e=F(t,c,p),o=a=>q(a,l,v,e.x0,e.x1),n=a=>P(a,w,M,e.y0,e.y1);t.strokeStyle="rgba(18,36,58,0.12)",t.beginPath(),t.moveTo(e.x0,n(0)),t.lineTo(e.x1,n(0)),t.moveTo(o(0),e.y0),t.lineTo(o(0),e.y1),t.stroke();const u=E(h,l,v,220);t.beginPath(),u.forEach((a,T)=>T?t.lineTo(o(a.x),n(a.y)):t.moveTo(o(a.x),n(a.y))),t.strokeStyle="#1a6a88",t.lineWidth=2.2,t.stroke();const r=h(i),b=L(i);t.beginPath(),t.moveTo(o(l),n(r+b*(l-i))),t.lineTo(o(v),n(r+b*(v-i))),t.strokeStyle="#c9a227",t.lineWidth=2,t.stroke(),t.fillStyle="#c45c9a",t.beginPath(),t.arc(o(i),n(r),6,0,Math.PI*2),t.fill(),z.innerHTML=`f(x) = sin x + 0,18 x &nbsp;·&nbsp; x₀ = <b>${i.toFixed(2)}</b>
      &nbsp;·&nbsp; f(x₀) = ${r.toFixed(3)}
      &nbsp;·&nbsp; ${y("viz.tangent.slope")} f'(x₀) = <b>${b.toFixed(3)}</b>
      <br>${y("viz.tangent.line")}`}function x(c){i=c,S.textContent=c.toFixed(2),f()}return m.addEventListener("input",()=>x(Number(m.value))),s.addEventListener("pointerdown",c=>{const p=o=>{const n=s.getBoundingClientRect(),u=l+(o.clientX-n.left)/n.width*(v-l),r=Math.max(-3,Math.min(3,u));m.value=String(r),x(r)};p(c);const e=()=>{s.removeEventListener("pointermove",p),s.removeEventListener("pointerup",e)};s.addEventListener("pointermove",p),s.addEventListener("pointerup",e)}),x(i),{resize(){g(),f()},destroy(){}}}export{Y as mount};

import{e as w}from"./chrome-BqE1ziQq.js";import{t as s,o as A,q as g,r as E}from"./index-BCa5qDPf.js";const m=6,z=1/m;function L(){return 1+Math.floor(Math.random()*m)}function T(n){const e=new Array(m).fill(0);for(let t=0;t<n;t++)e[L()-1]++;return e}function q(n,e){return n.map((t,d)=>t+e[d])}function H(n){const e=n.reduce((t,d)=>t+d,0);return e?n.map(t=>t/e):n.map(()=>0)}function k(n){return Math.max(...n.map(e=>Math.abs(e-z)))}function I(n){n.append(w(`
    <div class="viz">
      <div class="viz-controls wrap">
        <button type="button" class="chip" data-n="1">${s("viz.prob.roll1")}</button>
        <button type="button" class="chip" data-n="10">${s("viz.prob.roll10")}</button>
        <button type="button" class="chip" data-n="100">${s("viz.prob.roll100")}</button>
        <button type="button" class="chip" data-n="1000">${s("viz.prob.roll1000")}</button>
        <button type="button" class="chip" data-reset>${s("viz.prob.reset")}</button>
      </div>
      <div class="viz-canvas-wrap"><canvas></canvas></div>
      <p class="viz-readout"></p>
    </div>`));const e=n.querySelector("canvas"),t=e.getContext("2d"),d=n.querySelector(".viz-readout");let c=[0,0,0,0,0,0],u=null;function p(){const a=e.parentElement,o=a.clientWidth||440,r=a.clientHeight>80?a.clientHeight:Math.max(220,Math.round(o*.62)),i=Math.min(devicePixelRatio||1,2);e.width=Math.round(o*i),e.height=Math.round(r*i),e.style.width=o+"px",e.style.height=r+"px",t.setTransform(i,0,0,i,0,0),S(o,r)}function S(a,o){const r=c.reduce((l,f)=>l+f,0),i=H(c);t.fillStyle="#f6efe0",t.fillRect(0,0,a,o);const b=36,v=(a-b*2)/6,x=o-70;for(let l=0;l<6;l++){const f=b+l*v+8,y=r?i[l]*x*3.2:0;t.fillStyle=u===l+1?"#c9a227":"#1a6a88",t.globalAlpha=.85,t.fillRect(f,o-40-y,v-16,y),t.globalAlpha=1,t.fillStyle="#12243a",t.font="600 13px Inter, sans-serif",t.textAlign="center",t.fillText(String(l+1),f+(v-16)/2,o-18),t.font="11px Inter, sans-serif",t.fillStyle="rgba(18,36,58,0.65)",t.fillText(r?(100*i[l]).toFixed(1)+" %":"0 %",f+(v-16)/2,o-44-y)}t.strokeStyle="rgba(196,92,154,0.85)",t.setLineDash([4,4]);const h=o-40-z*x*3.2;t.beginPath(),t.moveTo(b,h),t.lineTo(a-b,h),t.stroke(),t.setLineDash([]),t.fillStyle="#c45c9a",t.font="11px Inter, sans-serif",t.textAlign="left",t.fillText("1/6 ≈ 16,7 %",b,h-6);const M=r?k(i):0;d.innerHTML=r?`<b>${r.toLocaleString(E())}</b> ${s("viz.prob.rolls")}
         &nbsp;·&nbsp; max |f<sub>n</sub> − 1/6| = <b>${(100*M).toFixed(2)} %</b>
         ${u?`&nbsp;·&nbsp; ${s("viz.prob.last")} : <b>${u}</b>`:""}
         <br>${s("viz.prob.theory")}`:s("viz.prob.empty")}const $=A("die:landed",({face:a})=>{u=a,c[a-1]++,p()});return n.querySelectorAll("[data-n]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.n);if(o===1){g("die:throw");return}c=q(c,T(o)),u=null,g("die:throw",{record:!1}),p()})}),n.querySelector("[data-reset]").addEventListener("click",()=>{c=[0,0,0,0,0,0],u=null,p()}),p(),{resize:p,destroy(){$()}}}export{I as mount};

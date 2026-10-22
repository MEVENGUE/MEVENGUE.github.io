import{e as b,c as x,b as g}from"./chrome-BqE1ziQq.js";import{t as f}from"./index-BCa5qDPf.js";const z=[[0,0],[0,1.4],[.85,1.4],[.85,1.15],[.28,1.15],[.28,.85],[.72,.85],[.72,.6],[.28,.6],[.28,0]];function $({tx:e,ty:t,theta:n,reflectY:p}){const i=Math.cos(n),o=Math.sin(n),c=p?-1:1;return[[i,-o*c,e],[o,i*c,t]]}function S(e,t){return[t[0][0]*e[0]+t[0][1]*e[1]+t[0][2],t[1][0]*e[0]+t[1][1]*e[1]+t[1][2]]}function v(e){const t=$(e);return{M:t,pts:z.map(n=>S(n,t))}}function T(e){const t=n=>(Object.is(n,-0)?0:n).toFixed(2);return`[ ${t(e[0][0])}  ${t(e[0][1])}  ${t(e[0][2])} ]
[ ${t(e[1][0])}  ${t(e[1][1])}  ${t(e[1][2])} ]`}function w(e){e.append(b(`
    <div class="viz">
      <div class="viz-controls">
        <label class="ctrl">${f("viz.transforms.tx")}
          <input type="range" name="tx" min="-2" max="2" step="0.05" value="0.8" />
          <span data-for="tx"></span>
        </label>
        <label class="ctrl">${f("viz.transforms.ty")}
          <input type="range" name="ty" min="-1.5" max="1.5" step="0.05" value="0.2" />
          <span data-for="ty"></span>
        </label>
        <label class="ctrl">${f("viz.transforms.rot")}
          <input type="range" name="theta" min="-3.14" max="3.14" step="0.02" value="0.4" />
          <span data-for="theta"></span>
        </label>
        <label class="ctrl check"><input type="checkbox" name="reflectY" /> ${f("viz.transforms.reflect")}</label>
      </div>
      <div class="host"></div>
      <pre class="viz-readout matrix"></pre>
    </div>`));const{ctx:t,canvas:n,resize:p}=x(e.querySelector(".host"),1.45),i=e.querySelector(".viz-readout");let o={tx:.8,ty:.2,theta:.4,reflectY:!1};function c(a,s,r){t.beginPath(),a.forEach((l,m)=>{const[h,d]=y(l);m?t.lineTo(h,d):t.moveTo(h,d)}),t.closePath(),t.fillStyle=s,t.fill(),t.strokeStyle=r,t.lineWidth=1.6,t.stroke()}function y(a){const s=n.clientWidth,r=n.clientHeight,l=Math.min(s,r)*.22;return[s/2+a[0]*l,r/2-a[1]*l]}function u(){const a=n.clientWidth,s=n.clientHeight;t.fillStyle="#f6efe0",t.fillRect(0,0,a,s),t.strokeStyle="rgba(18,36,58,0.12)",t.beginPath(),t.moveTo(20,s/2),t.lineTo(a-20,s/2),t.moveTo(a/2,16),t.lineTo(a/2,s-16),t.stroke();const{M:r,pts:l}=v(o),m=v({tx:0,ty:0,theta:0,reflectY:!1}).pts;c(m,"rgba(26,106,136,0.12)","rgba(26,106,136,0.45)"),c(l,"rgba(201,162,39,0.45)","#8a6a22"),i.textContent=`T(p) = M p̃
`+T(r)}return g(e,a=>{o={...a,theta:a.theta,reflectY:!!a.reflectY},u()}),{resize(){p(),u()},destroy(){}}}export{w as mount};

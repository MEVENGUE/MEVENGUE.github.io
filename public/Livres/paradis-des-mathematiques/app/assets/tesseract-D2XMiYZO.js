import{t as o,W as E,a as G,P as L,A as P,i as M,j as R,k as $,e as j,L as B,f as F,l as W,g as k,m as A,n as q,p as D}from"./index-C9RxrNRS.js";import{e as H,b as U}from"./chrome-BqE1ziQq.js";function O(d,{reducedMotion:S}){d.append(H(`
    <div class="viz">
      <div class="viz-controls">
        <label class="ctrl">${o("viz.tesseract.xw")}
          <input type="range" name="xw" min="0" max="6.28" step="0.01" value="0.4" />
        </label>
        <label class="ctrl">${o("viz.tesseract.yw")}
          <input type="range" name="yw" min="0" max="6.28" step="0.01" value="0.7" />
        </label>
        <label class="ctrl">${o("viz.tesseract.zw")}
          <input type="range" name="zw" min="0" max="6.28" step="0.01" value="0.2" />
        </label>
        <label class="ctrl">${o("viz.tesseract.dist")}
          <input type="range" name="dist" min="2.2" max="6" step="0.05" value="3.2" />
        </label>
      </div>
      <div class="viz-canvas-wrap"><canvas></canvas></div>
      <p class="viz-readout">${o("viz.tesseract.readout")}</p>
    </div>`));const v=d.querySelector("canvas"),c=new E({canvas:v,antialias:!0,alpha:!0});c.setPixelRatio(Math.min(devicePixelRatio,2));const l=new G,n=new L(40,1,.1,30);n.position.set(0,0,6.2),n.lookAt(0,0,0),l.add(new P("#ffffff",1));const s=new Float32Array(M.length*2*3),p=new R;p.setAttribute("position",new $(s,3));const w=new j(p,new B({color:"#e8c56a",transparent:!0,opacity:.95}));l.add(w);const x=new F(.07,10,10),b=new W({color:"#f4e6c3"}),m=new k(x,b,A.length);l.add(m);let i={xw:.4,yw:.7,zw:.2,dist:3.2,xy:.3},y=!0,h;const u=new q;function f(){let e=0;const a=A.map(t=>D(t,i,i.dist));for(const[t,r]of M)s[e++]=a[t][0],s[e++]=a[t][1],s[e++]=a[t][2],s[e++]=a[r][0],s[e++]=a[r][1],s[e++]=a[r][2];p.attributes.position.needsUpdate=!0,a.forEach((t,r)=>{u.position.set(t[0],t[1],t[2]),u.updateMatrix(),m.setMatrixAt(r,u.matrix)}),m.instanceMatrix.needsUpdate=!0}function g(){const e=v.parentElement,a=e.clientWidth||420,t=e.clientHeight>80?e.clientHeight:Math.max(240,Math.round(a*.72));c.setSize(a,t,!1),n.aspect=a/t,n.updateProjectionMatrix()}function z(){y&&(S||(i.xy+=.004,f()),c.render(l,n),h=requestAnimationFrame(z))}return U(d,e=>{i={...i,...e},f()}),g(),f(),z(),{resize:g,destroy(){y=!1,cancelAnimationFrame(h),c.dispose(),p.dispose(),x.dispose(),w.material.dispose(),b.dispose()}}}export{O as mount};

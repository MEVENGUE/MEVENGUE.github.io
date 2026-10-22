import{e as v}from"./chrome-BqE1ziQq.js";import{t as i}from"./index-BCa5qDPf.js";function g(t){return Array.from({length:t},(e,n)=>({guest:n+1,room:n+1}))}function z(t){return[{guest:"★",room:1},...Array.from({length:t},(e,n)=>({guest:n+1,room:n+2}))]}function h(t){const e=Array.from({length:t},(r,o)=>({guest:o+1,room:2*(o+1)})),n=Array.from({length:t},(r,o)=>({guest:`ω${o+1}`,room:2*o+1}));return[...e,...n].sort((r,o)=>r.room-o.room)}function b(t,e){return t==="full"?e:t==="one"?e+1:2*e}function q(t){t.append(v(`
    <div class="viz">
      <div class="viz-controls">
        <label class="ctrl">${i("viz.infinity.rooms")}
          <input type="range" name="n" min="6" max="16" step="1" value="8" />
          <span data-for="n">8</span>
        </label>
        <button type="button" class="chip on" data-mode="full">${i("viz.infinity.fullBtn")}</button>
        <button type="button" class="chip" data-mode="one">${i("viz.infinity.oneBtn")}</button>
        <button type="button" class="chip" data-mode="inf">${i("viz.infinity.infBtn")}</button>
      </div>
      <div class="hotel" role="img" aria-label="${i("viz.infinity.aria")}"></div>
      <p class="viz-readout"></p>
    </div>`));const e=t.querySelector(".hotel"),n=t.querySelector(".viz-readout"),r=t.querySelector("[name=n]"),o=t.querySelector("[data-for=n]");let l=8,a="full";const p={full:i("viz.infinity.full"),one:i("viz.infinity.one"),inf:i("viz.infinity.inf")};function f(){const s=a==="full"?g(l):a==="one"?z(l):h(l),u=b(a,l);e.innerHTML="";for(let c=1;c<=u;c++){const m=s.find(y=>y.room===c),d=document.createElement("div");d.className="room"+(m?" filled":" empty"),d.innerHTML=`<small>${i("viz.infinity.room")} ${c}</small><b>${m?m.guest:"-"}</b>`,e.append(d)}n.innerHTML=p[a]}return r.addEventListener("input",()=>{l=Number(r.value),o.textContent=String(l),f()}),t.querySelectorAll("[data-mode]").forEach(s=>{s.addEventListener("click",()=>{a=s.dataset.mode,t.querySelectorAll("[data-mode]").forEach(u=>u.classList.toggle("on",u===s)),f()})}),f(),{destroy(){},resize(){}}}export{q as mount};

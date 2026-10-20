/**
 * Interactive HTML-in-canvas cloth, adapted from
 * https://github.com/fimbox/html-in-canvas/blob/main/plugins/html-cloth.mjs
 *
 * ArrivalScript / PlayCanvas / Ammo are not used. The same idea is rebuilt with
 * Three.js + Verlet cloth, public CV DOM only:
 *   1. Native Chrome html-in-canvas (drawElementImage / texElementImage2D)
 *   2. Local html2canvas raster if the origin trial is unavailable
 * UV hits map back onto the public CV so links stay clickable on the hanging sheet.
 */

import type {
  BufferGeometry,
  CanvasTexture,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export type CaptureMode = 'html-in-canvas' | 'raster';

export type HtmlCanvasAdapterOptions = {
  source: HTMLElement;
  canvas: HTMLCanvasElement;
  onReady?: (mode: CaptureMode) => void;
  onError?: () => void;
};

export type HtmlCanvasAdapter = {
  captureMode: CaptureMode;
  refresh(): Promise<void>;
  panVertical(delta: number): void;
  dispose(): void;
};

type Particle = {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  pz: number;
  ox: number;
  oy: number;
  oz: number;
  invMass: number;
};

type Constraint = { a: number; b: number; rest: number };

type GLWithHtml = WebGLRenderingContext & {
  texElementImage2D?: (...args: unknown[]) => void;
  texElementSubImage2D?: (...args: unknown[]) => void;
};

type Ctx2DWithHtml = CanvasRenderingContext2D & {
  drawElementImage?: (element: Element, dx: number, dy: number, dw?: number, dh?: number) => void;
};

const TEX_W = 1024;
const TEX_H = 1448;
const PAPER = '#fffdf8';
const STUDIO = 0xeee6d8;

function supportsWebGl() {
  try {
    const probe = document.createElement('canvas');
    return Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    return false;
  }
}

function hasDrawElementImage() {
  const ctx = document.createElement('canvas').getContext('2d') as Ctx2DWithHtml | null;
  return Boolean(ctx && typeof ctx.drawElementImage === 'function');
}

function hasTexElement(gl: GLWithHtml | null) {
  return Boolean(gl && (typeof gl.texElementImage2D === 'function' || typeof gl.texElementSubImage2D === 'function'));
}

function paintPaperFallback(target: HTMLCanvasElement, label: string) {
  const ctx = target.getContext('2d');
  if (!ctx) return;
  const { width: w, height: h } = target;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#2a241c';
  ctx.lineWidth = 6;
  ctx.strokeRect(28, 28, w - 56, h - 56);
  ctx.fillStyle = '#9a5b3c';
  ctx.font = '600 54px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, w / 2, h * 0.42);
  ctx.fillStyle = 'rgba(42,36,28,0.55)';
  ctx.font = '22px ui-monospace, monospace';
  ctx.fillText('HTML-in-Canvas fallback', w / 2, h * 0.48);
}

async function rasterizeWithHtml2Canvas(source: HTMLElement, target: HTMLCanvasElement) {
  const html2canvas = (await import('html2canvas')).default;
  const shot = await html2canvas(source, {
    backgroundColor: PAPER,
    scale: 2,
    useCORS: true,
    logging: false,
    foreignObjectRendering: false,
    width: source.offsetWidth || 794,
    height: Math.max(source.offsetHeight || 1123, 800),
    windowWidth: Math.max(source.scrollWidth, 794),
    windowHeight: Math.max(source.scrollHeight, 1123),
  });
  const ctx = target.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, target.width, target.height);
  ctx.drawImage(shot, 0, 0, target.width, target.height);
}

function tryDrawElementImage(source: HTMLElement, target: HTMLCanvasElement) {
  const ctx = target.getContext('2d') as Ctx2DWithHtml | null;
  if (!ctx || typeof ctx.drawElementImage !== 'function') return false;
  try {
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, target.width, target.height);
    ctx.drawElementImage(source, 0, 0, target.width, target.height);
    return true;
  } catch {
    return false;
  }
}

function findAtUv(source: HTMLElement, u: number, v: number) {
  const width = source.offsetWidth || 1;
  const height = source.offsetHeight || 1;
  const x = u * width;
  const y = v * height;
  const origin = source.getBoundingClientRect();
  let best: Element = source;
  const walker = document.createTreeWalker(source, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode as Element | null;
  while (node) {
    const rect = (node as HTMLElement).getBoundingClientRect();
    const lx = rect.left - origin.left;
    const ly = rect.top - origin.top;
    if (x >= lx && x <= lx + rect.width && y >= ly && y <= ly + rect.height) best = node;
    node = walker.nextNode() as Element | null;
  }
  return best;
}

function createCloth(cols: number, rows: number, width: number, height: number, topY: number) {
  const particles: Particle[] = [];
  const constraints: Constraint[] = [];
  const dx = width / cols;
  const dy = height / rows;

  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      const px = (x / cols - 0.5) * width;
      const py = topY - (y / rows) * height;
      const pz = (Math.random() - 0.5) * 0.004;
      particles.push({
        x: px,
        y: py,
        z: pz,
        px,
        py,
        pz,
        ox: px,
        oy: py,
        oz: 0,
        invMass: y === 0 ? 0 : 1,
      });
    }
  }

  const index = (x: number, y: number) => y * (cols + 1) + x;
  const link = (a: number, b: number) => {
    const pa = particles[a];
    const pb = particles[b];
    constraints.push({
      a,
      b,
      rest: Math.hypot(pb.x - pa.x, pb.y - pa.y, pb.z - pa.z),
    });
  };

  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      if (x < cols) link(index(x, y), index(x + 1, y));
      if (y < rows) link(index(x, y), index(x, y + 1));
      if (x < cols && y < rows) {
        link(index(x, y), index(x + 1, y + 1));
        link(index(x + 1, y), index(x, y + 1));
      }
    }
  }

  return { particles, constraints, dx, dy, cols, rows, width, height, topY, index };
}

export async function createHtmlCanvasAdapter(
  options: HtmlCanvasAdapterOptions,
): Promise<HtmlCanvasAdapter | null> {
  if (!supportsWebGl()) return null;

  const THREE = await import('three');
  const canvas = options.canvas;
  const source = options.source;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 900px), (pointer: coarse)').matches;
  const cols = mobile ? 14 : 20;
  const rows = mobile ? 20 : 28;
  const clothW = 1.78;
  const clothH = clothW * (TEX_H / TEX_W);
  const topY = 1.18;

  const renderer: WebGLRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.35 : 1.75));
  renderer.setClearColor(STUDIO, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvas.setAttribute('layoutsubtree', 'true');

  const scene: Scene = new THREE.Scene();
  scene.fog = new THREE.Fog(STUDIO, 7, 16);

  const camera: PerspectiveCamera = new THREE.PerspectiveCamera(26, 1, 0.08, 40);
  const restLookY = topY - clothH * 0.5;
  const cameraTarget = new THREE.Vector3(0, restLookY, 0);
  const baseYaw = -0.06;
  const basePitch = 0.03;
  let yaw = baseYaw;
  let pitch = basePitch;
  let radius = mobile ? 4.2 : 3.65;
  let lookY = restLookY;
  let lookTargetY = restLookY;
  let userOrbit = false;
  let yawVel = 0;
  let pitchVel = 0;
  const pointers = new Map<number, { x: number; y: number }>();
  let pinchDistance = 0;

  const hemi = new THREE.HemisphereLight(0xfff6ea, 0x8a6a4a, 1.35);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffe8d2, 2.4);
  key.position.set(2.4, 4.2, 3.6);
  key.castShadow = !mobile;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 14;
  scene.add(key);
  scene.add(new THREE.DirectionalLight(0x9a5b3c, 0.55).translateX(-3).translateY(1.4).translateZ(-2));

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(6.5, 48),
    new THREE.MeshStandardMaterial({ color: 0xe7dece, roughness: 0.92, metalness: 0.02 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = topY - clothH - 0.28;
  floor.receiveShadow = true;
  scene.add(floor);

  const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, clothW + 0.18, 18),
    new THREE.MeshStandardMaterial({ color: 0x9a5b3c, roughness: 0.35, metalness: 0.55 }),
  );
  rod.rotation.z = Math.PI / 2;
  rod.position.y = topY + 0.02;
  scene.add(rod);
  for (const side of [-1, 1]) {
    const knob = new THREE.Mesh(
      new THREE.SphereGeometry(0.032, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xc29a4e, roughness: 0.3, metalness: 0.7 }),
    );
    knob.position.set(side * (clothW / 2 + 0.1), topY + 0.02, 0);
    scene.add(knob);
  }

  const capture = document.createElement('canvas');
  capture.width = TEX_W;
  capture.height = TEX_H;
  paintPaperFallback(capture, source.querySelector('.cv-name')?.textContent?.trim() || 'CV');

  const texture: CanvasTexture = new THREE.CanvasTexture(capture);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  const cloth = createCloth(cols, rows, clothW, clothH, topY);
  const geometry: BufferGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array((cols + 1) * (rows + 1) * 3);
  const uvs = new Float32Array((cols + 1) * (rows + 1) * 2);
  const indices: number[] = [];
  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      const i = y * (cols + 1) + x;
      uvs[i * 2] = x / cols;
      uvs[i * 2 + 1] = 1 - y / rows;
      if (x === cols || y === rows) continue;
      const i0 = i;
      const i1 = i + 1;
      const i2 = i + cols + 1;
      const i3 = i2 + 1;
      indices.push(i0, i2, i1, i1, i2, i3);
    }
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
    roughness: 0.62,
    metalness: 0.06,
    clearcoat: 0.12,
    clearcoatRoughness: 0.7,
    side: THREE.DoubleSide,
    sheen: 0.18,
    sheenColor: new THREE.Color(0xf4ead9),
  });
  const mesh: Mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const gl = renderer.getContext() as GLWithHtml;
  let captureMode: CaptureMode = hasDrawElementImage() || hasTexElement(gl) ? 'html-in-canvas' : 'raster';
  let disposed = false;
  let frame = 0;
  let lastPaint = 0;
  let grabbing = -1;
  let pointerMode: 'none' | 'orbit' | 'cloth' = 'none';
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastY = 0;
  let moved = false;
  let hitU = 0;
  let hitV = 0;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const grabPlane = new THREE.Plane();
  const grabHit = new THREE.Vector3();
  const camOffset = new THREE.Vector3();

  const panRange = () => {
    const vFov = (camera.fov * Math.PI) / 180;
    const visible = 2 * Math.tan(vFov / 2) * radius;
    return Math.max(0.38, (clothH - visible * 0.36) / 2);
  };

  const clampLookY = (value: number) => {
    const range = panRange();
    return Math.max(restLookY - range, Math.min(restLookY + range, value));
  };

  const panVertical = (delta: number) => {
    lookTargetY = clampLookY(lookTargetY + delta);
  };

  const placeCamera = () => {
    cameraTarget.y = lookY;
    camera.position.set(
      Math.sin(yaw) * Math.cos(pitch) * radius,
      cameraTarget.y + Math.sin(pitch) * radius,
      Math.cos(yaw) * Math.cos(pitch) * radius,
    );
    camera.lookAt(cameraTarget);
  };

  const fitRadius = () => {
    const vFov = (camera.fov * Math.PI) / 180;
    const distH = (clothH * 0.56) / Math.tan(vFov / 2);
    const distW = (clothW * 0.62) / Math.tan((vFov / 2) * Math.max(camera.aspect, 0.5));
    const fitted = Math.max(distH, distW) * (mobile ? 1.06 : 1);
    radius = Math.max(2.15, Math.min(7.6, userOrbit ? radius : fitted));
    lookTargetY = clampLookY(lookTargetY);
    lookY = clampLookY(lookY);
  };

  const resize = () => {
    const w = canvas.clientWidth || 960;
    const h = canvas.clientHeight || 720;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fitRadius();
  };

  const uploadNativeGl = () => {
    if (!hasTexElement(gl)) return false;
    try {
      renderer.initTexture(texture);
      const props = renderer.properties.get(texture) as { __webglTexture?: WebGLTexture };
      const glTexture = props.__webglTexture;
      if (!glTexture) return false;
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      if (typeof gl.texElementSubImage2D === 'function') {
        gl.texElementSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, source);
      } else if (typeof gl.texElementImage2D === 'function') {
        gl.texElementImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
      return true;
    } catch {
      return false;
    }
  };

  const refreshTexture = async (forceRaster = false) => {
    if (!forceRaster && tryDrawElementImage(source, capture)) {
      captureMode = 'html-in-canvas';
      texture.needsUpdate = true;
      return;
    }
    if (!forceRaster && uploadNativeGl()) {
      captureMode = 'html-in-canvas';
      return;
    }
    try {
      await rasterizeWithHtml2Canvas(source, capture);
      captureMode = 'raster';
      texture.needsUpdate = true;
    } catch {
      paintPaperFallback(capture, source.querySelector('.cv-name')?.textContent?.trim() || 'CV');
      texture.needsUpdate = true;
    }
  };

  const writePositions = () => {
    for (let i = 0; i < cloth.particles.length; i += 1) {
      const p = cloth.particles[i];
      const o = i * 3;
      positions[o] = p.x;
      positions[o + 1] = p.y;
      positions[o + 2] = p.z;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
  };

  const satisfy = () => {
    for (const c of cloth.constraints) {
      const p1 = cloth.particles[c.a];
      const p2 = cloth.particles[c.b];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dz = p2.z - p1.z;
      const dist = Math.hypot(dx, dy, dz) || 0.0001;
      const diff = (dist - c.rest) / dist;
      const mass = p1.invMass + p2.invMass;
      if (mass === 0) continue;
      const s1 = p1.invMass / mass * diff * 0.68;
      const s2 = p2.invMass / mass * diff * 0.68;
      p1.x += dx * s1;
      p1.y += dy * s1;
      p1.z += dz * s1;
      p2.x -= dx * s2;
      p2.y -= dy * s2;
      p2.z -= dz * s2;
    }
  };

  const stepCloth = (dt: number) => {
    const t = performance.now() * 0.001;
    const windX = reduced ? 0 : Math.sin(t * 0.35) * 0.006;
    const windZ = reduced ? 0 : Math.sin(t * 0.28 + 0.4) * 0.01;
    const gravity = -3.4;
    const damping = 0.991;
    const sway = 0;

    for (const p of cloth.particles) {
      if (p.invMass === 0) {
        p.x = p.ox + sway;
        p.y = p.oy;
        p.z = p.oz;
        p.px = p.x;
        p.py = p.y;
        p.pz = p.z;
        continue;
      }
      const vx = (p.x - p.px) * damping;
      const vy = (p.y - p.py) * damping;
      const vz = (p.z - p.pz) * damping;
      p.px = p.x;
      p.py = p.y;
      p.pz = p.z;
      p.x += vx + (windX * p.invMass) * dt;
      p.y += vy + gravity * dt * dt;
      p.z += vz + windZ * dt;
    }

    if (grabbing >= 0) {
      const p = cloth.particles[grabbing];
      if (p.invMass > 0) {
        p.x += (grabHit.x - p.x) * 0.65;
        p.y += (grabHit.y - p.y) * 0.65;
        p.z += (grabHit.z - p.z) * 0.65;
      }
    }

    const iterations = mobile ? 8 : 12;
    for (let i = 0; i < iterations; i += 1) satisfy();
    writePositions();
  };

  const setPointerFromEvent = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
  };

  const hitCloth = (event: PointerEvent) => {
    setPointerFromEvent(event);
    const hits = raycaster.intersectObject(mesh, false);
    const hit = hits[0];
    if (!hit?.uv) return null;
    hitU = hit.uv.x;
    hitV = 1 - hit.uv.y;
    return hit;
  };

  const poke = (u: number, v: number, impulse = 0.085) => {
    const nx = Math.round(u * cols);
    const ny = Math.round(v * rows);
    const dir = camera.getWorldDirection(camOffset).multiplyScalar(impulse);
    for (let dy = -2; dy <= 2; dy += 1) {
      for (let dx = -2; dx <= 2; dx += 1) {
        const x = nx + dx;
        const y = ny + dy;
        if (x < 0 || y < 0 || x > cols || y > rows) continue;
        const p = cloth.particles[cloth.index(x, y)];
        if (p.invMass === 0) continue;
        const falloff = 1 / (1 + dx * dx + dy * dy);
        p.z += dir.z * falloff;
        p.x += dir.x * falloff * 0.35;
        p.y += dir.y * falloff * 0.2;
      }
    }
  };

  const activateAtUv = (u: number, v: number) => {
    const target = findAtUv(source, u, v);
    const link = target.closest('a');
    if (link instanceof HTMLAnchorElement && link.href) {
      window.open(link.href, link.target || '_self', 'noopener');
    }
  };

  const pinchSpan = () => {
    const pts = [...pointers.values()];
    if (pts.length < 2) return 0;
    return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  };

  const resetView = () => {
    userOrbit = false;
    yaw = baseYaw;
    pitch = basePitch;
    yawVel = 0;
    pitchVel = 0;
    lookTargetY = restLookY;
    lookY = restLookY;
    fitRadius();
    placeCamera();
  };

  const onPointerDown = (event: PointerEvent) => {
    canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    startX = lastX = event.clientX;
    startY = lastY = event.clientY;
    moved = false;
    const hit = hitCloth(event);
    if (hit) {
      hitU = hit.uv?.x ?? hitU;
      hitV = hit.uv ? 1 - hit.uv.y : hitV;
    }
    if (pointers.size === 2) {
      pinchDistance = pinchSpan();
      pointerMode = 'none';
      grabbing = -1;
      return;
    }
    if (event.shiftKey && hit) {
      pointerMode = 'cloth';
      grabbing = cloth.index(Math.round(hitU * cols), Math.round(hitV * rows));
      grabPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(camOffset).negate(), hit.point);
      grabHit.copy(hit.point);
      poke(hitU, hitV, 0.03);
    } else {
      pointerMode = 'orbit';
      grabbing = -1;
      userOrbit = true;
    }
    canvas.style.cursor = 'grabbing';
  };

  const onPointerMove = (event: PointerEvent) => {
    if (pointers.has(event.pointerId)) pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2) {
      const next = pinchSpan();
      if (pinchDistance > 0 && next > 0) {
        userOrbit = true;
        radius = Math.max(2.05, Math.min(7.6, radius * (pinchDistance / next)));
      }
      pinchDistance = next;
      return;
    }
    if (pointerMode === 'none') {
      canvas.style.cursor = hitCloth(event) ? 'pointer' : 'grab';
      return;
    }
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    if (Math.hypot(event.clientX - startX, event.clientY - startY) > 5) moved = true;

    if (pointerMode === 'orbit') {
      yaw -= dx * 0.0048;
      pitch = Math.max(-0.42, Math.min(0.46, pitch - dy * 0.0036));
      yawVel = -dx * 0.18;
      pitchVel = -dy * 0.12;
      return;
    }

    setPointerFromEvent(event);
    raycaster.ray.intersectPlane(grabPlane, grabHit);
    const hit = hitCloth(event);
    if (hit) {
      hitU = hit.uv?.x ?? hitU;
      hitV = hit.uv ? 1 - hit.uv.y : hitV;
    }
  };

  const onPointerUp = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    pinchDistance = pointers.size === 2 ? pinchSpan() : 0;
    if (pointerMode !== 'none' && !moved) {
      const hit = hitCloth(event);
      if (hit) {
        poke(hitU, hitV, 0.025);
        activateAtUv(hitU, hitV);
      }
    }
    pointerMode = 'none';
    grabbing = -1;
    canvas.style.cursor = 'grab';
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (event.shiftKey) {
      panVertical(-event.deltaY * 0.0024);
      return;
    }
    userOrbit = true;
    radius = Math.max(2.05, Math.min(7.6, radius * Math.exp(event.deltaY * 0.00115)));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (canvas.offsetParent === null) return;
    const target = event.target as HTMLElement | null;
    if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    const step = clothH * 0.16;
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      panVertical(step);
    } else if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      panVertical(-step);
    } else if (event.key === 'Home') {
      event.preventDefault();
      lookTargetY = clampLookY(restLookY + panRange());
    } else if (event.key === 'End') {
      event.preventDefault();
      lookTargetY = clampLookY(restLookY - panRange());
    }
  };

  const onDblClick = (event: MouseEvent) => {
    event.preventDefault();
    resetView();
  };

  let last = performance.now();
  const animate = (now: number) => {
    if (disposed) return;
    frame = requestAnimationFrame(animate);
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    stepCloth(dt);
    if (pointerMode === 'none' && pointers.size < 2) {
      yaw += yawVel * dt;
      pitch = Math.max(-0.42, Math.min(0.46, pitch + pitchVel * dt));
      yawVel *= 0.9;
      pitchVel *= 0.9;
      if (Math.abs(yawVel) < 0.002) yawVel = 0;
      if (Math.abs(pitchVel) < 0.002) pitchVel = 0;
    }
    lookY += (lookTargetY - lookY) * Math.min(1, dt * 9);
    placeCamera();
    if (captureMode === 'html-in-canvas' && now - lastPaint > 80) {
      lastPaint = now;
      if (tryDrawElementImage(source, capture)) texture.needsUpdate = true;
      else uploadNativeGl();
    }
    renderer.render(scene, camera);
  };

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(canvas.parentElement || canvas);
  window.addEventListener('resize', resize);
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('wheel', onWheel, { passive: false });
  canvas.addEventListener('dblclick', onDblClick);
  window.addEventListener('keydown', onKeyDown);
  canvas.tabIndex = 0;
  canvas.style.touchAction = 'none';
  canvas.style.cursor = 'grab';

  resize();
  placeCamera();
  writePositions();
  await document.fonts.ready.catch(() => undefined);
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
  void source.offsetHeight;
  await refreshTexture();
  options.onReady?.(captureMode);
  animate(performance.now());

  return {
    get captureMode() {
      return captureMode;
    },
    async refresh() {
      await refreshTexture(true);
    },
    panVertical,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('dblclick', onDblClick);
      window.removeEventListener('keydown', onKeyDown);
      canvas.removeAttribute('layoutsubtree');
      texture.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}

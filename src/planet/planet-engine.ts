import type {
  BufferGeometry,
  Camera,
  Material,
  Object3D,
  Texture,
  WebGLRenderer,
} from 'three';
import type { PlanetManifest, PlanetUiCopy } from './types';

export interface PlanetEngine {
  dispose(): void;
  focusZone(zoneId: string): void;
  advanceTour(): void;
  toggleTour(): void;
}

interface EngineOptions {
  root: HTMLElement;
  canvas: HTMLCanvasElement;
  manifest: PlanetManifest;
  copy: PlanetUiCopy;
  announce(message: string): void;
  onTourChange(active: boolean): void;
  sound(): void;
}

export async function createPlanetEngine(options: EngineOptions): Promise<PlanetEngine> {
  const THREE = await import('three');
  const { root, canvas, manifest, copy, announce, onTourChange, sound } = options;
  const mobile = matchMedia('(max-width: 760px)').matches;
  const lowPower = mobile || (navigator.hardwareConcurrency || 8) <= 4;
  const quality = lowPower ? 0.62 : 1;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !lowPower,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
  camera.position.set(0, 0.25, mobile ? 8.2 : 7.35);
  const world = new THREE.Group();
  world.rotation.set(-0.14, -0.42, 0.04);
  scene.add(world);

  const resources = new Set<BufferGeometry | Material | Texture>();
  const track = <T extends BufferGeometry | Material | Texture>(resource: T) => {
    resources.add(resource);
    return resource;
  };
  const material = (parameters: ConstructorParameters<typeof THREE.MeshStandardMaterial>[0]) =>
    track(new THREE.MeshStandardMaterial(parameters));

  scene.add(new THREE.HemisphereLight(0xfff8e8, 0x083c3c, 2.25));
  const sun = new THREE.DirectionalLight(0xffe2a5, 5.4);
  sun.position.set(5, 6, 7);
  scene.add(sun);
  const tealRim = new THREE.PointLight(0x36d4c4, 18, 18);
  tealRim.position.set(-5, -2, 3);
  scene.add(tealRim);

  const water = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(2.01, lowPower ? 4 : 6)),
    track(new THREE.MeshPhysicalMaterial({
      color: 0x0b706f,
      roughness: 0.16,
      metalness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      transmission: 0.05,
      transparent: true,
      opacity: 0.96,
    })),
  );
  world.add(water);

  const terrain = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(2.035, lowPower ? 3 : 5)),
    track(new THREE.MeshStandardMaterial({
      color: 0xb9c8a1,
      roughness: 0.9,
      metalness: 0.02,
      flatShading: true,
      vertexColors: true,
    })),
  );
  const terrainPositions = terrain.geometry.getAttribute('position');
  const terrainColors: number[] = [];
  const color = new THREE.Color();
  for (let index = 0; index < terrainPositions.count; index += 1) {
    const point = new THREE.Vector3().fromBufferAttribute(terrainPositions, index).normalize();
    const noise = (
      Math.sin(point.x * 11.7) +
      Math.sin(point.y * 15.3 + point.z * 3.1) +
      Math.cos(point.z * 13.1 - point.x * 4.2)
    ) / 3;
    const continental = Math.sin(point.x * 4.1 + point.z * 2.7) + Math.cos(point.y * 5.3 - point.x);
    const elevation = continental + noise * 0.76 > 0.12 ? 0.035 + Math.max(0, noise) * 0.075 : -0.065;
    point.multiplyScalar(2.035 + elevation);
    terrainPositions.setXYZ(index, point.x, point.y, point.z);
    color.set(elevation < 0 ? 0x0b7773 : elevation > 0.085 ? 0xe8dfc6 : 0x718f65);
    terrainColors.push(color.r, color.g, color.b);
  }
  terrain.geometry.setAttribute('color', new THREE.Float32BufferAttribute(terrainColors, 3));
  terrain.geometry.computeVertexNormals();
  world.add(terrain);

  const atmosphere = new THREE.Mesh(
    track(new THREE.SphereGeometry(2.18, lowPower ? 32 : 64, lowPower ? 20 : 40)),
    track(new THREE.MeshBasicMaterial({
      color: 0x7be0d3,
      transparent: true,
      opacity: 0.075,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })),
  );
  world.add(atmosphere);

  const cloudLayer = new THREE.Group();
  const cloudCount = Math.round(32 * quality);
  const cloudGeometry = track(new THREE.SphereGeometry(0.11, lowPower ? 7 : 11, lowPower ? 5 : 8));
  const cloudMaterial = track(new THREE.MeshStandardMaterial({
    color: 0xfffbec,
    emissive: 0x8ec7bb,
    emissiveIntensity: 0.08,
    roughness: 0.95,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  }));
  const clouds = new THREE.InstancedMesh(cloudGeometry, cloudMaterial, cloudCount);
  const cloudDummy = new THREE.Object3D();
  for (let index = 0; index < cloudCount; index += 1) {
    const latitude = -55 + ((index * 37) % 110);
    const longitude = -180 + ((index * 71) % 360);
    const phi = THREE.MathUtils.degToRad(90 - latitude);
    const theta = THREE.MathUtils.degToRad(longitude + 180);
    const position = new THREE.Vector3(
      -2.235 * Math.sin(phi) * Math.cos(theta),
      2.235 * Math.cos(phi),
      2.235 * Math.sin(phi) * Math.sin(theta),
    );
    cloudDummy.position.copy(position);
    cloudDummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize());
    cloudDummy.rotateY(index * 1.71);
    cloudDummy.scale.set(1.15 + (index % 4) * 0.18, 0.2 + (index % 3) * 0.035, 0.52 + (index % 5) * 0.07);
    cloudDummy.updateMatrix();
    clouds.setMatrixAt(index, cloudDummy.matrix);
  }
  clouds.instanceMatrix.needsUpdate = true;
  clouds.renderOrder = 3;
  cloudLayer.add(clouds);
  world.add(cloudLayer);

  const latLon = (latitude: number, longitude: number, radius = 2.12) => {
    const phi = THREE.MathUtils.degToRad(90 - latitude);
    const theta = THREE.MathUtils.degToRad(longitude + 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );
  };

  const orientToSurface = (object: Object3D, position: InstanceType<typeof THREE.Vector3>) => {
    object.position.copy(position);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize());
  };

  const ivory = material({ color: 0xf1ead8, roughness: 0.48, metalness: 0.12 });
  const darkTeal = material({ color: 0x123f3b, roughness: 0.52, metalness: 0.38 });
  const gold = material({ color: 0xd4ad5f, roughness: 0.31, metalness: 0.82, emissive: 0x4b2c08, emissiveIntensity: 0.18 });
  const glass = material({ color: 0x6ed5c9, roughness: 0.12, metalness: 0.34, transparent: true, opacity: 0.83 });

  const poiMeshes: InstanceType<typeof THREE.Mesh>[] = [];
  const poiGeometry = track(new THREE.OctahedronGeometry(0.055, 1));
  const buildingGeometry = track(new THREE.BoxGeometry(1, 1, 1));
  const districtGroups = new Map<string, InstanceType<typeof THREE.Group>>();

  manifest.zones.forEach((zone, zoneIndex) => {
    const district = new THREE.Group();
    const position = latLon(zone.latitude, zone.longitude, 2.1);
    orientToSurface(district, position);
    district.userData.zoneId = zone.id;
    districtGroups.set(zone.id, district);
    world.add(district);

    const pad = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.2 + Math.min(zone.projects.length, 5) * 0.025, 0.23, 0.025, 18)),
      zone.id === 'cloud' ? gold : darkTeal,
    );
    district.add(pad);

    const count = Math.max(2, Math.min(8, zone.projects.length + 1));
    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.399 + zoneIndex;
      const radial = 0.07 + Math.sqrt(index + 1) * 0.055;
      const height = 0.1 + ((index * 7 + zoneIndex * 3) % 9) * 0.018;
      const building = new THREE.Mesh(buildingGeometry, index % 4 === 0 ? glass : ivory);
      building.scale.set(0.055 + (index % 2) * 0.018, height, 0.05 + (index % 3) * 0.012);
      building.position.set(Math.cos(angle) * radial, height / 2 + 0.02, Math.sin(angle) * radial);
      building.rotation.y = -angle;
      district.add(building);
    }

    if (zone.id === 'cloud') {
      for (let row = -1; row <= 1; row += 1) {
        for (let rack = 0; rack < 4; rack += 1) {
          const server = new THREE.Mesh(buildingGeometry, darkTeal);
          server.scale.set(0.035, 0.09, 0.06);
          server.position.set(row * 0.085, 0.065, -0.24 + rack * 0.045);
          district.add(server);
          const led = new THREE.Mesh(poiGeometry, gold);
          led.scale.setScalar(0.14);
          led.position.set(row * 0.085, 0.075, -0.205 + rack * 0.045);
          district.add(led);
        }
      }
    }

    if (zone.id === 'systems') {
      const mast = new THREE.Mesh(track(new THREE.CylinderGeometry(0.008, 0.014, 0.39, 8)), gold);
      mast.position.y = 0.215;
      district.add(mast);
      const networkNodes: InstanceType<typeof THREE.Mesh>[] = [];
      for (let nodeIndex = 0; nodeIndex < 5; nodeIndex += 1) {
        const angle = (nodeIndex / 5) * Math.PI * 2;
        const node = new THREE.Mesh(track(new THREE.SphereGeometry(0.027, 8, 6)), nodeIndex === 0 ? gold : glass);
        node.position.set(Math.cos(angle) * 0.18, 0.075 + (nodeIndex % 2) * 0.045, Math.sin(angle) * 0.18);
        networkNodes.push(node);
        district.add(node);
      }
      networkNodes.forEach((node, nodeIndex) => {
        const next = networkNodes[(nodeIndex + 2) % networkNodes.length];
        const line = new THREE.Line(
          track(new THREE.BufferGeometry().setFromPoints([node.position, next.position])),
          track(new THREE.LineBasicMaterial({ color: 0x61cbbd, transparent: true, opacity: 0.72 })),
        );
        district.add(line);
      });
      const antenna = new THREE.Mesh(track(new THREE.TorusGeometry(0.065, 0.007, 6, 24, Math.PI)), glass);
      antenna.position.y = 0.37;
      antenna.rotation.x = Math.PI / 2;
      district.add(antenna);
    }

    if (zone.id === 'data') {
      const core = new THREE.Mesh(track(new THREE.IcosahedronGeometry(0.075, 1)), gold);
      core.position.y = 0.15;
      district.add(core);
      [0.11, 0.16, 0.215].forEach((radius, ringIndex) => {
        const ring = new THREE.Mesh(track(new THREE.TorusGeometry(radius, 0.008, 7, 32)), ringIndex === 1 ? glass : ivory);
        ring.position.y = 0.13 + ringIndex * 0.045;
        ring.rotation.x = Math.PI / 2 + (ringIndex - 1) * 0.3;
        ring.rotation.y = ringIndex * 0.72;
        district.add(ring);
      });
      for (let pointIndex = 0; pointIndex < 6; pointIndex += 1) {
        const angle = (pointIndex / 6) * Math.PI * 2;
        const point = new THREE.Mesh(track(new THREE.SphereGeometry(0.018, 7, 5)), pointIndex % 2 ? gold : glass);
        point.position.set(Math.cos(angle) * 0.2, 0.12 + (pointIndex % 3) * 0.055, Math.sin(angle) * 0.2);
        district.add(point);
      }
    }

    if (zone.id === 'iot') {
      const buoy = new THREE.Mesh(track(new THREE.CylinderGeometry(0.055, 0.075, 0.1, 14)), ivory);
      buoy.position.y = 0.065;
      district.add(buoy);
      const buoyBand = new THREE.Mesh(track(new THREE.TorusGeometry(0.069, 0.011, 7, 24)), gold);
      buoyBand.position.y = 0.09;
      buoyBand.rotation.x = Math.PI / 2;
      district.add(buoyBand);
      const beacon = new THREE.Mesh(track(new THREE.CylinderGeometry(0.006, 0.009, 0.24, 7)), darkTeal);
      beacon.position.y = 0.22;
      district.add(beacon);
      const beaconLight = new THREE.Mesh(track(new THREE.SphereGeometry(0.024, 8, 6)), glass);
      beaconLight.position.y = 0.35;
      district.add(beaconLight);
      for (let sensorIndex = 0; sensorIndex < 3; sensorIndex += 1) {
        const angle = sensorIndex * Math.PI * 2 / 3;
        const sensor = new THREE.Mesh(track(new THREE.SphereGeometry(0.022, 8, 6)), gold);
        sensor.position.set(Math.cos(angle) * 0.145, 0.035, Math.sin(angle) * 0.145);
        district.add(sensor);
      }
    }

    if (zone.id === 'embedded') {
      const board = new THREE.Mesh(buildingGeometry, darkTeal);
      board.scale.set(0.36, 0.025, 0.27);
      board.position.y = 0.045;
      district.add(board);
      const chip = new THREE.Mesh(buildingGeometry, ivory);
      chip.scale.set(0.105, 0.055, 0.105);
      chip.position.y = 0.085;
      district.add(chip);
      for (let traceIndex = 0; traceIndex < 8; traceIndex += 1) {
        const horizontal = traceIndex % 2 === 0;
        const trace = new THREE.Mesh(buildingGeometry, gold);
        trace.scale.set(horizontal ? 0.09 : 0.008, 0.008, horizontal ? 0.008 : 0.07);
        trace.position.set(
          horizontal ? (traceIndex < 4 ? -0.13 : 0.13) : -0.09 + (traceIndex % 4) * 0.06,
          0.065,
          horizontal ? -0.09 + (traceIndex % 4) * 0.06 : (traceIndex < 4 ? -0.11 : 0.11),
        );
        district.add(trace);
      }
    }

    if (zone.id === 'security') {
      const shieldShape = new THREE.Shape();
      shieldShape.moveTo(0, 0.15);
      shieldShape.lineTo(0.12, 0.09);
      shieldShape.lineTo(0.09, -0.06);
      shieldShape.quadraticCurveTo(0, -0.15, -0.09, -0.06);
      shieldShape.lineTo(-0.12, 0.09);
      shieldShape.closePath();
      const shield = new THREE.Mesh(track(new THREE.ExtrudeGeometry(shieldShape, { depth: 0.025, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.006 })), glass);
      shield.position.set(0, 0.19, -0.01);
      shield.scale.setScalar(0.78);
      district.add(shield);
      [0.18, 0.245].forEach((radius, ringIndex) => {
        const ring = new THREE.Mesh(track(new THREE.TorusGeometry(radius, 0.008, 7, 36)), ringIndex ? gold : ivory);
        ring.position.y = 0.17;
        ring.rotation.x = Math.PI / 2;
        district.add(ring);
      });
    }

    if (zone.id === 'governance') {
      for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) {
        const column = new THREE.Mesh(track(new THREE.CylinderGeometry(0.018, 0.022, 0.19, 10)), ivory);
        column.position.set(-0.12 + columnIndex * 0.08, 0.12, 0);
        district.add(column);
      }
      const roof = new THREE.Mesh(track(new THREE.ConeGeometry(0.23, 0.085, 4)), gold);
      roof.position.y = 0.26;
      roof.rotation.y = Math.PI / 4;
      roof.scale.z = 0.55;
      district.add(roof);
      const document = new THREE.Mesh(track(new THREE.PlaneGeometry(0.11, 0.15)), glass);
      document.position.set(0.2, 0.15, 0.02);
      document.rotation.x = -0.18;
      district.add(document);
      for (let lineIndex = 0; lineIndex < 3; lineIndex += 1) {
        const line = new THREE.Mesh(buildingGeometry, gold);
        line.scale.set(0.07, 0.005, 0.005);
        line.position.set(0.2, 0.18 - lineIndex * 0.04, 0.035);
        district.add(line);
      }
    }
  });

  manifest.projects.forEach((project) => {
    const poi = new THREE.Mesh(poiGeometry, project.featured ? gold : ivory);
    const position = latLon(project.latitude, project.longitude, 2.17);
    poi.position.copy(position);
    poi.scale.setScalar(project.featured ? 1.25 : 0.82);
    poi.userData.href = project.href;
    poi.userData.title = project.title;
    poi.userData.projectId = project.id;
    poi.userData.featured = project.featured;
    poi.userData.baseScale = poi.scale.clone();
    world.add(poi);
    poiMeshes.push(poi);
  });

  const roadMaterial = track(new THREE.MeshStandardMaterial({ color: 0xe8dcc2, roughness: 0.7, metalness: 0.12 }));
  const curves: InstanceType<typeof THREE.CatmullRomCurve3>[] = [];
  const zonePairs = manifest.zones.slice(1).map((zone) => [manifest.zones[0], zone] as const);
  zonePairs.push([manifest.zones[1], manifest.zones[4]], [manifest.zones[2], manifest.zones[6]]);
  zonePairs.forEach(([start, end]) => {
    const from = latLon(start.latitude, start.longitude, 2.075);
    const to = latLon(end.latitude, end.longitude, 2.075);
    const middle = from.clone().add(to).normalize().multiplyScalar(2.095);
    const curve = new THREE.CatmullRomCurve3([from, middle, to]);
    curves.push(curve);
    world.add(new THREE.Mesh(
      track(new THREE.TubeGeometry(curve, lowPower ? 18 : 32, 0.009, 5, false)),
      roadMaterial,
    ));
  });

  const vehicleGeometry = track(new THREE.BoxGeometry(0.045, 0.025, 0.075));
  const vehicles = curves.slice(0, lowPower ? 4 : curves.length).map((curve, index) => {
    const mesh = new THREE.Mesh(vehicleGeometry, index % 2 ? gold : glass);
    mesh.userData.curve = curve;
    mesh.userData.offset = index / curves.length;
    world.add(mesh);
    return mesh;
  });

  const packetGeometry = track(new THREE.SphereGeometry(0.022, 7, 5));
  const packetMaterial = track(new THREE.MeshBasicMaterial({ color: 0xffd26f, toneMapped: false }));
  const packets = Array.from({ length: Math.round(18 * quality) }, (_, index) => {
    const mesh = new THREE.Mesh(packetGeometry, packetMaterial);
    mesh.userData.curve = curves[index % curves.length];
    mesh.userData.offset = index / 18;
    world.add(mesh);
    return mesh;
  });

  const treeCount = Math.round(84 * quality);
  const crownGeometry = track(new THREE.ConeGeometry(0.028, 0.09, 5));
  const trees = new THREE.InstancedMesh(crownGeometry, material({ color: 0x416e4e, roughness: 0.94 }), treeCount);
  const matrix = new THREE.Matrix4();
  const dummy = new THREE.Object3D();
  for (let index = 0; index < treeCount; index += 1) {
    const latitude = -62 + ((index * 47) % 124);
    const longitude = -180 + ((index * 83) % 360);
    const position = latLon(latitude, longitude, 2.12);
    orientToSurface(dummy, position);
    dummy.scale.setScalar(0.72 + (index % 5) * 0.08);
    dummy.updateMatrix();
    matrix.copy(dummy.matrix);
    trees.setMatrixAt(index, matrix);
  }
  trees.instanceMatrix.needsUpdate = true;
  world.add(trees);

  const starsCount = Math.round(320 * quality);
  const starPositions = new Float32Array(starsCount * 3);
  for (let index = 0; index < starsCount; index += 1) {
    const radius = 5 + (index % 17) * 0.16;
    const angle = index * 2.399;
    starPositions[index * 3] = Math.cos(angle) * radius;
    starPositions[index * 3 + 1] = Math.sin(index * 1.73) * 3.8;
    starPositions[index * 3 + 2] = Math.sin(angle) * radius - 1;
  }
  const starGeometry = track(new THREE.BufferGeometry());
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  scene.add(new THREE.Points(starGeometry, track(new THREE.PointsMaterial({ color: 0xc7a65e, size: 0.014, transparent: true, opacity: 0.4 }))));

  const labelElements = [...root.querySelectorAll<HTMLElement>('[data-zone-label]')];
  const projectElements = [...root.querySelectorAll<HTMLElement>('[data-project-label]')];
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(9, 9);
  const projected = new THREE.Vector3();
  let hovered: InstanceType<typeof THREE.Mesh> | null = null;
  let dragging = false;
  let moved = false;
  let previousX = 0;
  let previousY = 0;
  let targetRotationX = world.rotation.x;
  let targetRotationY = world.rotation.y;
  let zoom = camera.position.z;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let tourIndex = -1;
  let tourActive = false;
  let nextTourAt = 0;
  let pinchDistance = 0;
  const activePointers = new Map<number, PointerEvent>();

  const updatePointer = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
  };
  const onPointerDown = (event: PointerEvent) => {
    activePointers.set(event.pointerId, event);
    canvas.setPointerCapture(event.pointerId);
    dragging = true;
    moved = false;
    previousX = event.clientX;
    previousY = event.clientY;
  };
  const onPointerMove = (event: PointerEvent) => {
    activePointers.set(event.pointerId, event);
    updatePointer(event);
    if (activePointers.size === 2) {
      const [a, b] = [...activePointers.values()];
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (pinchDistance) zoom = THREE.MathUtils.clamp(zoom + (pinchDistance - distance) * 0.012, 5.25, 10);
      pinchDistance = distance;
      return;
    }
    if (!dragging) return;
    const dx = event.clientX - previousX;
    const dy = event.clientY - previousY;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
    targetRotationY += dx * 0.006;
    targetRotationX = THREE.MathUtils.clamp(targetRotationX + dy * 0.004, -1.25, 1.25);
    previousX = event.clientX;
    previousY = event.clientY;
  };
  const onPointerUp = (event: PointerEvent) => {
    activePointers.delete(event.pointerId);
    pinchDistance = 0;
    if (!moved) {
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(poiMeshes, false)[0]?.object as InstanceType<typeof THREE.Mesh> | undefined;
      if (hit?.userData.href) {
        sound();
        announce(`${copy.openProject} : ${hit.userData.title as string}`);
        window.location.assign(hit.userData.href as string);
      }
    }
    dragging = activePointers.size > 0;
  };
  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.004, 5.25, 10);
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('wheel', onWheel, { passive: false });

  const resize = () => {
    const bounds = root.getBoundingClientRect();
    renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height), false);
    camera.aspect = Math.max(1, bounds.width) / Math.max(1, bounds.height);
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  resize();

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && !document.hidden;
  }, { threshold: 0.02 });
  intersectionObserver.observe(root);
  const onVisibility = () => {
    visible = !document.hidden && root.getBoundingClientRect().bottom > 0;
  };
  document.addEventListener('visibilitychange', onVisibility);

  const focusZone = (zoneId: string) => {
    const zone = manifest.zones.find((item) => item.id === zoneId);
    if (!zone) return;
    const point = latLon(zone.latitude, zone.longitude).normalize();
    targetRotationY = -Math.atan2(point.x, point.z);
    targetRotationX = Math.asin(point.y) * 0.72;
    zoom = mobile ? 7.4 : 6.35;
    announce(`${zone.title} — ${zone.projects.length} ${manifest.locale === 'fr' ? 'projets' : 'projects'}`);
  };
  const featuredZones = manifest.zones.filter((zone) => zone.featured);
  const visitNextZone = (started = false) => {
    if (!featuredZones.length) return;
    tourIndex = (tourIndex + 1) % featuredZones.length;
    const zone = featuredZones[tourIndex];
    focusZone(zone.id);
    if (started) {
      announce(`${copy.guidedStarted}. ${zone.title} — ${zone.projects.length} ${manifest.locale === 'fr' ? 'projets' : 'projects'}`);
    }
    nextTourAt = performance.now() + 4800;
    sound();
  };
  const advanceTour = () => {
    const starting = !tourActive;
    if (starting) {
      tourActive = true;
      onTourChange(true);
    }
    visitNextZone(starting);
  };
  const toggleTour = () => {
    if (tourActive) {
      tourActive = false;
      nextTourAt = 0;
      onTourChange(false);
      announce(copy.guidedStopped);
      return;
    }
    advanceTour();
  };

  const updateLabels = (cameraRef: Camera) => {
    const planetCenter = new THREE.Vector3().setFromMatrixPosition(world.matrixWorld);
    const cameraPosition = new THREE.Vector3();
    cameraRef.getWorldPosition(cameraPosition);
    const towardCamera = cameraPosition.sub(planetCenter).normalize();
    const worldAnchor = new THREE.Vector3();
    labelElements.forEach((element) => {
      const zone = manifest.zones.find((item) => item.id === element.dataset.zoneLabel);
      if (!zone) return;
      worldAnchor.copy(latLon(zone.latitude, zone.longitude, 2.33)).applyMatrix4(world.matrixWorld);
      const facesCamera = worldAnchor.clone().sub(planetCenter).normalize().dot(towardCamera) > 0.04;
      projected.copy(worldAnchor).project(cameraRef);
      const inFront = facesCamera && projected.z < 1 && projected.z > -1;
      element.style.setProperty('--planet-x', `${(projected.x * 0.5 + 0.5) * 100}%`);
      element.style.setProperty('--planet-y', `${(-projected.y * 0.5 + 0.5) * 100}%`);
      element.toggleAttribute('data-hidden', !inFront);
    });
    projectElements.forEach((element) => {
      const project = manifest.projects.find((item) => item.id === element.dataset.projectLabel);
      if (!project) return;
      worldAnchor.copy(latLon(project.latitude, project.longitude, 2.28)).applyMatrix4(world.matrixWorld);
      const facesCamera = worldAnchor.clone().sub(planetCenter).normalize().dot(towardCamera) > 0.04;
      projected.copy(worldAnchor).project(cameraRef);
      element.style.setProperty('--planet-x', `${(projected.x * 0.5 + 0.5) * 100}%`);
      element.style.setProperty('--planet-y', `${(-projected.y * 0.5 + 0.5) * 100}%`);
      element.toggleAttribute('data-visible', facesCamera && hovered?.userData.projectId === project.id && projected.z < 1);
    });
  };

  const startedAt = performance.now();
  const render = () => {
    if (disposed) return;
    frame = requestAnimationFrame(render);
    if (!visible) return;
    const elapsed = (performance.now() - startedAt) / 1000;
    if (tourActive && !dragging && performance.now() >= nextTourAt) visitNextZone();
    if (!dragging && !tourActive) targetRotationY += 0.00045;
    world.rotation.x += (targetRotationX - world.rotation.x) * 0.065;
    world.rotation.y += (targetRotationY - world.rotation.y) * 0.065;
    camera.position.z += (zoom - camera.position.z) * 0.08;
    water.rotation.y = elapsed * 0.012;
    cloudLayer.rotation.y = elapsed * 0.018;
    cloudLayer.rotation.z = Math.sin(elapsed * 0.08) * 0.025;
    atmosphere.scale.setScalar(1 + Math.sin(elapsed * 0.45) * 0.008);

    vehicles.forEach((vehicle, index) => {
      const curve = vehicle.userData.curve as InstanceType<typeof THREE.CatmullRomCurve3>;
      const progress = (elapsed * (0.025 + index * 0.002) + vehicle.userData.offset) % 1;
      const position = curve.getPointAt(progress);
      const tangent = curve.getTangentAt(progress);
      vehicle.position.copy(position);
      vehicle.up.copy(position).normalize();
      vehicle.lookAt(position.clone().add(tangent));
    });
    packets.forEach((packet, index) => {
      const curve = packet.userData.curve as InstanceType<typeof THREE.CatmullRomCurve3>;
      packet.position.copy(curve.getPointAt((elapsed * 0.12 + packet.userData.offset) % 1));
      packet.scale.setScalar(0.7 + Math.sin(elapsed * 4 + index) * 0.22);
    });

    world.updateMatrixWorld();
    raycaster.setFromCamera(pointer, camera);
    const nextHovered = raycaster.intersectObjects(poiMeshes, false)[0]?.object as InstanceType<typeof THREE.Mesh> | undefined;
    if (nextHovered !== hovered) {
      if (hovered) hovered.scale.copy(hovered.userData.baseScale as InstanceType<typeof THREE.Vector3>);
      hovered = nextHovered || null;
      if (hovered) {
        const baseScale = hovered.userData.baseScale as InstanceType<typeof THREE.Vector3>;
        hovered.scale.copy(baseScale).multiplyScalar(hovered.userData.featured ? 1.5 : 1.35);
      }
      canvas.style.cursor = hovered ? 'pointer' : dragging ? 'grabbing' : 'grab';
    }
    updateLabels(camera);
    renderer.render(scene, camera);
  };
  render();

  root.classList.add('planet-webgl-ready');

  return {
    advanceTour,
    focusZone,
    toggleTour,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      document.removeEventListener('visibilitychange', onVisibility);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      resources.forEach((resource) => resource.dispose());
      resources.clear();
      renderer.dispose();
      (renderer as WebGLRenderer).forceContextLoss();
      root.classList.remove('planet-webgl-ready');
    },
  };
}

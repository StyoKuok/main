import * as THREE from "./three.module.min.js";
import { OrbitControls } from "./OrbitControls.js";

const root = document.getElementById("dynamo-demo");
if (root) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f6f8);
  const camera = new THREE.PerspectiveCamera(42, root.clientWidth / root.clientHeight, 0.1, 50);
  camera.position.set(3.6, 2.4, 4.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.shadowMap.enabled = true;
  root.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.05, 0);
  controls.enableDamping = true;
  controls.maxDistance = 8;
  controls.minDistance = 2.2;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x66717e, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(3, 6, 4);
  key.castShadow = true;
  scene.add(key);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ color: 0xe5e9ed, roughness: 0.9 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  scene.add(new THREE.GridHelper(8, 24, 0xc3cbd3, 0xd9dee3));

  const names = [
    "pelvis",
    "chest",
    "head",
    "lShoulder",
    "lElbow",
    "lHand",
    "rShoulder",
    "rElbow",
    "rHand",
    "lHip",
    "lKnee",
    "lFoot",
    "rHip",
    "rKnee",
    "rFoot",
  ];
  const joint = Object.fromEntries(
    names.map((name) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(name === "head" ? 0.12 : 0.065, 20, 14),
        new THREE.MeshStandardMaterial({ color: name === "head" ? 0x252a30 : 0x146c94, roughness: 0.55 })
      );
      mesh.castShadow = true;
      scene.add(mesh);
      return [name, mesh];
    })
  );
  const edges = [
    ["pelvis", "chest"],
    ["chest", "head"],
    ["chest", "lShoulder"],
    ["lShoulder", "lElbow"],
    ["lElbow", "lHand"],
    ["chest", "rShoulder"],
    ["rShoulder", "rElbow"],
    ["rElbow", "rHand"],
    ["pelvis", "lHip"],
    ["lHip", "lKnee"],
    ["lKnee", "lFoot"],
    ["pelvis", "rHip"],
    ["rHip", "rKnee"],
    ["rKnee", "rFoot"],
  ];
  const linePositions = new Float32Array(edges.length * 6);
  const skeleton = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0x1f2933, linewidth: 3 }));
  skeleton.geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  scene.add(skeleton);

  const com = new THREE.Mesh(new THREE.SphereGeometry(0.085, 18, 12), new THREE.MeshStandardMaterial({ color: 0xe33f3f }));
  scene.add(com);
  const zmp = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.11, 32), new THREE.MeshBasicMaterial({ color: 0xe0a400, side: THREE.DoubleSide }));
  zmp.rotation.x = -Math.PI / 2;
  zmp.position.y = 0.008;
  scene.add(zmp);

  const trailGeo = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(100 * 3);
  trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
  trailGeo.setDrawRange(0, 0);
  const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 0xe33f3f }));
  scene.add(trail);

  const panel = document.createElement("div");
  panel.style.cssText =
    "position:absolute;left:14px;bottom:14px;background:rgba(255,255,255,.92);padding:10px 12px;font:12px system-ui;color:#26323d;border:1px solid #d6dde3;border-radius:6px;display:grid;gap:6px;min-width:210px";
  panel.innerHTML =
    '<strong>DYNAMO method visualization</strong><label>Motion amplitude <input id="dyn-amp" type="range" min="0.4" max="1.35" step="0.05" value="1"></label><label>Playback speed <input id="dyn-speed" type="range" min="0.25" max="2" step="0.05" value="1"></label><span><b style="color:#e33f3f">●</b> COM &nbsp; <b style="color:#d59c00">○</b> ZMP / support</span>';
  root.appendChild(panel);
  const amp = panel.querySelector("#dyn-amp");
  const speed = panel.querySelector("#dyn-speed");

  const set = (name, x, y, z) => joint[name].position.set(x, y, z);
  const trailPoints = [];
  let lastTrailSample = -1;
  let start = performance.now();
  function animate(now) {
    const t = ((now - start) / 1000) * Number(speed.value);
    const a = Number(amp.value);
    const phase = t * Math.PI * 1.4;
    const sway = 0.07 * Math.sin(phase) * a;
    const bob = 0.035 * Math.cos(phase * 2) * a;
    const left = Math.sin(phase),
      right = Math.sin(phase + Math.PI);
    set("pelvis", sway, 1.02 + bob, 0);
    set("chest", -sway * 0.35, 1.48 + bob, 0.01);
    set("head", -sway * 0.3, 1.76 + bob, 0);
    set("lShoulder", -0.25, 1.48 + bob, 0);
    set("rShoulder", 0.25, 1.48 + bob, 0);
    set("lElbow", -0.42, 1.22 + bob + 0.08 * right * a, 0.18 * left * a);
    set("rElbow", 0.42, 1.22 + bob + 0.08 * left * a, 0.18 * right * a);
    set("lHand", -0.48, 0.99 + bob + 0.12 * right * a, 0.28 * left * a);
    set("rHand", 0.48, 0.99 + bob + 0.12 * left * a, 0.28 * right * a);
    set("lHip", -0.13 + sway, 0.98 + bob, 0);
    set("rHip", 0.13 + sway, 0.98 + bob, 0);
    set("lKnee", -0.14, 0.55 + 0.11 * Math.max(0, left) * a, 0.16 * left * a);
    set("rKnee", 0.14, 0.55 + 0.11 * Math.max(0, right) * a, 0.16 * right * a);
    set("lFoot", -0.14, 0.08 + 0.07 * Math.max(0, left) * a, 0.26 * left * a);
    set("rFoot", 0.14, 0.08 + 0.07 * Math.max(0, right) * a, 0.26 * right * a);
    com.position.set(sway * 0.6, 1.12 + bob, 0.02);
    zmp.position.x = left > right ? -0.14 : 0.14;
    zmp.position.z = left > right ? joint.lFoot.position.z : joint.rFoot.position.z;

    edges.forEach(([u, v], i) => {
      const p = joint[u].position,
        q = joint[v].position,
        o = i * 6;
      linePositions.set([p.x, p.y, p.z, q.x, q.y, q.z], o);
    });
    skeleton.geometry.attributes.position.needsUpdate = true;
    const trailSample = Math.floor(t * 7);
    if (trailSample !== lastTrailSample) {
      trailPoints.push(com.position.clone());
      if (trailPoints.length > 100) trailPoints.shift();
      trailPositions.fill(0);
      trailPoints.forEach((point, index) => point.toArray(trailPositions, index * 3));
      trailGeo.attributes.position.needsUpdate = true;
      trailGeo.setDrawRange(0, trailPoints.length);
      lastTrailSample = trailSample;
    }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  const resize = () => {
    const w = root.clientWidth,
      h = root.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  new ResizeObserver(resize).observe(root);
}

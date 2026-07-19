/* ============================================================
   TRICIL — 3D Hero Scene (Three.js)
   A floating, mouse-reactive CMYK packaging box + film rolls.
   Loaded on pages that have a #hero-canvas element.
   ============================================================ */

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const sizes = { w: window.innerWidth, h: window.innerHeight };

  // Camera
  const camera = new THREE.PerspectiveCamera(45, sizes.w / sizes.h, 0.1, 100);
  camera.position.set(0, 0, 9);
  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(sizes.w, sizes.h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(5, 6, 8);
  scene.add(key);
  const rimMag = new THREE.PointLight(0xe91e63, 2.2, 30);
  rimMag.position.set(-6, 3, 4);
  scene.add(rimMag);
  const rimCyan = new THREE.PointLight(0x00bcd4, 2.2, 30);
  rimCyan.position.set(6, -3, 4);
  scene.add(rimCyan);

  // Group that holds all floating objects
  const world = new THREE.Group();
  scene.add(world);

  // Helper: rounded-ish box "package"
  function makeBox(size, color, pos, rot) {
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.35, metalness: 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    return mesh;
  }

  // Helper: film roll (cylinder)
  function makeRoll(r, h, color, pos) {
    const geo = new THREE.CylinderGeometry(r, r, h, 48);
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.25, metalness: 0.4,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.z = Math.PI / 2.2;
    return mesh;
  }

  // CMYK-themed floating objects
  const objects = [];
  const centerBox = makeBox(2.2, 0xffffff, [0, 0, 0], [0.5, 0.6, 0]);
  // Give the center box colorful faces (CMYK)
  centerBox.material = [
    new THREE.MeshStandardMaterial({ color: 0x00bcd4, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xe91e63, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xffc531, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xa18cd1, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x84fab0, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xff6a88, roughness: 0.3 }),
  ];
  world.add(centerBox);
  objects.push({ mesh: centerBox, speed: 0.25, float: 0.4 });

  const b2 = makeBox(0.9, 0xff9a8b, [-3.4, 1.6, -1], [0.3, 0.8, 0.2]);
  const b3 = makeBox(0.7, 0x8fd3f4, [3.5, -1.8, -0.5], [0.6, 0.2, 0.5]);
  const b4 = makeBox(0.55, 0xffc531, [3.0, 2.0, -2], [0.1, 0.5, 0.3]);
  const roll1 = makeRoll(0.45, 1.8, 0xa18cd1, [-3.2, -1.9, -1]);
  const roll2 = makeRoll(0.3, 1.3, 0xe91e63, [2.2, 2.3, -1.5]);
  [b2, b3, b4, roll1, roll2].forEach((m, i) => {
    world.add(m);
    objects.push({ mesh: m, speed: 0.4 + i * 0.12, float: 0.6 + i * 0.15, phase: i });
  });

  // Mouse parallax
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / sizes.w - 0.5);
    mouse.ty = (e.clientY / sizes.h - 0.5);
  });

  // Resize
  window.addEventListener('resize', () => {
    sizes.w = window.innerWidth; sizes.h = window.innerHeight;
    camera.aspect = sizes.w / sizes.h;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.w, sizes.h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Animation loop
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();

    // Smooth mouse
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    world.rotation.y = mouse.x * 0.5;
    world.rotation.x = mouse.y * 0.3;

    objects.forEach((o) => {
      o.mesh.rotation.x += o.speed * 0.003;
      o.mesh.rotation.y += o.speed * 0.004;
      o.mesh.position.y += Math.sin(t * o.float + (o.phase || 0)) * 0.002;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();

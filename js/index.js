(function () {
  "use strict";

  var scene;
  var sphere;
  var light;
  var ambient;
  var camera;
  var renderer;
  var loader;
  var text;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var controls;

  //scene
  scene = new THREE.Scene();

  //light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(200, 120, 30);
  scene.add(light);

  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  //camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 0, 500);
  camera.lookAt(scene.position);

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("stage").appendChild(renderer.domElement);

  // resize
  onResize();
  window.addEventListener("resize", onResize);

  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  //texture
  loader = new THREE.TextureLoader();
  loader.load("img/earth.jpg", function (texture) {
    createSphere(texture);
  });

  function createSphere(texture) {
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(50, 20, 20),
      new THREE.MeshPhongMaterial({ map: texture })
    );
    sphere.position.set(-50, 50, 0);
    scene.add(sphere);
  }

  // text
  loader = new THREE.FontLoader();
  loader.load("js/helvetiker_regular.typeface.json", function (font) {
    createText(font);
  });

  function createText(font) {
    text = new THREE.Mesh(
      new THREE.TextGeometry("Hello World", {
        font: font,
        size: 17,
        height: 8,
        curveSegments: 12,
      }),

      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        wireframe: true,
      })
    );
    text.position.set(10, 110, 0);
    text.rotation.set(0, 0, (280 * Math.PI) / 180);
    scene.add(text);
    animation();
  }

  //controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.userRotate = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;
  controls.minDistance = 400;
  controls.maxDistance = 700;

  function animation() {
    requestAnimationFrame(animation);
    sphere.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }
})();

'use strict';

var initScene, render, _boxes = [], spawnBox, loader,
renderer, scene, ground_material, ground, light, camera;

initScene = function() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  document.getElementById( 'viewport' ).appendChild( renderer.domElement );

  scene = new Physijs.Scene;
  scene.background = new THREE.Color('#BBCDD3');
  scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
  scene.addEventListener(
    'update',
    function() {
      scene.simulate( undefined, 1 );
    }
    );

  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    1000
    );
  camera.position.set( 0, 0, -50 );
  camera.lookAt( scene.position );
  scene.add( camera );

  light = new THREE.DirectionalLight( 0xFFFFFF );
  light.position.set( 20, 40, -15 );
  light.target.position.copy( scene.position );
  light.castShadow = true;
  light.shadow.camera.left = -60;
  light.shadow.camera.top = -60;
  light.shadow.camera.right = 60;
  light.shadow.camera.bottom = 60;
  light.shadow.camera.near = 20;
  light.shadow.camera.far = 200;
  light.shadow.bias = -.0001
  light.shadow.mapSize.width = light.shadow.mapSize.height = 2048;
  light.shadow.darkness = .1;
  scene.add( light );

  loader = new THREE.TextureLoader();

  ground_material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: '#dcf2f9', opacity: 0 }),
      .8, // high friction
      .3 // low restitution
      );

  ground = new Physijs.BoxMesh(
    new THREE.BoxGeometry(100, 1, 100),
    ground_material,
      0 // mass
      );
  ground.receiveShadow = true;
  ground.position.y = -10;
  scene.add( ground );

  spawnBox();

  requestAnimationFrame( render );
  scene.simulate();
};

spawnBox = (function() {
  // const loader = new THREE.GLTFLoader();
  // const lemon = loader.load(
  //   'models/lemon/scene.gltf',
  //   function ( gltf ) {
  //     gltf.scene.scale.set(0.2,0.2,0.2)
  //     scene.add( gltf.scene );
  //     gltf.animations;
  //     gltf.scene;
  //     gltf.scenes;
  //     gltf.cameras;
  //     gltf.asset;
  //   },
  //   function ( xhr ) {
  //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //   },
  //   function ( error ) {
  //     console.log( 'An error happened' );
  //   }
  //   ),

  var box_geometry = new THREE.SphereGeometry( 5, 32, 32 ),

  createBox = function() {
    var box, material;

    material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: loader.load( 'textures/orange.jpg' ) }),
          .6, // medium friction
          .3 // low restitution
          );
    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( .5, .5 );

    box = new Physijs.SphereMesh(
      box_geometry,
      material
      );
    box.collisions = 0;

    box.position.set(
      Math.random() * 15 - 7.5,
      25,
      Math.random() * 15 - 7.5
      );

    box.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
      );

    box.castShadow = true;
    box.addEventListener( 'ready', spawnBox );
    scene.add( box );
  };



  return function() {
    setTimeout( createBox, 1000 );
  };
})();

render = function() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
};

window.onload = initScene;

document.addEventListener('DOMContentLoaded', function() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const loader = new THREE.GLTFLoader();
  scene.background = new THREE.Color('blue');
  const fruitsList = ['models/lemon/scene.gltf', 'models/orange/scene.gltf', 'models/strawberry/scene.gltf']

  // var mroot = scene;
  // var bbox = new THREE.Box3().setFromObject(mroot);
  // var cent = bbox.getCenter(new THREE.Vector3());
  // var size = bbox.getSize(new THREE.Vector3());

  // var maxAxis = Math.max(size.x, size.y, size.z);
  // mroot.scale.multiplyScalar(1.0 / maxAxis);
  // bbox.setFromObject(mroot);
  // bbox.getCenter(cent);
  // bbox.getSize(size);

  // mroot.position.copy(cent).multiplyScalar(-1);
  // mroot.position.y-= (size.y * 0.5);


  fruitsList.forEach(fruit => {
   loader.load(
    fruit,
    function ( gltf ) {
    gltf.scene.scale.set(0.2,0.2,0.2) // scale here
    scene.add( gltf.scene );
    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Scene
    gltf.scenes; // Array<THREE.Scene>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
  },
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  function ( error ) {
    console.log( 'An error happened' );
  }
  );
 })

  camera.position.z = 5;

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }


  const animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  };

  animate();

});

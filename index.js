document.addEventListener('DOMContentLoaded', function() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var loader = new THREE.GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// THREE.DRACOLoader.setDecoderPath( '/examples/js/libs/draco' );
// loader.setDRACOLoader( new THREE.DRACOLoader() );
scene.background = new THREE.Color('blue');

// Load a glTF resource
loader.load(
  // resource URL
  'models/lemon/scene.gltf',
  // called when the resource is loaded
  function ( gltf ) {
    // gltf.scene.traverse( function ( child ) {
    //   if ( child.isMesh ) {
    //         child.geometry.center(); // center here
    //   }
    // });
    gltf.scene.scale.set(0.5,0.5,0.5) // scale here

    scene.add( gltf.scene );

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Scene
    gltf.scenes; // Array<THREE.Scene>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

  },
  // called while loading is progressing
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

    console.log( 'An error happened' );

  }
  );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


var animate = function () {
  requestAnimationFrame( animate );

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();

});

document.addEventListener('DOMContentLoaded', function() {

  let container
  let camera
  let controls
  let renderer
  let scene
  let cat = null
  const mixers = [];
  const clock = new THREE.Clock();

  function init() {
    body = document.querySelector('body')
    scene = new THREE.Scene()
    scene.background = new THREE.Color( 0xbffffc )

    createCamera()
    createControls()
    createLights()
    loadModels()
    createRenderer()
    animate()

    renderer.setAnimationLoop( () => {
      update();
      render();
    });
  }

  function createCamera() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
    camera.position.set( -1.5, 1.5, 6.5 )
  }

  function createRenderer() {
    renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.gammaOutput = true
    renderer.gammaFactor = 2.2
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.physicallyCorrectLights = true
    body.appendChild( renderer.domElement )
  }

  function createLights() {
    const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 )
    const mainLight = new THREE.DirectionalLight( 0xffffff, 5 )
    mainLight.position.set( 10, 10, 10 )
    scene.add( ambientLight, mainLight )
  }

  function createControls() {
    controls = new THREE.OrbitControls( camera, body )
  }

  function loadModels() {
    const loader = new THREE.GLTFLoader()
    const onLoad = ( gltf, position, scale ) => {
      const model = gltf.scene.children[ 0 ]
      cat = model
      model.position.copy(position)
      model.scale.copy(scale)
      const animation = gltf.animations[ 0 ]

      // const mixer = new THREE.AnimationMixer( model )
      // mixers.push( mixer )

      // const action = mixer.clipAction( animation )
      // action.play()
      scene.add( model )
    }

    const onProgress = () => {}
    const onError = ( errorMessage ) => { console.log( errorMessage ) }

    const bananaPosition = new THREE.Vector3( 0, 0, 0 )
    const bananaScale = new THREE.Vector3(0.01, 0.01, 0.01)
    loader.load( 'models/banana.glb', gltf => onLoad( gltf, bananaPosition, bananaScale), onProgress, onError )

    const lemonPosition = new THREE.Vector3( 1, 0, 0)
    const lemonScale = new THREE.Vector3(0.8,0.8,0.8)
    loader.load( 'models/lemon.glb', gltf => onLoad( gltf, lemonPosition, lemonScale ), onProgress, onError )

    const orangePosition = new THREE.Vector3( 4, 0, 0 )
    const orangeScale = new THREE.Vector3(0.3,0.3,0.3)
    loader.load( 'models/orange.glb', gltf => onLoad( gltf, orangePosition, orangeScale ), onProgress, onError )

    const pearPosition = new THREE.Vector3( 5, 0, 0 )
    const pearScale = new THREE.Vector3(0.3,0.3,0.3)
    loader.load( 'models/pear.glb', gltf => onLoad( gltf, pearPosition, pearScale ), onProgress, onError )

    const applePosition = new THREE.Vector3( 6, 0, 0 )
    const appleScale = new THREE.Vector3(0.01, 0.01, 0.01)
    loader.load( 'models/apple.glb', gltf => onLoad( gltf, applePosition, appleScale ), onProgress, onError )

    const pineapplePosition = new THREE.Vector3( 7, 0, 0 )
    const pineappleScale = new THREE.Vector3(0.7,0.7,0.7)
    loader.load( 'models/pineapple.glb', gltf => onLoad( gltf, pineapplePosition, pineappleScale ), onProgress, onError )

    const cherryPosition = new THREE.Vector3( 8, 0, 0 )
    const cherryScale = new THREE.Vector3(0.5,0.5,0.5)
    loader.load( 'models/cherry.glb', gltf => onLoad( gltf, cherryPosition, cherryScale ), onProgress, onError )

    const strawberryPosition = new THREE.Vector3( 20, 0, 0 )
    const strawberryScale = new THREE.Vector3(0.07,0.07,0.07)
    loader.load( 'models/strawberry.glb', gltf => onLoad( gltf, strawberryPosition, strawberryScale ), onProgress, onError )
  }

  function update() {
    const delta = clock.getDelta();
    mixers.forEach( ( mixer ) => { mixer.update( delta ); } );
  }

  function render() {
    renderer.render( scene, camera );
  }


  const animate = function () {
    requestAnimationFrame( animate )
    if (cat) {
      cat.rotation.x += 0.01;
      cat.translate.y += 1;
    }
  // renderer.render( scene, camera )
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
}

window.addEventListener( 'resize', onWindowResize )
init()



})

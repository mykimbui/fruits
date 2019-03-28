document.addEventListener('DOMContentLoaded', function() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.gammaOutput = true
  renderer.gammaFactor = 2.2
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.physicallyCorrectLights = true

  const body = document.querySelector('body')

  body.appendChild( renderer.domElement )

  const loader = new THREE.GLTFLoader()

  scene.background = new THREE.Color(0xbffffc)

  function createLights() {
    const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 )
    const mainLight = new THREE.DirectionalLight( 0xffffff, 5 )
    mainLight.position.set( 10, 10, 10 )
    scene.add( ambientLight, mainLight )
  }

  function createControls() {
    controls = new THREE.OrbitControls( camera, body )
  }

  createControls()
  createLights()

  const fruitsList = ['models/cherry.glb', 'models/banana.glb', 'models/pear.glb']

  const onProgress = function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
  }

  const onError = function ( error ) {
    console.log( 'An error happened' )
  }

 //  fruitsList.forEach(fruit => {
 //   loader.load(
 //    fruit,
 //    function ( gltf ) {
 //      gltf.scene.scale.set(0.2,0.2,0.2)
 //      scene.add( gltf.scene )
 //      gltf.animations // Array<THREE.AnimationClip>
 //      gltf.scene // THREE.Scene
 //      gltf.scenes // Array<THREE.Scene>
 //      gltf.cameras // Array<THREE.Camera>
 //      gltf.asset // Object
 //    }, onProgress, onError
 //    )
 // })

const bananaPosition = new THREE.Vector3( 0, 0, 2.5 );
 const banana = loader.load('models/banana.glb',
  function ( gltf ) {
    gltf.scene.scale.set(0.2,0.2,0.2)
    gltf.scene.position.set(0, 0, 0)
    scene.add( gltf.scene )
  }, onProgress, onError
  )

 const cherry = loader.load('models/cherry.glb',
  function ( gltf ) {
    gltf.scene.scale.set(0.5,0.5,0.5)
    gltf.scene.position.set(5, 0, 0)
    scene.add( gltf.scene )
  }, onProgress, onError
  )

 const pear = loader.load('models/pear.glb',
  function ( gltf ) {
    gltf.scene.scale.set(0.3,0.3,0.3)
    scene.add( gltf.scene )
  }, onProgress, onError
  )

 const lemon = loader.load('models/lemon.glb',
  function ( gltf ) {
    gltf.scene.scale.set(0.8,0.8,0.8)
    gltf.scene.position.set(-15, 0, 0)
    scene.add( gltf.scene )
  }, onProgress, onError
  )

 const pineapple = loader.load('models/pineapple.glb',
  function ( gltf ) {
    gltf.scene.scale.set(0.7,0.7,0.7)
    gltf.scene.position.set(2, 0, 0)
    scene.add( gltf.scene )
  }, onProgress, onError
  )

 const strawberry = loader.load('models/strawberry.glb',
  function ( gltf ) {
    gltf.scene.scale.set(0.07,0.07,0.07)
    gltf.scene.position.set(-5, 0, 0)
    scene.add( gltf.scene )
  }, onProgress, onError
  )

 const orange = loader.load('models/orange.glb',
  function ( gltf ) {
    gltf.scene.scale.set(0.3,0.3,0.3)
    gltf.scene.position.set(-10, 0, 0)
    scene.add( gltf.scene )
  }, onProgress, onError
  )

 camera.position.set( -1.5, 1.5, 6.5 )

 function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
}

const animate = function () {
  requestAnimationFrame( animate )
  renderer.render( scene, camera )
}

animate()
window.addEventListener( 'resize', onWindowResize )


})

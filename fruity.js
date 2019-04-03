'use strict'
let initScene, render, _boxes = [], spawnBox, loader,
renderer, scene, ground_material, ground, light, camera, group

initScene = function() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.shadowMap.enabled = true
  renderer.shadowMapSoft = true
  document.getElementById( 'viewport' ).appendChild( renderer.domElement )

  scene = new Physijs.Scene
  scene.background = new THREE.Color('#BBCDD3')
  scene.setGravity(new THREE.Vector3( 0, -30, 0 ))
  scene.addEventListener(
    'update',
    function() {
      scene.simulate( undefined, 1 )
    }
    )

  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    1000
    )
  camera.position.set( 0, -10, -30 )
  camera.lookAt( scene.position )
  scene.add( camera )

  const ambientLight = new THREE.AmbientLight(0xcccccc)
  scene.add(ambientLight)

  light = new THREE.DirectionalLight(0xcccccc, 0.5)
  light.position.set(100, 200, -200)
  light.target.position.copy( scene.position )
  light.castShadow = true
  light.shadow.camera.left = -60
  light.shadow.camera.top = -60
  light.shadow.camera.right = 60
  light.shadow.camera.bottom = 60
  light.shadow.camera.near = 20
  light.shadow.camera.far = 200
  light.shadow.bias = -.0001
  light.shadow.mapSize.width = light.shadow.mapSize.height = 2048
  light.shadow.darkness = .1
  scene.add( light )

  loader = new THREE.TextureLoader()

  ground_material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: '#dcf2f9', opacity: 0 }),
      .2, // high friction
      .3 // low restitution
      )

  ground = new Physijs.BoxMesh(
    new THREE.BoxGeometry(100, 1, 100),
    ground_material,
      0 // mass
      )
  ground.receiveShadow = true
  ground.position.y = -10
  scene.add( ground )

  group = new THREE.Group()
  scene.add(group)

  spawnBox()

  requestAnimationFrame( render )
  scene.simulate()
}

function loadModels({ box, model }) {
  let modelLink = model.link
  const scale = model.scale
  // const position = model.position
  const loader = new THREE.GLTFLoader()
  const onLoad = ( gltf, position, scale ) => {
    const loadedModel = gltf.scene.children[ 0 ]
    loadedModel.position.copy(position)
    loadedModel.scale.copy(scale)

    let snyc = () => {
      if (box) {
        loadedModel.position.copy(box.position)
        loadedModel.rotation.copy(box.rotation)
      }
    }
    snyc()
    setInterval(snyc, 1)
    group.add(loadedModel)
  }

  const onProgress = () => {}
  const onError = ( errorMessage ) => { console.log( errorMessage ) }
  const position = new THREE.Vector3(0,0,0)

  loader.load( modelLink, gltf => onLoad( gltf, position, scale ), onProgress, onError )
}

let getRandomModel = () => {
  let arr = [
  {
    link: 'models/strawberry.glb',
    scale: new THREE.Vector3(0.07,0.07,0.07)
  },
  {
    link: 'models/lemon.glb',
    scale: new THREE.Vector3(1.5,1.5,1.5)
  },
  {
    link: 'models/pear.glb',
    scale: new THREE.Vector3(0.7,0.7,0.7)
  },
  {
    link: 'models/pineapple.glb',
    scale: new THREE.Vector3(1,1,1)
  },
  {
    link: 'models/orange.glb',
    scale: new THREE.Vector3(0.5,0.5,0.5)
  },
  {
    link: 'models/banana.glb',
    scale: new THREE.Vector3(0.03, 0.03, 0.03)
  },
  {
    link: 'models/cherry.glb',
    scale: new THREE.Vector3(0.7,0.7,0.7)
  },
  {
    link: 'models/apple.glb',
    scale: new THREE.Vector3(0.03, 0.03, 0.03)
  },
  {
    link: 'models/grapes.glb',
    scale: new THREE.Vector3(1,1,1)
  }
  ]

  return arr[Math.floor(Math.random() * arr.length)]
}

spawnBox = (function() {

  let sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 ),

  createBox = function() {
    let box, material

    material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({
        // color: 0xffffff,
        transparent: true,
        opacity: 0
      }),
          .6, // medium friction
          .3 // low restitution
          )

    box = new Physijs.SphereMesh(
      sphereGeometry,
      material
      )
    box.collisions = 0

    group.add(box)

    box.position.set(
      Math.random() * 15 - 7.5,
      25,
      Math.random() * 15 - 7.5
      )

    box.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
      )

    box.castShadow = true
    box.addEventListener( 'ready', spawnBox )
    scene.add( box )

    let randomModel = getRandomModel()
    loadModels({ box, model: randomModel, modelLink: randomModel.link })
  }

  return function() {
    setTimeout( createBox, 100 )
  }
})()

render = function() {
  requestAnimationFrame( render )
  renderer.render( scene, camera )
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

window.onload = () => {
  initScene()
}

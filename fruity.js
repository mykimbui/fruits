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
  camera.position.set( 0, 0, -50 )
  camera.lookAt( scene.position )
  scene.add( camera )

  light = new THREE.DirectionalLight( 0xFFFFFF )
  light.position.set( 20, 40, -15 )
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
      .8, // high friction
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

function loadModels() {
  const loader = new THREE.GLTFLoader()
  const onLoad = ( gltf, position, scale ) => {
    const model = gltf.scene.children[ 0 ]
    model.position.copy(position)
    model.scale.copy(scale)
    // shapes.push(model)
    // scene.add( model )
    group.add(model)
  }

  const onProgress = () => {}
  const onError = ( errorMessage ) => { console.log( errorMessage ) }

  const strawberryPosition = new THREE.Vector3(-5, 0, 0)
  const strawberryScale = new THREE.Vector3(0.07,0.07,0.07)
  loader.load( 'models/strawberry.glb', gltf => onLoad( gltf, strawberryPosition, strawberryScale ), onProgress, onError )
}

spawnBox = (function() {

  let sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 ),

  createBox = function() {
    let box, material

    material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      }),
          .6, // medium friction
          .3 // low restitution
          )
    group.add(sphereGeometry)
    box = new Physijs.SphereMesh(
      sphereGeometry,
      material
      )
    box.collisions = 0

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
  }

  return function() {
    setTimeout( createBox, 1000 )
  }
})()

render = function() {
  requestAnimationFrame( render )
  renderer.render( scene, camera )
}

window.onload = initScene

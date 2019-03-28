/* Animates a Vector3 to the target */

function animateVector3(vectorToAnimate, target, options){

    options = options || {};

    // get targets from options or set to defaults
    var to = target || THREE.Vector3(),
        easing = options.easing || TWEEN.Easing.Quadratic.In,
        duration = options.duration || 2000;

    // create the tween
    var tweenVector3 = new TWEEN.Tween(vectorToAnimate)
        .to({ x: to.x, y: to.y, z: to.z, }, duration)
        .easing(easing)
        .onUpdate(function(d) {
            if(options.update){
                options.update(d);
            }
         })
        .onComplete(function(){
          if(options.callback) options.callback();
        });

    // start the tween
    tweenVector3.start();

    // return the tween in case we want to manipulate it later on
    return tweenVector3;

}

/* How to use */

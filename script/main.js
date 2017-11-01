var container, stats, clock, camera, scene, renderer, model, blades, mill, restaurant, answer, question_id, categories, game_started = false, rotation = 0;
var birds, bird;
var boid, boids;

init();
animate();

document.addEventListener('touchmove', function(event) {
	event = event.originalEvent || event;
	if(event.scale > 1) {
	  event.preventDefault();
	}
}, false);

function init() {
	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
	camera.position.set( 10, 10, 0 );
	scene = new THREE.Scene();
	clock = new THREE.Clock();
	// loading manager
	var loadingManager = new THREE.LoadingManager( function(loaded) {

		scene.add( model );
		scene.add( blades );
		scene.add( mill );

        var boundingBox = new THREE.Box3();
        boundingBox.setFromObject( blades );
        var center = boundingBox.getCenter();

        blades.position.x = -9.5;
		blades.position.z = -7.5;
		blades.position.y = 12.6;
	});
	loadingManager.onProgress = function(item, loaded, total) {
		var loading_progress = loaded / total * 100;
		if (loading_progress != 100) {
			var rounded = Math.round(loading_progress);
			document.getElementById('debug').innerHTML = rounded + "%";
		} else {
			document.getElementsByClassName('loading_screen')[0].className += " slide-out-bck-center";
			var wait = setInterval(myTimer, 500);
		}
	};
	function myTimer() {
		document.getElementsByClassName('loading_screen')[0].style.zIndex = -999;
	}
	// collada
	var loader = new THREE.ColladaLoader( loadingManager );
	loader.options.convertUpAxis = true;
	loader.load( 'assets/models/hemp_total.dae', function ( collada ) {
		model = collada.scene;
		var skybox = model.children[0].children[1];
		var skybox_material = skybox.material[1];
		console.log(skybox_material);
		skybox_material.color = {r: 2.1, g: 2.1, b: 2.1};
	});
	loader.load( 'assets/models/blades.dae', function ( collada ) {
		blades = collada.scene;
	});
	loader.load( 'assets/models/mill.dae', function ( collada ) {
		mill = collada.scene;
	});

	//loader.load( 'assets/models/restaurant.dae', function ( collada ) {
		//restaurant = collada.scene;
	//});
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.85 );
	scene.add( ambientLight );

	var light = new THREE.PointLight( 0xffffff, 2.5, 120 );
	light.position.set( 20, 75, 50 );
	scene.add( light );

	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setPixelRatio( window.devicePixelRatio*0.75 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	birds = [];
	boids = [];

	var bird_scale_mult = 0.075;

	for ( var i = 0; i < 20; i ++ ) {
		boid = boids[ i ] = new Boid();
		boid.position.x = Math.random() * 400;
		boid.position.y = Math.random() * 400;
		boid.position.z = Math.random() * 400;
		boid.velocity.x = Math.random() * 2;
		boid.velocity.y = Math.random() * 2;
		boid.velocity.z = Math.random() * 2;
		boid.setAvoidWalls( false );
		boid.setWorldSize( 50, 30, 50 );
		bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color:Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
		bird.phase = Math.floor( Math.random() * 62.83 );
		bird.scale.x = bird.scale.x * bird_scale_mult;
		bird.scale.y = bird.scale.y * bird_scale_mult;
		bird.scale.z = bird.scale.z * bird_scale_mult;
		console.log(bird);
		scene.add( bird );
	}
}

function onWindowResize() {
	camera.updateProjectionMatrix();
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	var delta = clock.getDelta();
	if ( mill !== undefined ) {
        rotation -= 0.003;
        camera.position.x = Math.sin(rotation) * 50;
        camera.position.z = Math.cos(rotation) * 50;
		camera.position.y = 10;
        camera.lookAt({x: -9.5, y: 5, z: -7.5});
        blades.rotation.x += 0.015;
	}
	for ( var i = 0, il = birds.length; i < il; i++ ) {
		boid = boids[ i ];
		boid.run( boids );
		bird = birds[ i ];
		bird.position.copy( boids[ i ].position );
		var color = bird.material.color;
		color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;
		bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
		bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );
		bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
		bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;
	}
	renderer.render( scene, camera );
}

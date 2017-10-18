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
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 1, 1, 0 ).normalize();
	scene.add( directionalLight );

	var light = new THREE.PointLight( 0xFFC107, 3, 120 );
	light.position.set( 50, 85, 50 );
	scene.add( light );

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio*0.75 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	birds = [];
	boids = [];

	var bird_scale_mult = 0.075;

	for ( var i = 0; i < 15; i ++ ) {
		boid = boids[ i ] = new Boid();
		boid.position.x = Math.random() * 400 - 200;
		boid.position.y = Math.random() * 400 - 200;
		boid.position.z = Math.random() * 400 - 200;
		boid.velocity.x = Math.random() * 2 - 1;
		boid.velocity.y = Math.random() * 2 - 1;
		boid.velocity.z = Math.random() * 2 - 1;
		boid.setAvoidWalls( false );
		boid.setWorldSize( 50, 20, 40 );
		bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color:0x000000, side: THREE.DoubleSide } ) );
		bird.phase = Math.floor( Math.random() * 62.83 );
		bird.scale.x = bird.scale.x * bird_scale_mult;
		bird.scale.y = bird.scale.y * bird_scale_mult;
		bird.scale.z = bird.scale.z * bird_scale_mult;
		console.log(bird);
		scene.add( bird );
	}
	scene.fog = new THREE.FogExp2( 0x89b6d6, 0.005 );
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

window.onload = function() {
	var questions_answered = [];
	var total_categories = [];
	var total_categories_used = [];
	var current_randomized_category;
	var current_category_id = Math.floor(Math.random() * 1) + 0;

	document.getElementsByClassName("main_menu_container")[0].style.display="none";
	document.getElementById("username").focus();

	document.getElementById("alone").onclick = function() {
		fillQuestions();
	}

	document.getElementById("group").onclick = function() {
		getGroups();
	}

	document.getElementById("expl").onclick = function() {
		document.getElementsByClassName("about_container")[0].style.display="block";
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
	}

	for(var i = 0; i < 2; i++) {
		document.getElementsByClassName("chosen_menu")[i].onclick = function() {
			document.getElementsByClassName("main_menu_container")[0].style.display="block";
			document.getElementsByClassName("category_container")[0].style.display="none";
			document.getElementsByClassName("question_container")[0].style.display="none";
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			document.getElementsByClassName("lobby_container")[0].style.display="none";
			document.getElementsByClassName("about_container")[0].style.display="none";
		}
	}

	document.getElementById("chosen_username").onclick = function() {
		document.getElementsByClassName("main_menu_container")[0].style.display="block";
		document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
	}

	function hideMainMenuShowQandA() {
		document.getElementsByClassName("category_container")[0].style.display="none";
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
		document.getElementsByClassName("question_container")[0].style.display="block";
	}

	function hideQandAShowMainMenu() {
		document.getElementsByClassName("main_menu_container")[0].style.display="block";
		document.getElementsByClassName("question_container")[0].style.display="none";
	}

	function getGroups() {
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
		document.getElementsByClassName("lobby_container")[0].style.display="block";
		console.log("Loading groups");
	}

	function emptyQuestionAnswers() {
		document.getElementsByClassName("question")[0].innerHTML = "";
		for(var i = 0; i < 4; i++) {
			document.getElementById(i).innerHTML = "";
		}
	}

	function showFinalScoreGroup() {
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
		document.getElementsByClassName("question_container")[0].style.display="none";
		document.getElementsByClassName("category_container")[0].style.display="none";
		document.getElementsByClassName("final_score_container")[0].style.display="block";
	}

	function fillQuestions() {
		var question, httpRequest, possible_answers;
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		console.log("current_category_id="+current_category_id);
		httpRequest.open('GET','controller.php?category_id='+current_category_id+'&questions_answered='+questions_answered+'&function=getQandA');
		httpRequest.send();
		emptyQuestionAnswers();
		var time_elapsed = 5;
		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					questions_answers = httpRequest.responseText;
					console.log(questions_answers);
					if (questions_answers == "end") {
						endGame();
						return;
					}
					document.getElementsByClassName("chosen_container")[0].style.display="none";
					document.getElementsByClassName("main_menu_container")[0].style.display="none";
					if(!game_started) {
						document.getElementsByClassName("category_container")[0].style.display="block";
						console.log("do et");
						var category_timer = setInterval(function() {
							time_elapsed--;
							document.getElementById("countdown").innerHTML = time_elapsed;
							console.log(time_elapsed);
							if (time_elapsed <= 0) {
								console.log("ye");
								clearInterval(category_timer);
								document.getElementById("countdown").innerHTML = 5;
								hideMainMenuShowQandA();
								fillContent(questions_answers);
								game_started = true;
							}
						}, 1000);
					} else {
						hideMainMenuShowQandA();
						fillContent(questions_answers);
					}
				} else {
					answer_return = 'There was a problem with the request.';
					fillContent(questions_answers);
				}
			}
		}
		function fillContent(questions_answers) {
			document.getElementsByClassName("question_container")[0].classList.remove("slide-out-bottom");
			document.getElementsByClassName("question_container")[0].classList.remove("slide-in-bottom");
			//console.log(document.getElementsByClassName("question_container"));
			//console.log(document.getElementsByClassName("question_container")[0].classList);
			if (questions_answers == "false") return false;
			question = questions_answers.split('|')[0];
			var new_question_id = questions_answers.split('|')[2];
			possible_answers = questions_answers.split('|').slice(3,questions_answers.length-1);
			document.getElementsByClassName("question")[0].innerHTML = question;
			console.log("question="+question);
			document.getElementsByClassName("question")[0].id = new_question_id+"_question";
			for(var i = 0; i < 4; i++) {
				document.getElementById(i).innerHTML = possible_answers[i];
			}
			document.getElementsByClassName("question_container")[0].className += " slide-in-bottom";
		}
	}

	for (var i = 0; i < 4; i++) {
		document.getElementById(i).onclick = function(i) {
			document.getElementsByClassName("question_container")[0].classList.remove("slide-out-bottom");
			void document.getElementsByClassName("question_container")[0].offsetWidth;
			document.getElementsByClassName("question_container")[0].className += " slide-out-bottom";
			document.getElementsByClassName("chosen_container")[0].style.display="block";
			document.getElementById("chosen_answer_content").innerHTML = this.innerHTML;

			var question_id_temp = document.getElementsByClassName("question")[0].id;
			var question_id = question_id_temp.substring(0,question_id_temp.indexOf("_"));
			var potential_answer = this.id;
			/*
			var time_elapsed = 3;
			var question_timer = setInterval(function() {
				//time_elapsed--;
				console.log("chosen");
				if (time_elapsed <= 0) {
					clearInterval(question_timer);
					validateQuestion(question_id,potential_answer);
				}
			}, 1000);
			*/
			document.getElementById("chosen_yes").onclick = function() {
				validateQuestion(question_id,potential_answer);
			}
			document.getElementById("chosen_no").onclick = function() {
				document.getElementsByClassName("chosen_container")[0].style.display="none";
				document.getElementsByClassName("question_container")[0].classList.remove("slide-out-bottom");
				document.getElementsByClassName("question_container")[0].className += " slide-in-bottom";
			}
		}
	}

	function validateQuestion(question_id,potential_answer) {
		var answer_return, httpRequest;
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		questions_answered.push(question_id);
		httpRequest.open('GET','controller.php?function=validate&question_id='+question_id+'&answer='+potential_answer);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					alertContents(answer_return);
				} else {
					answer_return = 'There was a problem with the request.';
					alertContents(answer_return);
				}
			}
		}
	}

	function alertContents(answer_return) {
		//document.getElementsByClassName("full_overlay")[0].style.zIndex = "999";
		//document.getElementsByClassName("full_overlay")[0].style.display = "block";
		if (answer_return == "There was a problem with the request.") {
			console.log("Error! -There was a problem with the request.");
		} else {
			fillQuestions();
		}
	}

	function endGame() {
		emptyQuestionAnswers();
		document.getElementsByClassName("chosen_container")[0].style.display="none";
		console.log("end game");
		showFinalScoreGroup();
		//location.reload(-1);
	}

	/*
	document.getElementById(-1).onclick = function(i) {
		fillQuestions();
		document.getElementsByClassName("not_correct")[0].style.display = "none";
		document.getElementsByClassName("correct")[0].style.display = "none";
		this.style.display = "none";
	}
	*/
}

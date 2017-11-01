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

	for(var i = 0; i < 3; i++) {
		document.getElementsByClassName("chosen_menu")[i].onclick = function() {
			document.getElementsByClassName("main_menu_container")[0].style.display="block";
			document.getElementsByClassName("category_container")[0].style.display="none";
			document.getElementsByClassName("question_container")[0].style.display="none";
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			document.getElementsByClassName("lobby_container")[0].style.display="none";
			document.getElementsByClassName("about_container")[0].style.display="none";
            document.getElementsByClassName("final_score_container")[0].style.display="none";
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

window.onerror=function(msg, url, linenumber){
	alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber)
	return true;
}

window.onload = function() {
	var questions_answered = [];
	var total_categories = [];
	var total_categories_used = [];
	var category_items;
	var current_randomized_category;
	var current_category_id = Math.floor(Math.random() * 1) + 0;
	var username = readCookie('name');
	checkUsername(username,"check");

	function reverseChildNodes(node) {
		var parentNode = node.parentNode, nextSibling = node.nextSibling,
		    frag = node.ownerDocument.createDocumentFragment();
		parentNode.removeChild(node);
		while(node.lastChild)
		    frag.appendChild(node.lastChild);
		node.appendChild(frag);
		parentNode.insertBefore(node, nextSibling);
		return node;
	}

	function createCookie(name,value,age) {
		document.cookie = name + "=" + value +"; age="+ age + "; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name,"",-1);
	}

	document.getElementById("username").focus();

	document.getElementById("alone").onclick = function() {
		fillQuestions();
	}

	document.getElementById("group").onclick = function() {
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
		document.getElementsByClassName("lobby_container")[0].style.display="block";
		getGroups();
	}

	document.getElementById("expl").onclick = function() {
		document.getElementsByClassName("about_container")[0].style.display="block";
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
	}

	document.getElementById("chosen_new_group").onclick = function() {
		document.getElementsByClassName("lobby")[0].style.display="none";
		document.getElementsByClassName("create_group_container")[0].style.display="block";
		fillGroupCategoriesContent();
	}

	document.getElementById("exit_group").onclick = function() {
		exitGroup();
	}

	for(var i = 0; i < document.getElementsByClassName("chosen_menu_group").length; i++) {
		document.getElementsByClassName("chosen_menu_group")[i].onclick = function() {
			getNewUserInterval = 0;
			exitGroup();
			document.getElementsByClassName("lobby_container")[0].style.display="block";
			document.getElementsByClassName("create_group_container")[0].style.display="none";
			document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
			document.getElementsByClassName("lobby")[0].style.display="block";
			getGroups();
		}
	}

	for(var i = 0; i < 3; i++) {
		document.getElementsByClassName("chosen_menu")[i].onclick = function() {
			getNewUserInterval = 0;
			document.getElementsByClassName("main_menu_container")[0].style.display="block";
			document.getElementsByClassName("category_container")[0].style.display="none";
			document.getElementsByClassName("question_container")[0].style.display="none";
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			document.getElementsByClassName("lobby_container")[0].style.display="none";
			document.getElementsByClassName("about_container")[0].style.display="none";
            document.getElementsByClassName("final_score_container")[0].style.display="none";
		}
	}

	document.getElementById("creategroup").onclick = function() {
		var group_name = document.getElementById("groupname").value;
		var group_code = document.getElementById("groupcode").value;
		var categories_selected = [];

		if(group_name.length > 1 && group_code.length > 1) {
			document.getElementById("groupname").style.border = "none";
			document.getElementById("groupcode").style.border = "none";
			for (var i = 0; i < category_items.length-1; i++) {
				if(document.getElementById("categories_group_check_"+i).checked) {
					categories_selected.push(i);
				}
			}
			console.log(group_name,group_code,categories_selected);
			var httpRequest = new XMLHttpRequest();
			if(!httpRequest) return false;
			httpRequest.onreadystatechange = validate;
			httpRequest.open('GET','controller.php?function=createGroup&group_name='+group_name+'&group_code='+group_code+'&categories='+categories_selected+'&group_admin='+readCookie('token'));
			httpRequest.send();
			function validate() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						answer_return = httpRequest.responseText;
						console.log(answer_return);
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("create_group_container")[0].style.display="none";
						document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
						document.getElementsByClassName("lobby")[0].style.display="block";
						getGroups();
					} else {
						answer_return = 'There was a problem with the request.';
					}
				}
			}
		} else if (group_name.length <= 1) {
			document.getElementById("groupname").style.border = "2px solid #b70000";
		} else if (group_code.length <= 1) {
			document.getElementById("groupcode").style.border = "2px solid #b70000";
		}
	}

	document.getElementById("chosen_username").onclick = function() {
		var name = document.getElementById("username").value;
		if (name.length > 1) {
			document.getElementsByClassName("main_menu_container")[0].style.display="block";
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			checkUsername(name);
		}
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

	var getNewUserInterval = 0;

	function getGroups() {
		console.log(document.getElementsByClassName("lobby_item"));
		document.getElementsByClassName("lobby_item_list")[0].innerHTML = "";
		console.log("Loading groups");
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getGroups');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					var group_items = answer_return.split("|");
					for(var i = 0; i < group_items.length-1; i++) {
						if (group_items[i] != "") {
							var group_id = group_items[i].split("=")[0];
							var group = group_items[i].split("=")[1];
							document.getElementsByClassName("lobby_item_list")[0].innerHTML += '<div class="lobby_item" id="lobby_'+group_id+'">'+group+'</div>';
						}
					}
					for(var i = 0; i < document.getElementsByClassName("lobby_item").length; i++) {
						document.getElementsByClassName("lobby_item")[i].onclick = function() {
							var id = this.id.split("_")[1];
							getNewUserInterval = 1;
							document.getElementById("groupnametitle").innerHTML = this.innerHTML;
							joinGroup(id);
							getGroupUsers(id);
						}
					}
					reverseChildNodes(document.getElementsByClassName('lobby_item_list')[0]);
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	var delay = ( function() {
		var timer = 0;
		return function(callback, ms) {
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	function getGroupUsers(id) {
		if (getNewUserInterval == 1) {
			var httpRequest = new XMLHttpRequest();
			if(!httpRequest) return false;
			httpRequest.onreadystatechange = validate;
			httpRequest.open('GET','controller.php?function=getUsers&group_id='+id);
			httpRequest.send();

			//console.log("Request started.");

			function validate() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						document.getElementsByClassName("multiplayer_name_list")[0].innerHTML = "";
						answer_return = httpRequest.responseText;
						var users = answer_return.split("|");
						for(var i = 0; i < users.length-1; i++) {
							if (users[i] != "") {
								var user_id = users[i].split("=")[0];
								var user = users[i].split("=")[1];
								document.getElementsByClassName("multiplayer_name_list")[0].innerHTML += '<p>'+user+'</p>';
							}
						}
						//console.log(answer_return);
						//console.log("Request finished.");
						delay(function(){
							getGroupUsers(id);
						}, 1000 );
					} else {
						answer_return = 'There was a problem with the request.';
					}
				}
			}
		}
	}

	var inGroup = 0;
	function joinGroup(id) {
		inGroup = 1;
		console.log("Joining group "+id);
		document.getElementById("play").style.display="none";
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
		document.getElementsByClassName("lobby_container")[0].style.display="none";
		document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="block";
		var token = readCookie('token');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=joinGroup&token='+token+'&group_id='+id);
		httpRequest.send();

		console.log("Adding user.");

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					console.log("User added. ");
					answer_return = httpRequest.responseText;
					if (answer_return == "admin") {
						console.log("show play button!");
						document.getElementById("play").style.display="block";
					} else {
						document.getElementById("play").style.display="none";
					}
					console.log(answer_return);
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	function exitGroup() {
		if (inGroup == 1) {
			console.log("Exiting group.");
		}
	}

	function emptyQuestionAnswers() {
		document.getElementsByClassName("question")[0].innerHTML = "";
		for(var i = 0; i < 4; i++) {
			document.getElementById(i).innerHTML = "";
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

	function showFinalScoreGroup() {
		document.getElementsByClassName("main_menu_container")[0].style.display="none";
		document.getElementsByClassName("question_container")[0].style.display="none";
		document.getElementsByClassName("category_container")[0].style.display="none";
		document.getElementsByClassName("final_score_container")[0].style.display="block";
	}

	function checkUsername(temp_name,check) {
		console.log("Checking username..");
		if (check == "check") {
			if (temp_name == "" || temp_name == null || temp_name.length < 1) {
				console.log("Cookie is not set");
				document.getElementsByClassName("main_menu_container")[0].style.display="none";
				document.getElementsByClassName("new_user_prompt_container")[0].style.display="block";
			} else {
				document.getElementsByClassName("main_menu_container")[0].style.display="block";
				console.log("Username set, it's '"+username+"'");

			}
		} else {
			if (temp_name != "" || temp_name != null || temp_name.length > 1) {
				console.log(temp_name);
				createUser(temp_name,7);
			}
		}
	}

	function createUser(temp_name,age) {
		var httpRequest;
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?user_name='+temp_name+'&age='+age+'&function=createUser');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					createCookie('name',temp_name,age);
					createCookie('token',answer_return,0);
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
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

	function fillGroupCategoriesContent() {
		console.log("load group cats");
		document.getElementsByClassName("categories_group_selection_container")[0].innerHTML = "";

		var answer_return, httpRequest;
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getCatsGroup');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					category_items = answer_return.split("|");
					for(var i = 0; i < category_items.length-1; i++) {
						if (category_items[i] != "") {
							console.log();
							var category_id = category_items[i].split("=")[0];
							var category = category_items[i].split("=")[1];
							document.getElementsByClassName("categories_group_selection_container")[0].innerHTML += '<div class="categories_group_selection_item"><input type="checkbox" id="categories_group_check_'+category_id+'" checked><p id="categories_group_'+category_id+'">'+category+'</p></div>';
						}
					}
					//alertContents(answer_return);
				} else {
					answer_return = 'There was a problem with the request.';
					//alertContents(answer_return);
				}
			}
		}
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

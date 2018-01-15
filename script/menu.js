window.onload = function() {

	//On moment of exiting browser, fire these functions
	window.onbeforeunload = function() {
		//setWaitingToFalse();
		//exitAllGroups();
	}

	var questions_answered = [];
	var total_categories = [];
	var total_categories_used = [];
	var category_items, user_items;
	var current_randomized_category;
	var glob_group_id = -1;
	var new_user = 0;
	var active_user = 0;
	var users_selected;
	var local_score = 0;
	var frontadmin = 0;
	var stopRequestingLobby = 0;
	var stopRequestingLobbyGroups = 0;
	var stopRequestingLobbyEndScores = 0;
	var getNewUserInterval = 0;
	var temp_group_name = "";
	var temp_local_cats = "";
	const username = readCookie('name');

	//Check if session exists
	checkUsername(username,"check");

	//If session_token doesn't exist, fire these functions
	if (readCookie('token') != null) {
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="none";
		setWaitingToFalse();
		exitAllGroups();
	}

	checkIntroCode(readCookie('code'));

	//If code doesn't exist, show intro code
	if (readCookie('code') != null) {
		console.log("CHECK CODE");
		checkIntroCode(readCookie('code'));
	}

	//Create new cookie
	function createCookie(name,value,age) {
		document.cookie = name + "=" + value +"; age="+ age + "; path=/";
	}

	//Read an existing cookie
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

	//Remove existing cookie
	function eraseCookie(name) {
		createCookie(name,'=; Max-Age=0');
	}

	//Change logo color to the one in the parameter
	function hideAllLogosExceptPara(show) {
		document.getElementById("logo_1").style.display="none";
		document.getElementById("logo_2").style.display="none";
		document.getElementById("logo_3").style.display="none";
		if (show == 1) {
			document.getElementById("logo_1").style.display="block";
		} else if (show == 2) {
			document.getElementById("logo_2").style.display="block";
		} else if (show == 3) {
			document.getElementById("logo_3").style.display="block";
		}
	}

	//Submit code
	document.getElementById("intro_button").onclick = function() {
		var code = document.getElementById("intro_code").value;
		document.getElementById("intro_button").innerHTML = "Laden..";
		checkIntroCode(code);
	}

	//Validate code
	function checkIntroCode(code) {
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=checkIntroCode&code='+code);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var answer_return = httpRequest.responseText;
					console.log(answer_return);
					if (answer_return == "false") {
						console.log("dont show");
						eraseCookie('code');
						document.getElementById("code_overlay").style.display = "block";
						document.getElementsByClassName("super_main_content")[0].style.display="none";
					} else if (answer_return == "true") {
						console.log("show");
						document.getElementsByClassName("super_main_content")[0].style.display="block";
						document.getElementById("code_overlay").style.display = "none";
						if (readCookie('code') == null) {
							createCookie('code',code);
						}
					}
				}
			}
		}
	}

	//Start alone gamemode
	document.getElementById("alone").onclick = function() {
		glob_group_id = -1;
		local_score = 0;
		questions_answered = [];
		createCookie('age',document.getElementById("age_alone").value);
		document.getElementsByClassName("alone_select_categories_container")[0].style.display="none";
		fillQuestions();
	}

	//Get categories for alone gamemode
	document.getElementById("categories_alone").onclick = function() {
		document.getElementsByClassName("explain_container")[0].style.display="none";
		document.getElementsByClassName("alone_select_categories_container")[0].style.display="block";
		fillAloneCategoriesContent();
		getMax();
	}

	//Show alone explanation before selection categories
	document.getElementById("pre_alone").onclick = function() {
		document.getElementById("start_menu").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_alone").style.display="block";
		document.getElementsByClassName("back_to_start_button")[0].style.display="block";
		document.getElementById("alone").style.display="block";
		document.getElementById("categories_alone").style.display="block";
		hideAllLogosExceptPara(2);
	}

	//Show all possible explanations
	document.getElementById("explain").onclick = function() {
		document.getElementById("start_menu").style.display="none";
		document.getElementById("explain_menu").style.display="block";
	}

	//Show alone explanation
	document.getElementById("explain_alone_button").onclick = function() {
		document.getElementById("explain_menu").style.display="none";
		document.getElementById("categories_alone").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_alone").style.display="block";
		hideAllLogosExceptPara(2);
	}

	//Show leader explanation
	document.getElementById("explain_group_button").onclick = function() {
		document.getElementById("explain_menu").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_group").style.display="block";
		hideAllLogosExceptPara(3);
	}

	//Show participation explanation
	document.getElementById("explain_part_button").onclick = function() {
		document.getElementById("explain_menu").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_part").style.display="block";
		hideAllLogosExceptPara(1);
	}

	//Go back to alone explanation button
	document.getElementsByClassName("back_to_explain_button")[0].onclick = function() {
		document.getElementsByClassName("alone_select_categories_container")[0].style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_alone").style.display="block";
	}

	//All back to start menu buttons
	for(var i = 0; i < document.getElementsByClassName("back_to_start_button").length; i++) {
		document.getElementsByClassName("back_to_start_button")[i].onclick = function() {
			document.getElementById("explain_group").style.display="none";
			document.getElementById("explain_part").style.display="none";
			document.getElementById("explain_alone").style.display="none";
			document.getElementsByClassName("explain_container")[0].style.display="none";

			document.getElementById("start_menu").style.display="block";
			hideAllLogosExceptPara(3);
		}
	}

	//Show login as leader
	document.getElementById("chosen_username_back").onclick = function() {
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="block";
		document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
		document.getElementById("leadercode_title").style.display="block";
		document.getElementById("leadercode").style.display="block";
		document.getElementById("chosen_username").style.display="block";
	}

	//Show pre-login screen and if the user is logged in
	document.getElementById("play_group").onclick = function() {
		document.getElementById("start_menu").style.display="none";
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="block";
		document.getElementsByClassName("alone_select_categories")[0].innerHTML = "";
		if (readCookie('name') != null) {
			document.getElementById("user_chosen_yes").style.display="none";
			document.getElementById("user_chosen_no").style.display="none";
			document.getElementById("admin_code_title").innerHTML="";
			document.getElementById("pre_new_user_prompt_text").innerHTML = "Welkom terug: <br>"+readCookie('name');
			document.getElementById("user_chosen_logout").style.display="block";
			checkAdmin(readCookie('token'));
		} else {
			document.getElementById("pre_new_user_prompt_text").innerHTML = "Welkom";
			document.getElementById("user_chosen_logout").style.display="none";
		}
	}

	//Show login as participator of a group
	document.getElementById("user_chosen_no").onclick = function() {
		//console.log(active_user);
		document.getElementById("new_user_prompt_title").innerHTML="Inloggen als deelnemer";
		document.getElementById("leadercode_title").style.display="none";
		document.getElementById("leadercode").style.display="none";
		document.getElementById("leadername_title").style.display="block";
		document.getElementById("leadername").style.display="block";
		document.getElementById("leadersurname").style.display="block";
		if (active_user == 1) {
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			document.getElementsByClassName("lobby_container")[0].style.display="block";
			stopRequestingLobbyGroups = 0;
			getGroups();
		} else {
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="block";
		}
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="none";
		new_user = 1;
	}

	//Reload game
	document.getElementById("reload").onclick = function() {
		console.log("reload");
		window.location.reload();
	}

	//Login as leader screen
	document.getElementById("user_chosen_yes").onclick = function() {
		//console.log(active_user);
		document.getElementById("new_user_prompt_title").innerHTML="Inloggen als beheerder";
		document.getElementById("leadername_title").style.display="none";
		document.getElementById("leadername").style.display="none";
		document.getElementById("leadersurname").style.display="none";
		if (active_user == 1) {
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			validateAdmin(readCookie('token'));
		} else {
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="block";
		}
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="none";
		new_user = 1;
	}

	//Show screen to create a group
	document.getElementById("chosen_new_group").onclick = function() {
		document.getElementsByClassName("lobby_admin")[0].style.display="none";
		document.getElementsByClassName("create_group_container")[0].style.display="block";
		getMax();
		setWaitingToFalse();
		fillGroupCategoriesContent();
		getAllUsersCreateGroupList();
	}

	//Show lobby and check if admin or not
	for(var i = 0; i < document.getElementsByClassName("chosen_menu_group").length; i++) {
		document.getElementsByClassName("chosen_menu_group")[i].onclick = function() {
			getNewUserInterval = 0;
			exitAllGroups();
			setWaitingToTrue();
			stopRequestingLobbyGroups = 0;
			document.getElementsByClassName("lobby_container")[0].style.display="block";
			document.getElementsByClassName("create_group_container")[0].style.display="none";
			document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
			document.getElementsByClassName("lobby_admin")[0].style.display="none";
			document.getElementsByClassName("lobby")[0].style.display="none";
			if (frontadmin == 1) {
				document.getElementsByClassName("lobby_admin")[0].style.display="block";
			} else {
				document.getElementsByClassName("lobby")[0].style.display="block";
			}
			getGroups();
		}
	}

	//Play all groups trigger
	document.getElementById("play_all").onclick = function() {
		document.getElementById("play_all").innerHTML = "<p>Loading..</p>";
		playAll();
	}

	//Stop requesting group AJAX loop
	for(var i = 0; i < document.getElementsByClassName("chosen_menu").length; i++) {
		document.getElementsByClassName("chosen_menu")[i].onclick = function() {
			getNewUserInterval = 0;
			stopRequestingLobbyGroups = 1;
			stopRequestingLobbyEndScores = 1;
			setWaitingToFalse();
			document.getElementsByClassName("category_container")[0].style.display="none";
			document.getElementsByClassName("question_container")[0].style.display="none";
			document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			document.getElementsByClassName("lobby_container")[0].style.display="none";
			document.getElementsByClassName("about_container")[0].style.display="none";
            document.getElementsByClassName("final_score_container")[0].style.display="none";
		}
	}

	//Create a new group trigger and send request to controller
	document.getElementById("creategroup").onclick = function() {
		var group_name = document.getElementById("groupname").value;
		document.getElementById("creategroup").style.display="none";
		var categories_selected = [];
		var amount_of_questions_per_cat = document.getElementById("amount_of_questions_per_cat").value;

		if(group_name.length > 1) {
			document.getElementById("groupname").style.border = "none";
			for (var i = 0; i < category_items.length-1; i++) {
				if(document.getElementById("categories_group_check_"+i).checked) {
					categories_selected.push(i);
				}
			}
			//console.log(group_name,group_code,categories_selected);
			var max_questions = document.getElementById("amount_of_questions_per_cat").value;
			var httpRequest = new XMLHttpRequest();
			if(!httpRequest) return false;
			httpRequest.onreadystatechange = validate;
			httpRequest.open('GET','controller.php?function=createGroup&max_questions='+amount_of_questions_per_cat+'&group_name='+group_name+'&categories='+categories_selected+'&users='+users_selected+'&group_admin='+readCookie('token')+'&max_questions='+max_questions);
			httpRequest.send();
			function validate() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						answer_return = httpRequest.responseText;
						console.log(answer_return);
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("create_group_container")[0].style.display="none";
						document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
						document.getElementsByClassName("lobby_admin")[0].style.display="none";
						document.getElementsByClassName("lobby")[0].style.display="none";
						if (frontadmin == 1) {
							console.log("show admin stuff");
							document.getElementsByClassName("lobby_admin")[0].style.display="block";
						} else {
							document.getElementsByClassName("lobby")[0].style.display="block";
						}

						document.getElementById("creategroup").style.display="block";
						document.getElementById("groupname").innerHTML="";
						stopRequestingLobbyGroups = 0;
						getGroups();
					} else {
						answer_return = 'There was a problem with the request.';
					}
				}
			}
		} else if (group_name.length <= 1) {
			document.getElementById("groupname").style.border = "2px solid #b70000";
		}
	}

	//Get age of user
	function getAge(dateString) {
		var dates = dateString.split("-");
		var d = new Date();
		var userday = dates[0];
		var usermonth = dates[1];
		var useryear = dates[2];
		var curday = d.getDate();
		var curmonth = d.getMonth()+1;
		var curyear = d.getFullYear();
		var age = curyear - useryear;
		if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday   )){
			age--;
		}
		return age;
	}

	var age_d_container = document.getElementById("age_d");
	var age_m_container = document.getElementById("age_m");
	var age_y_container = document.getElementById("age_y");

	age_d_container.onkeyup = function(e) {
		next_date(e);
	};

	age_m_container.onkeyup = function(e) {
		next_date(e);
	};

	age_y_container.onkeyup = function(e) {
		next_date(e);
	};

	//Automatically go to next input element
	function next_date(e) {
		var length = e.target.value.length;
		var max = e.target.maxLength;
		if(length == max) {
			var next = e.target;
			while (next = next.nextElementSibling) {
				if (next == null) break;
				if (next.tagName.toLowerCase() === "input") {
					next.focus();
					break;
				}
				if(e.target.id == "age_y") {
					document.getElementById("leadercode").focus();
				}
			}
		}
	}

	//Logout
	document.getElementById("user_chosen_logout").onclick = function() {
		eraseCookie('name');
		eraseCookie('token');
		location.reload(-1);
	}

	//Back to start
	document.getElementById("back_to_login").onclick = function() {
		location.reload(-1);
	}
	//Back to start
	document.getElementById("user_chosen_menu").onclick = function() {
		location.reload(-1);
	}
	//Back to start
	document.getElementById("user_chosen_menu").onclick = function() {
		location.reload(-1);
	}
	//Back to start
	document.getElementById("back_to_login_admin").onclick = function() {
		location.reload(-1);
	}

	//Check user
	document.getElementById("chosen_username").onclick = function() {
		document.getElementById("chosen_username").style.display="none";
		var leadername = document.getElementById("leadername").value;
		var leadersurname = document.getElementById("leadersurname").value;
		var leadercode = document.getElementById("leadercode").value;
		var temp_name = document.getElementById("username").value;
		var surname = document.getElementById("surname").value;
		var age_d = document.getElementById("age_d").value;
		var age_m = document.getElementById("age_m").value;
		var age_y = document.getElementById("age_y").value;
		if (new_user == 1) {
			if (temp_name.length > 1 && temp_name.length > 1 && surname.length > 1 && age_d.length > 1 && age_m.length > 1 && age_y.length > 1 && age_y >= 1918 && age_d <= 31 && age_m <= 12 && age_y <= 2015) {
				var temp_age = age_d+'-'+age_m+'-'+age_y;
				var age = getAge(temp_age);
				checkUsername(temp_name,'create',leadercode,leadername,leadersurname,surname,temp_age,age,-1);
				//console.log(temp_name,'check',surname,temp_age,age,-1);
			} else {
				document.getElementById("chosen_username").style.display="block";
			}
		} else if (new_user == 0) {
			if (name.length > 1 && surname.length > 1 && age_d.length > 1 && age_m.length > 1 && age_y.length > 1) {
				//console.log("Wachtend op groepsindeling door beheerder.");
			} else {
				document.getElementById("chosen_username").style.display="block";
			}
		}
	}

	//Play all groups
	function playAll() {
		var item_length = document.getElementsByClassName("lobby_item_list")[1].children.length;
		//console.log(item_length);
		for(var i = 0; i < item_length; i++) {
			var temp_group_id = document.getElementsByClassName("lobby_item_list")[1].children[i].id.split("_")[1];
			sendPlayPingToUsers(temp_group_id);
			//console.log(temp_group_id);
		}
		//console.log("do et");
	}

	//Get maximum amount of categories
	function getMax() {
		var token = readCookie('token');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getMax&session_token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var answer_return = httpRequest.responseText;
					document.getElementById("amount_of_questions_per_cat").value = answer_return;
					document.getElementById("amount_of_questions_per_cat").max = answer_return;
					document.getElementById("max").innerHTML = "*minimaal 1 en maximaal "+answer_return;

					document.getElementById("alone_max_questions").value = answer_return-1;
					document.getElementById("alone_max_questions").max = answer_return;
					document.getElementById("max_alone").innerHTML = "*minimaal 1 en maximaal "+answer_return;
					console.log(answer_return);
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	//Send play ping to users with group_id
	function sendPlayPingToUsers(id) {
		var token = readCookie('token');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=playPing&token='+token+'&group_id='+id);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					document.getElementById("play_all").innerHTML = "<p>Alle wachtende groepen laten spelen</p>";
					answer_return = httpRequest.responseText;
					if(answer_return == "playing") {
						//alert("goood");
						//console.log("Sent play request to all users in this group.");
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	//hide question container
	function hideQandAShowMainMenu() {
		document.getElementsByClassName("question_container")[0].style.display="none";
	}

	//Check if admin, otherwise logout
	function getAdminByUserToken(token) {
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getAdminByUserToken&token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					console.log(answer_return);
					if (answer_return == "") {
						eraseCookie('name');
						eraseCookie('token');
						location.reload(-1);
					}
					document.getElementById("admin_code_title").innerHTML="Je bent ingelogd als deelnemer. <br> Je beheerder is: "+answer_return;
				}
			}
		}
	}

	//Check if admin by validating token
	function checkAdmin(token) {
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=validateAdmin&token='+token);
		httpRequest.send();

		document.getElementById("admin_code_title").innerHTML = "Laden..";

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					document.getElementById("user_chosen_yes").style.display="no";
					document.getElementById("user_chosen_no").style.display="no";
					if (answer_return == "is_admin") {
						frontadmin = 1;
						document.getElementById("admin_code_title").innerHTML="Je bent ingelogd als beheerder";
						document.getElementById("user_chosen_yes").style.display="block";
						document.getElementById("user_chosen_yes").style.width="100%";
					} else {
						frontadmin = 0;
						document.getElementById("admin_code_title").innerHTML="Je bent ingelogd als deelnemer";
						document.getElementById("user_chosen_no").style.display="block";
						document.getElementById("user_chosen_no").style.width="100%";
						getAdminByUserToken(readCookie('token'));
					}
				}
			}
		}
	}

	//Check if admin by validating token and get groups
	function validateAdmin(token) {
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=validateAdmin&token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					if (answer_return == "is_admin") {
						frontadmin = 1;
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("lobby_admin")[0].style.display="block";
						document.getElementsByClassName("lobby")[0].style.display="none";
						stopRequestingLobbyGroups = 0;
						getGroups();
					} else {
						document.getElementById("explain_group").style.display="none";
						document.getElementById("explain_part").style.display="none";
						document.getElementById("explain_alone").style.display="none";
						document.getElementsByClassName("explain_container")[0].style.display="none";
						document.getElementById("start_menu").style.display="block";
						promptOverlay("Geen groepsleider gevonden met de naam: "+readCookie('name'));
					}
				}
			}
		}
	}

	//Get groups and show them in container
	function getGroups() {
		setWaitingToTrue();
		document.getElementById("username_show").innerHTML = "Ingelogd als: "+readCookie('name');
		document.getElementById("adminname_show").innerHTML = "Ingelogd als: "+readCookie('name');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getGroups&session_token='+readCookie('token'));
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					//console.log(frontadmin);
					var admin_element = 0;
					var admin_play_element = 0;
					if (frontadmin == 1) {
						admin_element = 1;
						admin_play_element = 2;
						document.getElementsByClassName("lobby_item_list")[admin_play_element].innerHTML = "";
					}
					document.getElementsByClassName("lobby_item_list")[admin_element].innerHTML = "";
					answer_return = httpRequest.responseText;
					//console.log(answer_return);
					var group_items = answer_return.split("|");
					for(var i = 0; i < group_items.length-1; i++) {
						if (group_items[i] != "") {
							var group_id = group_items[i].split("=")[0];
							var group = group_items[i].split("=")[1];
							if (group[0] != "*") {
								document.getElementsByClassName("lobby_item_list")[admin_element].innerHTML += '<div class="lobby_item" id="lobby_'+group_id+'">'+group+'</div>';
							} else {
								if (frontadmin ) {
									document.getElementsByClassName("lobby_item_list")[admin_play_element].innerHTML += '<div class="lobby_score_item" id="getscore_'+group_id+'">'+group.split("*")[1]+'</div>';
								}
							}
						}
					}
					if (document.getElementsByClassName("lobby_item_list")[admin_element].innerHTML == "") {
						document.getElementById("play_all").style.display = "none";
					} else {
						document.getElementById("play_all").style.display = "block";
					}
					//temp_group_name = document.getElementById("lobby_"+glob_group_id).innerHTML;
					for(var i = 0; i < document.getElementsByClassName("lobby_item").length; i++) {
						document.getElementsByClassName("lobby_item")[i].onclick = function() {
							var id = this.id.split("_")[1];
							getNewUserInterval = 1;
							stopRequestingLobbyGroups = 1;
							joinGroup(id);
							getGroupUsers(id);
						}
					}
					for(var i = 0; i < document.getElementsByClassName("lobby_score_item").length; i++) {
						document.getElementsByClassName("lobby_score_item")[i].onclick = function() {
							var id = this.id.split("_")[1];
							glob_group_id = id;
							document.getElementsByClassName("lobby_container")[0].style.display = "none";
							document.getElementById("back_to_admin").style.display = "block";
							document.getElementById("reload").style.display = "none";
							document.getElementsByClassName("inner_pos_score")[0].innerHTML = "";
							showFinalScoreGroup();
						}
					}
					document.getElementById("back_to_admin").onclick = function() {
						document.getElementsByClassName("lobby_container")[0].style.display = "block";
						document.getElementById("back_to_admin").style.display = "none";
						document.getElementById("reload").style.display = "block";
						document.getElementsByClassName("final_score_container")[0].style.display="none";
					}

				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
			//console.log("stop requesting = "+stopRequestingLobbyGroups);
			if (stopRequestingLobbyGroups == 0) {
				//console.log(stopRequestingLobbyGroups);
				delay(function(){
					getGroups();
					//console.log("ping");
				}, 500 );
			}
		}
	}

	//Timer delay
	var delay = ( function() {
		var timer = 0;
		return function(callback, ms) {
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	//Get the current groupname and how many questions
	function getGroupNameAndQuantity(id) {
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getGroupNameAndQuantity&group_id='+id);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					document.getElementById("groupnametitle").innerHTML = answer_return;
					//console.log(answer_return);
				}
			}
		}
	}

	//Get all participators of a group
	function getGroupUsers(id) {
		if (getNewUserInterval == 1 && stopRequestingLobby == 0) {
			var httpRequest = new XMLHttpRequest();
			if(!httpRequest) return false;
			httpRequest.onreadystatechange = validate;
			httpRequest.open('GET','controller.php?function=getUsers&group_id='+id);
			httpRequest.send();

			getGroupNameAndQuantity(id);

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
								if (frontadmin == 1) {
									if (readCookie('name') != user) {
										document.getElementsByClassName("multiplayer_name_list")[0].innerHTML += '<p>'+user+'</p>'+'<div id="user_id_'+user_id+'" class="kick">x</div>';
									} else {
										document.getElementsByClassName("multiplayer_name_list")[0].innerHTML += '<p style="color:#3ca8e7;">'+user+'</p>';
									}
								} else {
									document.getElementsByClassName("multiplayer_name_list")[0].innerHTML += '<p style="width:100% !important">'+user+'</p>';
								}
							}
						}
						//Kick user
						if (document.getElementsByClassName("kick").length > 0) {
							for(var i = 0; i < document.getElementsByClassName("kick").length; i++) {
								document.getElementsByClassName("kick")[i].onclick = function() {
									kickUser(this.id.split("_")[2]);
									document.getElementsByClassName("multiplayer_name_list")[0].removeChild(this);
								}
							}
						}
						//Play with group
						document.getElementById("play").onclick = function() {
							playAll();
							document.getElementById("exit_group").style.display="none";
							document.getElementById("play").style.display="none";
						}
						checkLobbyStatus(readCookie('token'),id);
						delay(function(){
							getGroupUsers(id);
						}, 250 );
					} else {
						answer_return = 'There was a problem with the request.';
					}
				}
			}
		}
	}

	//Check if user has connection
	function setTimeOut(id) {
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;

		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=timeOut&id='+id);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
				}
			}
		}
	}

	//User is not waiting
	function setWaitingToFalse() {
		var session_token= readCookie('token');
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;
		stopRequestingLobbyGroups = 1;

		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=setWaitingToFalse&session_token='+session_token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
				}
			}
		}
	}

	//User is waiting with last ping, this is a check if user is still active or connected
	function setWaitingToTrue() {
		var session_token= readCookie('token');
		var httpRequest = new XMLHttpRequest();
		var answer_return;
		var d = new Date();
		var current_ping_time = d.getTime();
		if(!httpRequest) return false;

		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=setWaitingToTrue&session_token='+session_token+'&waiting_last_ping='+current_ping_time);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
				}
			}
		}
	}

	//Check if user is going to play or has been kicked
	function checkLobbyStatus(token,group_id) {
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=checkLobbyStatus&token='+token+'&group_id='+group_id);
		httpRequest.send();
		//console.log("check",token,group_id);

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					if(answer_return == "kicked") {
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("create_group_container")[0].style.display="none";
						document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
						document.getElementsByClassName("lobby")[0].style.display="block";
						getGroups();
					}
					if (answer_return == "play") {
						//console.log("Play request received");
						document.getElementsByClassName("create_group_container")[0].style.display="none";
						document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
						stopRequestingLobby = 1;
						fillQuestions(0);
					}
					//console.log(answer_return);
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	//Kick user by user_id and check if admin
	function kickUser(id) {
		var token = readCookie('token');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=kickUser&token='+token+'&user_id='+id);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					if(answer_return == "removed") {
						//console.log("Kicked player");
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	//Join group
	function joinGroup(id) {
		questions_answered = [];
		glob_group_id = id;
		document.getElementById("play").style.display="none";
		document.getElementsByClassName("lobby_container")[0].style.display="none";
		document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="block";
		document.getElementById("exit_group").style.display="block";
		var token = readCookie('token');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=joinGroup&token='+token+'&group_id='+id);
		httpRequest.send();

		setWaitingToFalse();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					if (answer_return == "admin") {
						frontadmin = 1;
						document.getElementById("play").style.display="block";
					} else {
						frontadmin = 0;
						document.getElementById("play").style.display="none";
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	//Exit all groups
	function exitAllGroups() {
		if (readCookie('token').length > 1) {
			glob_group_id = -1;
			var httpRequest;
			httpRequest = new XMLHttpRequest();
			if (!httpRequest) return false;

			var token = readCookie('token');
			httpRequest.onreadystatechange = validate;
			httpRequest.open('GET','controller.php?token='+token+'&function=exitAllGroups');
			httpRequest.send();

			function validate() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						answer_return = httpRequest.responseText;
					} else {
						answer_return = 'There was a problem with the request.';
					}
				}
			}
		}
	}

	//Empty question and answers container
	function emptyQuestionAnswers() {
		document.getElementsByClassName("question")[0].innerHTML = "";
		for(var i = 0; i < 4; i++) {
			document.getElementsByClassName("answers_"+i)[0].innerHTML = "";
		}
	}

	//Show endscore
	function showFinalScoreGroup(score,amount_of_questions) {
		document.getElementsByClassName("question_container")[0].style.display="none";
		document.getElementsByClassName("category_container")[0].style.display="none";
		document.getElementsByClassName("final_score_container")[0].style.display="block";
		document.getElementsByClassName("user_answers_container")[0].style.display="none";
		if (glob_group_id == -1 && frontadmin == 0) {
			console.log("show final score: "+score);
			document.getElementsByClassName("inner_pos_score")[0].innerHTML = "<div class='score' id='score_-1'>"+score+" van de "+amount_of_questions+" punten </div>";
		} else if (glob_group_id != -1 && frontadmin == 0) {
			document.getElementsByClassName("inner_pos_score")[0].innerHTML = "<div class='score' id='score_-1'>"+score+" van de "+amount_of_questions+" punten </div>";
		} else if (glob_group_id != -1 && frontadmin == 1) {
			showAdminScores(amount_of_questions);
		}
	}

	//Get all answers user has selected
	function getAnswersFromUser(id,name,group_id) {
		document.getElementsByClassName("user_answers_container")[0].innerHTML = "Loading..";
		document.getElementsByClassName("inner_pos_score")[0].style.display="none";
		document.getElementsByClassName("user_answers_container")[0].style.display="block";
		document.getElementById("back_to_admin").style.display="none";
		document.getElementById("end_text").innerHTML = name;
		console.log(name);
		document.getElementById("end_text").style.fontSize = "18px";

		document.getElementById("reload").style.display="none";
		document.getElementById("back_to_scores").style.display="block";

		var httpRequest = new XMLHttpRequest();
		var answer_return;
		if (!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?group_id='+group_id+'&user_id='+id+'&session_token='+readCookie('token')+'&function=getScoresSingleUser');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					document.getElementsByClassName("user_answers_container")[0].innerHTML = "";
					var answers = answer_return.split("|");
					console.log(id,answer_return);
					for(var i = 1; i < answers.length; i++) {

						var guessed_answer = answers[i].split(":")[1].split("=")[1];
						var correct_answer = answers[i].split(":")[1].split("=")[0];

						document.getElementsByClassName("user_answers_container")[0].innerHTML += "<div>"+answers[i].split(":")[0]+"</div>";
						if (guessed_answer != correct_answer) {
							document.getElementsByClassName("user_answers_container")[0].innerHTML += "<div style='color:red;'>"+guessed_answer+"</div>";
						}
						document.getElementsByClassName("user_answers_container")[0].innerHTML += "<div style='color:#00f773;margin-bottom: 10px;padding-bottom: 5px;border-bottom: 1px solid #6b99be;'>"+correct_answer+"</div>";
					}
					//console.log(answer_return);
				}
			}
		}

		document.getElementById("back_to_scores").onclick = function() {
			backToAdminScores();
		}
	}

	//Back to admin scores
	function backToAdminScores() {
		document.getElementsByClassName("inner_pos_score")[0].style.display="block";
		document.getElementsByClassName("user_answers_container")[0].style.display="none";
		document.getElementById("back_to_scores").style.display="none";
		document.getElementById("back_to_admin").style.display="block";
		document.getElementById("end_text").innerHTML = "Eindscores";
		document.getElementById("end_text").style.fontSize = "26px";
	}

	//Get maximum amount of points to be scored
	function getMaxScoreCount(temp_element_id) {
		var token = readCookie('token');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getMaxScoreCount&session_token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var answer_return = httpRequest.responseText;
					console.log(temp_element_id);
					console.log(answer_return);
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	//Show admin scores, all users in group
	function showAdminScores(amount_of_questions) {
		stopRequestingLobbyEndScores = 0;
		var admin_token = readCookie('token');
		var group_id = glob_group_id;
		var httpRequest = new XMLHttpRequest();
		if (!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?group_id='+group_id+'&token='+admin_token+'&function=getScoresAllUsers');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					document.getElementsByClassName("inner_pos_score")[0].innerHTML = "";
					document.getElementsByClassName("inner_pos_score")[0].style.fontSize = "18px";
					document.getElementsByClassName("parrot")[0].style.display = "none";
					answer_return = httpRequest.responseText;
					var user_scores = answer_return.split('|');
					var score = "";
					for(var i = 0; i < user_scores.length; i++) {
						if(user_scores[i] != "") {
							score = user_scores[i].split("=")[1];
							document.getElementsByClassName("inner_pos_score")[0].innerHTML += "<div class='score' id='score_"+user_scores[i].split("=")[0]+"'>"+score.split(":")[0]+score.split(":")[1]+" /</div>";
							if (amount_of_questions == undefined) {
								var temp_element_id;
								if (temp_local_cats.length > 0) {
									temp_element_id = "score_"+user_scores[i].split("=")[0]*temp_local_cats.length;
								} else {
									temp_element_id = "score_"+user_scores[i].split("=")[0]*temp_local_cats.length;
								}
								getMaxScoreCount(temp_element_id);
							}
						}
					}
					for (var i = 0; i < document.getElementsByClassName("score").length; i++) {
						document.getElementsByClassName("score")[i].onclick = function(e) {
							var temp_id = e.srcElement.id.split("_")[1];
							console.log(score);
							score = score.split(":")[0]+" deze antwoorden geselecteerd.<br>("+score.split(":")[1]+"/"+amount_of_questions+") goed.";
							getAnswersFromUser(temp_id,score,group_id);
						}
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
				if (stopRequestingLobbyEndScores == 0) {
					delay(function(){
						showAdminScores(amount_of_questions);
						//console.log("ping");
					}, 1500 );
				}
			}
		}
	}

	//Check if username cookie exists or not and trigger validation
	function checkUsername(temp_name,check,leadercode,leadername,leadersurname,surname,temp_age,age) {
		//console.log("Checking username..");
		if (check == "check") {
			if (readCookie('name') == "" || readCookie('name') == null || readCookie('name').length < 1) {
				//console.log("Cookie is not set");
				document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
			} else {
				active_user = 1;
				document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
				//console.log("Username set, it's '"+temp_name+"'");

			}
		} else {
			if (temp_name != "" || temp_name != null || temp_name.length > 1) {
				//console.log("CREATE NEW USER AND COOKIE BIRTHDATE: "+temp_age);
				validateUser(leadercode,leadername,leadersurname,temp_name,age,surname,temp_age);
			}
		}
	}

	//Show prompt
	function promptOverlay(text) {
		console.log(text);
		document.getElementsByClassName("prompt_overlay")[0].style.display="block";
		document.getElementById("prompt_text").innerHTML=text;
		document.getElementById("prompt_button").onclick = function() {
			document.getElementsByClassName("prompt_overlay")[0].style.display="none";
		};
	}

	//Validate a user by parameters and return which type the user is
	function validateUser(leadercode,leadername,leadersurname,temp_name,age,surname,temp_age) {
		var httpRequest;
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		//console.log("IS THIS UNDEFINED?!: "+temp_age);
		httpRequest.open('GET','controller.php?user_name='+temp_name+'&surname='+surname+'&temp_age='+temp_age+'&age='+age+'&leadercode='+leadercode+'&leadername='+leadername+'&leadersurname='+leadersurname+'&leadercode='+leadercode+'&function=validateUser');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					var session_token = answer_return.split(":")[1];
					var answer_check = answer_return.split(":")[0];
					console.log(answer_check,session_token);
					if (answer_check == "no_admin") {
						promptOverlay("Groepsleider niet gevonden.");
						document.getElementById("chosen_username").style.display="block";
					} else if (answer_check == "no_code") {
						promptOverlay("Code niet gevonden.");
						document.getElementById("chosen_username").style.display="block";
					} else if (answer_check == "admin"){
						document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("lobby_admin")[0].style.display="block";
						document.getElementsByClassName("lobby")[0].style.display="none";
						frontadmin = 1;
						stopRequestingLobbyGroups = 0;
						getGroups();
						createCookie('name',temp_name+' '+surname,age);
						createCookie('token',session_token);
						createCookie('age',age);
					} else if (answer_check == "regular") {
						document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("lobby_admin")[0].style.display="none";
						document.getElementsByClassName("lobby")[0].style.display="block";
						stopRequestingLobbyGroups = 0;
						getGroups();

						createCookie('name',temp_name+' '+surname,age);
						createCookie('token',session_token);
						createCookie('age',age);
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	//Show the category popup before a question starts
	function categoryPrompt(category) {
		document.getElementsByClassName("question_container")[0].style.display = "none";
		var timer = 2750;

		document.getElementsByClassName("category_prompt_overlay")[0].style.display = "block";
		document.getElementsByClassName("category_prompt_overlay_inner")[0].classList.remove("slide-out-bottom");
		document.getElementsByClassName("category_prompt_overlay_inner")[0].classList += " slide-in-bottom";

		document.getElementById("category_prompt_text").innerHTML = category;
		document.getElementById("img_geschiedenis").style.display = "none";
		document.getElementById("img_molen").style.display = "none";
		document.getElementById("img_floraenfauna").style.display = "none";
		document.getElementById("img_polder").style.display = "none";

		if (category == "Geschiedenis vragen") {
			document.getElementById("img_geschiedenis").style.display = "block";
			document.getElementsByClassName("question")[0].style.backgroundColor="#825324";
		} else if (category == "Molen vragen") {
			document.getElementById("img_molen").style.display = "block";
			document.getElementsByClassName("question")[0].style.backgroundColor="#98442c";
		} else if (category == "Natuur vragen") {
			document.getElementById("img_floraenfauna").style.display = "block";
			document.getElementsByClassName("question")[0].style.backgroundColor="#108244";
		} else if (category == "Polder vragen") {
			document.getElementById("img_polder").style.display = "block";
			document.getElementsByClassName("question")[0].style.backgroundColor="#067ea0";
		} else {
			document.getElementById("img_polder").style.display = "block";
		}

		window.setTimeout(function(){
			document.getElementsByClassName("question_container")[0].style.display = "block";
			document.getElementsByClassName("category_prompt_overlay_inner")[0].classList.remove("slide-in-bottom");
			document.getElementsByClassName("category_prompt_overlay_inner")[0].className += " slide-out-bottom";
		}, timer);

		window.setTimeout(function(){
			document.getElementsByClassName("category_prompt_overlay")[0].style.display = "none";
		}, timer+750);
	}

	//Fill the questions with answers
	function fillQuestions() {
		var answer_return, httpRequest;
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		temp_local_cats = "";
		var age;
		var max_questions = 0;
		if (document.getElementById("alone_max_questions").value > 0) {
			max_questions = document.getElementById("alone_max_questions").value;
		}
		if (readCookie('age') != null) {
			age = readCookie('age');
		}
		if (glob_group_id == -1) {
			var count = 0;
			for (var i = 0; i < category_items.length-1; i++) {
				if(document.getElementById("categories_alone_check_"+i).checked) {
					if (i != 0 && count != 0) temp_local_cats += ",";
					count++;
					temp_local_cats += i;
				}
			}
		}
		httpRequest.open('GET','controller.php?local_alone_categories='+temp_local_cats+'&group_id='+glob_group_id+'&questions_answered='+questions_answered+'&function=getCatAndQuestions'+'&age='+age+'&max_questions='+max_questions);
		httpRequest.send();
		emptyQuestionAnswers();
		var time_elapsed = 5;
		var is_same_category = false;
		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var answer_return = httpRequest.responseText;
					var categories_with_questions = answer_return.split("|");
					var question_progression = 0;
					var category_progression = 0;
					var amount_of_questions = 0;
					var current_question_id;
					var category_name;

					//Show a question with answers and trigger if the question is the first new one of a category or not.
					function getCategoryWithQuestions(category_progression) {
						category_questions = [];
						amount_of_questions = 0;
						if (categories_with_questions[category_progression] != "") {
							category_id = categories_with_questions[category_progression].split("[")[0];
							category_name = categories_with_questions[category_progression].split("]")[1];
							category_questions = categories_with_questions[category_progression].split("[")[1].split("]")[0].split(",");

							for(var i = 0; i < categories_with_questions.length-1; i++) {
								var temp_category_questions = categories_with_questions[i].split("[")[1].split("]")[0].split(",");
								amount_of_questions += temp_category_questions.length;
							}

							//console.log(amount_of_questions);
						}
						document.getElementsByClassName("category")[0].innerHTML = category_name;

						if (!is_same_category) {
							categoryPrompt(category_name);
						}

						if(category_questions[question_progression] != undefined) {
							current_question_id = category_questions[question_progression];
							console.log(current_question_id);
							if (current_question_id != "") {
								fillContent(current_question_id);
							} else {
								console.log("break");
								category_progression++;
								console.log(category_progression, (categories_with_questions.length-1));
								if (category_progression == categories_with_questions.length-1) {
									endGame(local_score,amount_of_questions);
								}
							}
						}

					}

					//On user selecting answer of question and if user presses yes when asked for validation.
					for (var i = 0; i < 4; i++) {
						document.getElementsByClassName("answers_"+i)[0].onclick = function(i) {
							document.getElementById("chosen_yes").style.display = "block";
							document.getElementById("chosen_no").style.display = "block";
							document.getElementsByClassName("question_container")[0].classList.remove("slide-out-bottom");
							void document.getElementsByClassName("question_container")[0].offsetWidth;
							document.getElementsByClassName("question_container")[0].className += " slide-out-bottom";
							document.getElementsByClassName("chosen_container")[0].style.display="block";
							document.getElementById("chosen_answer_content").innerHTML = this.innerHTML;
							document.getElementById("chosen_answer_title").innerHTML = document.getElementsByClassName("question")[0].innerHTML;

							var potential_answer = this.id;
							document.getElementById("chosen_yes").onclick = function() {
								console.log("category_questions="+category_questions.length,question_progression);
								if (question_progression == category_questions.length-1) {
									question_progression = 0;
									category_progression++;

									console.log("next question in next category");
									is_same_category = false;

								} else {
									question_progression++;

									console.log("next question in same category");
									is_same_category = true;
								}

								if(category_progression == 4) {
									endGame(local_score,amount_of_questions);
								}

								if (category_progression == categories_with_questions.length-1) {
									document.getElementsByClassName("chosen_container")[0].style.display="none";
									validateQuestion(current_question_id,potential_answer,"true",amount_of_questions);
									document.getElementsByClassName("category_prompt_overlay")[0].outerHTML='';
								} else {
									validateQuestion(current_question_id,potential_answer,"false");
									getCategoryWithQuestions(category_progression);
								}
								document.getElementById("chosen_yes").style.display = "none";
								document.getElementById("chosen_no").style.display = "none";
							}
							document.getElementById("chosen_no").onclick = function() {
								document.getElementsByClassName("chosen_container")[0].style.display="none";
								document.getElementsByClassName("question_container")[0].classList.remove("slide-out-bottom");
								document.getElementsByClassName("question_container")[0].className += " slide-in-bottom";
							}
						}
					}

					getCategoryWithQuestions(0);

				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}

		//Push possible answers in frontend
		function fillContent(question_id) {
			var answer_return, httpRequest;
			var user_id = readCookie('token');
			httpRequest = new XMLHttpRequest();
			if(!httpRequest) return false;
			httpRequest.onreadystatechange = validate;

			console.log(question_id);
			httpRequest.open('GET','controller.php?function=getQuestionWithAnswers&question_id='+question_id+'&age='+readCookie('age'));
			httpRequest.send();

			function validate() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						var questions_answers = httpRequest.responseText;
						//console.log(questions_answers);

						//document.getElementsByClassName("question_container")[0].style.display="block";
						document.getElementsByClassName("question_container")[0].classList.remove("slide-out-bottom");
						document.getElementsByClassName("question_container")[0].classList.remove("slide-in-bottom");

						question = questions_answers.split('|')[0];

						possible_answers = questions_answers.split('|');
						possible_answers.shift();
						//console.log(possible_answers);
						document.getElementsByClassName("question")[0].innerHTML = question;
						for(var i = 0; i < 4; i++) {
							document.getElementsByClassName("answers_"+i)[0].innerHTML = possible_answers[i];
							document.getElementsByClassName("answers_"+i)[0].id = i;
						}
						document.getElementsByClassName("question_container")[0].className += " slide-in-bottom";
					}
				}
			}
		}
	}

	//Submit selection answer of question to database and check if correct.
	function validateQuestion(question_id,potential_answer,end,amount_of_questions) {
		var answer_return, httpRequest;
		var user_id = readCookie('token');
		checkIntroCode(readCookie('code'));
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		questions_answered.push(question_id);
		httpRequest.open('GET','controller.php?function=validateAnswer&question_id='+question_id+'&answer='+potential_answer+'&group_id='+glob_group_id+'&token='+user_id);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					document.getElementsByClassName("chosen_container")[0].style.display="none";
					//console.log(answer_return);
					if (answer_return == "correct") {
						local_score++;
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
				if (end == "true") endGame(local_score,amount_of_questions);
			}
		}
	}

	//Fill questions trigger
	function alertContents(answer_return) {
		if (answer_return == "There was a problem with the request.") {
			//console.log("Error! -There was a problem with the request.");
		} else {
			fillQuestions();
		}
	}

	//Last question answered and show final score and check if alone or group
	function endGame(local_score,amount_of_questions) {
		console.log("ENDGAME SCORE "+local_score);
		document.getElementsByClassName("chosen_container")[0].style.display="none";
		emptyQuestionAnswers();
		var answer_return, httpRequest;
		var token = readCookie('token');
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getScoreSingleUser&group_id='+glob_group_id+'&token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					if (answer_return == "" || answer_return == undefined) {
						//console.log(local_score);
						showFinalScoreGroup(local_score,amount_of_questions);
					} else {
						showFinalScoreGroup(answer_return,amount_of_questions);
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}

		finishUser();
		//location.reload(-1);
	}

	//Send to database if user is finished
	function finishUser() {
		var answer_return, httpRequest;
		var token = readCookie('token');
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=finishUser&group_id='+glob_group_id+'&token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	var users_create_group_selected = [];
	var check_new_group_state = false;

	//Get all the users with you as groupleader.
	function getAllUsersCreateGroupList() {
		var answer_return, httpRequest;
		users_create_group_selected = [];
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getAllUsersCreateGroupList&session_token='+readCookie('token'));
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					if (document.getElementsByClassName("checkbox_users").length == 0) {
						document.getElementById("creategroup").style.display="none";
					} else {
						document.getElementById("creategroup").style.display="block";
					}
					if (document.getElementsByClassName("checkbox_users").length > 1) {
						document.getElementsByClassName("user_group_selection_item")[0].style.display="block";
					} else {
						document.getElementsByClassName("user_group_selection_item")[0].style.display="none";
					}
					if (document.getElementsByClassName("checkbox_users")[0] != undefined) {
						if (document.getElementById("user_group_check_-1").checked == true) {
							for (var i = 0; i < document.getElementsByClassName("checkbox_users").length; i++) {
								document.getElementsByClassName("checkbox_users")[i].checked = true;
							}
							check_new_group_state = true;
						} else if (document.getElementById("user_group_check_-1").checked == false && check_new_group_state == true) {
							users_create_group_selected = [];
							for (var i = 0; i < document.getElementsByClassName("checkbox_users").length; i++) {
								document.getElementsByClassName("checkbox_users")[i].checked = false;
							}
							check_new_group_state = false;
						}
						for (var i = 0; i < document.getElementsByClassName("checkbox_users").length; i++) {
							console.log(document.getElementsByClassName("checkbox_users").length);
							if (document.getElementsByClassName("checkbox_users")[i].checked) {
								users_create_group_selected.push(document.getElementsByClassName("checkbox_users")[i].id.split("_")[3]);
							}
						}
					}
					document.getElementsByClassName("users_group_selection_item_container")[0].innerHTML = "";
					answer_return = httpRequest.responseText;
					user_items = answer_return.split("|");
					users_selected = users_create_group_selected;
					for(var i = 0; i < user_items.length-1; i++) {
						if (user_items[i] != "") {
							var user_id = user_items[i].split("=")[0];
							var user = user_items[i].split("=")[1].split(":")[0];
							var d = new Date();
							var timer_get = user_items[i].split("=")[1].split(":")[1];
							var current_ping_time = d.getTime();

							var display = "block";
							if ((current_ping_time-timer_get) > 15000) {
								display = "none";
								setTimeOut(user_id);
							}

							//console.log(user,current_ping_time-timer_get);

							if (display == "block") {
								if (users_create_group_selected.includes(user_id)) {
									document.getElementsByClassName("users_group_selection_item_container")[0].innerHTML += '<div class="user_group_selection_item"><input type="checkbox" class="checkbox_users" id="user_group_check_'+user_id+'" checked><p id="user_group_'+user_id+'">'+user+'</p></div>';
								} else {
									document.getElementsByClassName("users_group_selection_item_container")[0].innerHTML += '<div class="user_group_selection_item"><input type="checkbox" class="checkbox_users" id="user_group_check_'+user_id+'"><p id="user_group_'+user_id+'">'+user+'</p></div>';
								}
							}
						}
					}
					//alertContents(answer_return);
				} else {
					answer_return = 'There was a problem with the request.';
					//alertContents(answer_return);
				}
			}
			delay(function(){
				getAllUsersCreateGroupList();
				//console.log("Fired function");
			}, 100 );
		}
	}

	function fillAloneCategoriesContent() {
		checkIntroCode(readCookie('code'));
		document.getElementsByClassName("alone_select_categories")[0].innerHTML = "Loading..";
		document.getElementsByClassName("categories_group_selection_container")[0].innerHTML = "";

		if(readCookie('age') != null) {
			document.getElementById("age_alone").value = readCookie('age');
		}

		var answer_return, httpRequest;
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getCategories');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					document.getElementsByClassName("alone_select_categories")[0].innerHTML = "";
					answer_return = httpRequest.responseText;
					category_items = answer_return.split("|");
					for(var i = 0; i < category_items.length-1; i++) {
						if (category_items[i] != "") {
							var category_id = category_items[i].split("=")[0];
							var category = category_items[i].split("=")[1];
							document.getElementsByClassName("alone_select_categories")[0].innerHTML += '<div class="categories_alone_selection_item"><input type="checkbox" id="categories_alone_check_'+category_id+'" checked><p id="categories_alone_'+category_id+'">'+category+'</p></div>';
						}
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

	function fillGroupCategoriesContent() {
		document.getElementsByClassName("alone_select_categories")[0].innerHTML = "";
		document.getElementsByClassName("categories_group_selection_container")[0].innerHTML = "";

		var answer_return, httpRequest;
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=getCategories');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					category_items = answer_return.split("|");
					for(var i = 0; i < category_items.length-1; i++) {
						if (category_items[i] != "") {
							//console.log();
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
}

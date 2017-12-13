window.onload = function() {

	window.onbeforeunload = function() {
		setWaitingToFalse();
		exitAllGroups();
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
	const username = readCookie('name');

	checkUsername(username,"check");

	if (readCookie('token') != null) {
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="none";
		setWaitingToFalse();
		exitAllGroups();
	}

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
		createCookie(name,'=; Max-Age=0');
	}

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

	document.getElementById("alone").onclick = function() {
		glob_group_id = -1;
		local_score = 0;
		questions_answered = [];
		document.getElementsByClassName("alone_select_categories_container")[0].style.display="none";
		fillQuestions();
	}

	document.getElementById("categories_alone").onclick = function() {
		document.getElementsByClassName("explain_container")[0].style.display="none";
		document.getElementsByClassName("alone_select_categories_container")[0].style.display="block";
		fillAloneCategoriesContent();
	}

	document.getElementById("pre_alone").onclick = function() {
		document.getElementById("start_menu").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_alone").style.display="block";
		document.getElementsByClassName("back_to_start_button")[0].style.display="block";
		document.getElementById("alone").style.display="block";
		document.getElementById("categories_alone").style.display="block";
		hideAllLogosExceptPara(2);
	}

	document.getElementById("explain").onclick = function() {
		document.getElementById("start_menu").style.display="none";
		document.getElementById("explain_menu").style.display="block";
	}

	document.getElementById("explain_alone_button").onclick = function() {
		document.getElementById("explain_menu").style.display="none";
		document.getElementById("categories_alone").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_alone").style.display="block";
		hideAllLogosExceptPara(2);
	}

	document.getElementById("explain_group_button").onclick = function() {
		document.getElementById("explain_menu").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_group").style.display="block";
		hideAllLogosExceptPara(3);
	}

	document.getElementById("explain_part_button").onclick = function() {
		document.getElementById("explain_menu").style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_part").style.display="block";
		hideAllLogosExceptPara(1);
	}

	document.getElementsByClassName("back_to_explain_button")[0].onclick = function() {
		document.getElementsByClassName("alone_select_categories_container")[0].style.display="none";
		document.getElementsByClassName("explain_container")[0].style.display="block";
		document.getElementById("explain_alone").style.display="block";
	}

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

	document.getElementById("chosen_username_back").onclick = function() {
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="block";
		document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
		document.getElementById("leadercode_title").style.display="block";
		document.getElementById("leadercode").style.display="block";
		document.getElementById("chosen_username").style.display="block";
	}

	document.getElementById("play_group").onclick = function() {
		document.getElementById("start_menu").style.display="none";
		document.getElementsByClassName("pre_new_user_prompt_container")[0].style.display="block";
		document.getElementsByClassName("alone_select_categories")[0].innerHTML = "";
		if (readCookie('name') != null) {
			document.getElementById("user_chosen_yes").style.display="none";
			document.getElementById("user_chosen_no").style.display="none";
			document.getElementById("admin_code_title").innerHTML="";
			document.getElementById("pre_new_user_prompt_text").innerHTML = "Welkom terug: "+readCookie('name');
			document.getElementById("user_chosen_logout").style.display="block";
			checkAdmin(readCookie('token'));
		} else {
			document.getElementById("pre_new_user_prompt_text").innerHTML = "Welkom";
			document.getElementById("user_chosen_logout").style.display="none";
		}
	}

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

	document.getElementById("reload").onclick = function() {
		console.log("reload");
		window.location.reload();
	}

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

	document.getElementById("chosen_new_group").onclick = function() {
		document.getElementsByClassName("lobby_admin")[0].style.display="none";
		document.getElementsByClassName("create_group_container")[0].style.display="block";
		setWaitingToFalse();
		fillGroupCategoriesContent();
		getAllUsersCreateGroupList();
	}

	document.getElementById("exit_group").onclick = function() {
		exitAllGroups();
	}

	for(var i = 0; i < document.getElementsByClassName("chosen_menu_group").length; i++) {
		document.getElementsByClassName("chosen_menu_group")[i].onclick = function() {
			getNewUserInterval = 0;
			exitAllGroups();
			setWaitingToTrue();
			stopRequestingLobbyGroups = 0;
			document.getElementsByClassName("lobby_container")[0].style.display="block";
			document.getElementsByClassName("create_group_container")[0].style.display="none";
			document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
			document.getElementsByClassName("lobby_admin")[0].style.display="block";
			getGroups();
		}
	}

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

	document.getElementById("creategroup").onclick = function() {
		var group_name = document.getElementById("groupname").value;
		document.getElementById("creategroup").style.display="none";
		var categories_selected = [];

		if(group_name.length > 1) {
			document.getElementById("groupname").style.border = "none";
			for (var i = 0; i < category_items.length-1; i++) {
				if(document.getElementById("categories_group_check_"+i).checked) {
					categories_selected.push(i);
				}
			}
			//console.log(group_name,group_code,categories_selected);
			var httpRequest = new XMLHttpRequest();
			if(!httpRequest) return false;
			httpRequest.onreadystatechange = validate;
			httpRequest.open('GET','controller.php?function=createGroup&group_name='+group_name+'&categories='+categories_selected+'&users='+users_selected+'&group_admin='+readCookie('token'));
			httpRequest.send();
			function validate() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						answer_return = httpRequest.responseText;
						console.log(answer_return);
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("create_group_container")[0].style.display="none";
						document.getElementsByClassName("multiplayer_lobby_container")[0].style.display="none";
						document.getElementsByClassName("lobby_admin")[0].style.display="block";
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

	document.getElementById("user_chosen_logout").onclick = function() {
		eraseCookie('name');
		eraseCookie('token');
		location.reload(-1);
	}

	document.getElementById("back_to_login").onclick = function() {
		location.reload(-1);
	}

	document.getElementById("user_chosen_menu").onclick = function() {
		location.reload(-1);
	}

	document.getElementById("user_chosen_menu").onclick = function() {
		location.reload(-1);
	}

	document.getElementById("back_to_login_admin").onclick = function() {
		location.reload(-1);
	}


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
			if (temp_name.length > 1 && temp_name.length > 1 && surname.length > 1 && age_d.length > 1 && age_m.length > 1 && age_y.length > 1) {
				var temp_age = age_d+'-'+age_m+'-'+age_y;
				var age = getAge(temp_age);
				checkUsername(temp_name,'create',leadercode,leadername,leadersurname,surname,temp_age,age,-1);
				//console.log(temp_name,'check',surname,temp_age,age,-1);
			}
		} else if (new_user == 0) {
			if (name.length > 1 && surname.length > 1 && age_d.length > 1 && age_m.length > 1 && age_y.length > 1) {
				//console.log("Wachtend op groepsindeling door beheerder.");
			}
		}
	}

	function sendPlayPingToUsers(id) {
		var token = readCookie('token');
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','controller.php?function=playPing&token='+token+'&group_id='+id);
		httpRequest.send();

		//alert("sending..");

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
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

	function hideQandAShowMainMenu() {
		document.getElementsByClassName("question_container")[0].style.display="none";
	}

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
					document.getElementById("admin_code_title").innerHTML="Je bent ingelogd als deelnemer. <br> Je beheerder is: "+answer_return;
				}
			}
		}
	}

	function checkAdmin(token) {
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
					console.log(answer_return);
					if (answer_return == "is_admin") {
						document.getElementById("user_chosen_yes").style.display="block";
						document.getElementById("user_chosen_yes").style.width="100%";
						document.getElementById("admin_code_title").innerHTML="Je bent ingelogd als beheerder";
					} else {
						document.getElementById("user_chosen_no").style.display="block";
						document.getElementById("user_chosen_no").style.width="100%";
						document.getElementById("admin_code_title").innerHTML="";
						document.getElementById("admin_code_title").innerHTML="Je bent ingelogd als deelnemer";
						getAdminByUserToken(readCookie('token'));
					}
				}
			}
		}
	}

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
					console.log(answer_return);
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
					if (frontadmin == 1) admin_element = 1;
					document.getElementsByClassName("lobby_item_list")[admin_element].innerHTML = "";
					answer_return = httpRequest.responseText;
					//console.log(answer_return);
					var group_items = answer_return.split("|");
					for(var i = 0; i < group_items.length-1; i++) {
						if (group_items[i] != "") {
							var group_id = group_items[i].split("=")[0];
							var group = group_items[i].split("=")[1];
							document.getElementsByClassName("lobby_item_list")[admin_element].innerHTML += '<div class="lobby_item" id="lobby_'+group_id+'">'+group+'</div>';
						}
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
					reverseChildNodes(document.getElementsByClassName('lobby_item_list')[admin_element]);
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
				}, 100 );
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
						if (document.getElementsByClassName("kick").length > 0) {
							for(var i = 0; i < document.getElementsByClassName("kick").length; i++) {
								document.getElementsByClassName("kick")[i].onclick = function() {
									kickUser(this.id.split("_")[2]);
									document.getElementsByClassName("multiplayer_name_list")[0].removeChild(this);
								}
							}
						}
						document.getElementById("play").onclick = function() {
							sendPlayPingToUsers(id);
							document.getElementById("exit_group").style.display="none";
							document.getElementById("play").style.display="none";
						}
						checkLobbyStatus(readCookie('token'),id);
						delay(function(){
							getGroupUsers(id);
						}, 100 );
					} else {
						answer_return = 'There was a problem with the request.';
					}
				}
			}
		}
	}

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

	function emptyQuestionAnswers() {
		document.getElementsByClassName("question")[0].innerHTML = "";
		for(var i = 0; i < 4; i++) {
			document.getElementsByClassName("answers_"+i)[0].innerHTML = "";
		}
	}

	function showFinalScoreGroup(score,amount_of_questions) {
		document.getElementsByClassName("question_container")[0].style.display="none";
		document.getElementsByClassName("category_container")[0].style.display="none";
		document.getElementsByClassName("final_score_container")[0].style.display="block";
		if (glob_group_id == -1 && frontadmin == 0) {
			console.log("show final score: "+score);
			document.getElementsByClassName("inner_pos_score")[0].innerHTML = score+" van de "+amount_of_questions+" punten";
		} else if (glob_group_id != -1 && frontadmin == 0) {
			document.getElementsByClassName("inner_pos_score")[0].innerHTML = score+" van de "+amount_of_questions+" punten";
		} else if (glob_group_id != -1 && frontadmin == 1) {
			showAdminScores(amount_of_questions);
		}
	}

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
					for(var i = 0; i < user_scores.length; i++) {
						if(user_scores[i] != "") {
							document.getElementsByClassName("inner_pos_score")[0].innerHTML += "<div>"+user_scores[i]+" / "+amount_of_questions+"</div>";
						}
						//console.log(user_scores[i]);
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
				if (stopRequestingLobbyEndScores == 0) {
					delay(function(){
						showAdminScores(amount_of_questions);
						//console.log("ping");
					}, 100 );
				}
			}
		}
	}

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

	function promptOverlay(text) {
		console.log(text);
		document.getElementsByClassName("prompt_overlay")[0].style.display="block";
		document.getElementById("prompt_text").innerHTML=text;
		document.getElementById("prompt_button").onclick = function() {
			document.getElementsByClassName("prompt_overlay")[0].style.display="none";
		};
	}

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
					} else if (answer_check == "regular") {
						document.getElementsByClassName("new_user_prompt_container")[0].style.display="none";
						document.getElementsByClassName("lobby_container")[0].style.display="block";
						document.getElementsByClassName("lobby_admin")[0].style.display="none";
						document.getElementsByClassName("lobby")[0].style.display="block";
						stopRequestingLobbyGroups = 0;
						getGroups();

						createCookie('name',temp_name+' '+surname,age);
						createCookie('token',session_token);
					}
				} else {
					answer_return = 'There was a problem with the request.';
				}
			}
		}
	}

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

	function fillQuestions() {
		var answer_return, httpRequest;
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) return false;
		httpRequest.onreadystatechange = validate;

		var temp_local_cats = "";

		if (glob_group_id == -1) {
			var count = 0;
			for (var i = 0; i < category_items.length-1; i++) {
				if(document.getElementById("categories_alone_check_"+i).checked) {
					if (i != 0 && count != 0) temp_local_cats += ",";
					count++;
					temp_local_cats += i;
				}
			}
			console.log(temp_local_cats);
		}

		httpRequest.open('GET','controller.php?local_alone_categories='+temp_local_cats+'&group_id='+glob_group_id+'&questions_answered='+questions_answered+'&function=getCatAndQuestions');
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

							console.log(amount_of_questions);
						}
						if(category_questions[question_progression] != undefined) {
							current_question_id = category_questions[question_progression];
							fillContent(current_question_id);
						}
						document.getElementsByClassName("category")[0].innerHTML = category_name;

						if (!is_same_category) {
							categoryPrompt(category_name);
						}
					}

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

								if (category_progression == categories_with_questions.length-1) {
									document.getElementsByClassName("chosen_container")[0].style.display="none";
									validateQuestion(current_question_id,potential_answer,"true",amount_of_questions);
									document.getElementsByClassName("category_prompt_overlay")[0].outerHTML='';
									//endGame(local_score);
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
		function fillContent(question_id) {
			var answer_return, httpRequest;
			var user_id = readCookie('token');
			httpRequest = new XMLHttpRequest();
			if(!httpRequest) return false;
			httpRequest.onreadystatechange = validate;
			httpRequest.open('GET','controller.php?function=getQuestionWithAnswers&question_id='+question_id);
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

	function validateQuestion(question_id,potential_answer,end,amount_of_questions) {
		var answer_return, httpRequest;
		var user_id = readCookie('token');
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

	function alertContents(answer_return) {
		if (answer_return == "There was a problem with the request.") {
			//console.log("Error! -There was a problem with the request.");
		} else {
			fillQuestions();
		}
	}

	function endGame(local_score,amount_of_questions) {
		//console.log("ENDGAME SCORE "+local_score);
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

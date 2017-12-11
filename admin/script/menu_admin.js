window.onload = function() {

    if (readCookie("session_token") != null) {
        console.log(readCookie("session_token"));
        backToMain();
    }

    document.getElementById("login").onclick = function() {
        login();
    }

    document.getElementById("logout").onclick = function() {
        logout();
    }

    document.getElementById("generate_code").onclick = function() {
        validateAdmin();
        randomCharacters();
    }

    document.getElementById("to_code_menu").onclick = function() {
        validateAdmin();
        toCodeMenu();
    }

    document.getElementById("show_edit_button").onclick = function() {
        document.getElementById("show_edit_button").style.display="none";
        validateAdmin();
        showEdit();
    }

    document.getElementById("remove_prompt").onclick = function() {
        hidePrompt();
    }

    document.getElementById("to_app_menu").onclick = function() {
        validateAdmin();
        toAppMenu();
    }

    document.getElementById("to_admin_menu").onclick = function() {
        validateAdmin();
        toAdminMenu();
    }

    document.getElementById("to_code_menu_admin").onclick = function() {
        validateAdmin();
        toCodeMenu();
    }

    document.getElementById("register_admin").onclick = function() {
        validateAdmin();
        createAdmin();
    }

    for(var i = 0; i < document.getElementsByClassName("return_to_main").length; i++) {
        document.getElementsByClassName("return_to_main")[i].onclick = function() {
            backToMain();
        }
    }

    for(var i = 0; i < document.getElementsByClassName("hide").length; i++) {
        document.getElementsByClassName("hide")[i].onclick = function() {
            hideOverlay();
        }
    }

    function hideAllMenuItems() {
        for(var i = 0; i < document.getElementsByClassName("inner_container").length; i++) {
            document.getElementsByClassName("inner_container")[i].style.display="none";
        }
    }

    function showLoadingOverlay() {
        document.getElementsByClassName("overlay_container")[0].style.display="block";
        document.getElementById("loading").style.display="block";
        document.getElementById("prompt").style.display="none";
        document.getElementById("add_cat").style.display="none";
        document.getElementById("remove_question").style.display="none";
    }

    function hideOverlay() {
        document.getElementsByClassName("overlay_container")[0].style.display="none";
    }

    function toCodeMenu() {
        hideAllMenuItems();
        randomCharacters();
        document.getElementById("code_menu").style.display="block";
    }

    function toAppMenu() {
        hideAllMenuItems();
        document.getElementById("app_menu").style.display="block";
    }

    function toAdminMenu() {
        hideAllMenuItems();
        document.getElementById("admin_menu").style.display="block";
    }

    function login() {
        hideAllMenuItems();
        var username = document.getElementById("gebruikersnaam").value;
        var password = document.getElementById("wachtwoord").value;
        loginAjax(username,password);
    }

    function logout() {
        hideAllMenuItems();
        eraseCookie("session_token");
        var token = readCookie("session_token");
        console.log("remove session", token);
        document.getElementById("login_menu").style.display="block";
    }

    function backToMain() {
        hideAllMenuItems();
        validateAdmin();
        document.getElementById("main_menu").style.display="block";
    }

    function showPrompt(text,add) {
        document.getElementsByClassName("overlay_container")[0].style.display="block";
        if (add == false) {
            document.getElementById("loading").style.display="none";
            document.getElementById("prompt").style.display="block";
            document.getElementById("remove_question").style.display="none";
            document.getElementById("prompt_text").innerHTML=text;
        } else if (add == true) {
            document.getElementById("loading").style.display="none";
            document.getElementById("add_cat").style.display="block";
            document.getElementById("remove_question").style.display="none";
            document.getElementById("question_title").focus();
        } else {
            document.getElementById("loading").style.display="none";
            document.getElementById("add_cat").style.display="none";
            document.getElementById("prompt").style.display="none";
            document.getElementById("remove_question").style.display="block";
            document.getElementById("question_text").innerHTML=text;
        }
    }

    function hidePrompt() {
        document.getElementsByClassName("overlay_container")[0].style.display="none";
        document.getElementById("loading").style.display="none";
        document.getElementById("prompt").style.display="none";
        document.getElementById("add_cat").style.display="none";
    }

    function hideLoading() {
        if (document.getElementById("prompt").style.display != "block") {
            document.getElementsByClassName("overlay_container")[0].style.display="none";
            document.getElementById("loading").style.display="none";
        }
    }

    function showEdit() {
        if(document.getElementById("categories_container").style.display == "block") {
            document.getElementById("categories_container").style.display = "none";
        } else {
            document.getElementById("categories_container").style.display = "block"
        }
        getCategoriesQuestionsAnswers();
    }

    function addQuestionPrompt(category_id) {
        showPrompt("",true);
        for(var i = 0; i < 4; i++) {
            document.getElementsByClassName("checkbox_answer")[i].checked=false;
            document.getElementsByClassName("input_antwoord")[i].value="";
        }
        document.getElementById("question_title").value = "";
        document.getElementById("add_cat_button").onclick = function() {
            addQuestion(category_id);
        }
    }

    function addQuestion(category_id) {
        showLoadingOverlay();
        var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;

        var is_correct = 0;

        for(var i = 0; i < 4; i++) {
            if(document.getElementById("checkbox_"+i).checked) {
                is_correct = document.getElementById("checkbox_"+i).id;
                is_correct = is_correct.split("_")[1];
            }
        }

        var cat_id = category_id;
        var question = document.getElementById('question_title').value;
        var answer_0 = document.getElementById('answer_0').value;
        var answer_1 = document.getElementById('answer_1').value;
        var answer_2 = document.getElementById('answer_2').value;
        var answer_3 = document.getElementById('answer_3').value;

		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','../controller.php?function=addQuestion&session_token='+readCookie('session_token')+'&cat_id='+cat_id+'&question='+question+'&answer_0='+answer_0+'&answer_1='+answer_1+'&answer_2='+answer_2+'&answer_3='+answer_3+'&is_correct='+is_correct);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
                    answer_return = httpRequest.responseText;
                    console.log(answer_return);
                    hideLoading();
                    getCategoriesQuestionsAnswers();
                }
            }
        }
    }

    function removePrompt(question_title, question_id) {
        showPrompt(question_title,question_id);
        document.getElementById("remove_question_button").onclick = function() {
            removeQuestion(question_id);
        }
    }

    function removeQuestion(question_id) {
        showLoadingOverlay();
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;

        console.log(question_id);
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','../controller.php?function=removeQuestion&session_token='+readCookie('session_token')+'&question_id='+question_id);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
                    answer_return = httpRequest.responseText;
                    console.log(answer_return);
                    hideLoading();
                    getCategoriesQuestionsAnswers();
                }
            }
        }
    }

    function getCategoriesQuestionsAnswers() {
        showLoadingOverlay();
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','../controller.php?function=getCategoriesQuestionsAnswers&session_token='+readCookie('session_token'));
		httpRequest.send();

        var edit_container = document.getElementById("categories_container");
        edit_container.innerHTML = "";

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
                    hideLoading();
					answer_return = httpRequest.responseText;
                    var categories = answer_return.split("&");

                    console.log(answer_return);

                    for (var i = 0; i < categories.length; i++) {
                        var content = "";
                        var questions = categories[i].split("*");

                        content += "<div class='category' id='category_"+questions[0].split("=")[0]+"'><p>"+questions[0].split("=")[1]+"</p>";
                        content += "<div class='dropdown_button'>+</div>";
                        content += "<div style='display:none;' class='add_button'>Vraag toevoegen</div>";

                        for (var j = 1; j < questions.length; j++) {
                            console.log(questions[j]);

                            if (questions[j][0] != "|") {
                                content += "<div class='question' style='display:none;' id='question_"+questions[j].split(";")[0].split("=")[0]+"'><p>"+questions[j].split(";")[0].split("=")[1]+"</p>";
                                content += "<div class='dropdown_button_question'>+</div>";
                                content += "<div class='remove_button'>X</div>";
                            }
                            var answers = questions[j].split("|");
                            console.log(answers);
                            for (var k = 1; k < answers.length; k++) {
                                if (answers[k] != "") {
                                    if (answers[k].split("=")[1].split(":")[1] == "1") {
                                        content += "<div style='display:none;' class='answer correct'><p>"+answers[k].split("=")[1].split(":")[0]+"</p></div>";
                                    } else {
                                        content += "<div style='display:none;' class='answer'><p>"+answers[k].split("=")[1].split(":")[0]+"</p></div>";
                                    }
                                }
                            }
                            content += "</div>";
                        }
                        content += "</div>";
                        edit_container.innerHTML += content;
                    }

                    for(var i = 0; i < document.getElementsByClassName("remove_button").length; i++) {
                        document.getElementsByClassName("remove_button")[i].onclick = function (e) {
                            var question_id = e.srcElement.parentNode.id.split("_")[1];
                            var question_title = e.srcElement.parentNode.childNodes[0].innerHTML;
                            removePrompt(question_title,question_id);
                        }
                    }

                    for (var i = 0; i < document.getElementsByClassName("add_button").length; i++) {
                        document.getElementsByClassName("add_button")[i].onclick = function (e) {
                            var category_id = e.srcElement.parentNode.id.split("_")[1]
                            addQuestionPrompt(category_id);
                        }
                    }

                    for (var i = 0; i < document.getElementsByClassName("dropdown_button_question").length; i++) {
                        document.getElementsByClassName("dropdown_button_question")[i].onclick = function (e) {
                            for (var k = 0; k < e.srcElement.parentNode.children.length; k++) {
                                if (e.srcElement.parentNode.children[k].className == "answer" || e.srcElement.parentNode.children[k].className == "answer correct") {
                                    if (e.srcElement.parentNode.children[k].style.display == "none") {
                                        e.srcElement.innerHTML = "-";
                                        e.srcElement.parentNode.children[k].style.display = "block";
                                    } else {
                                        e.srcElement.innerHTML = "+";
                                        e.srcElement.parentNode.children[k].style.display = "none";
                                    }
                                }
                            }
                        }
                    }

                    for (var i = 0; i < document.getElementsByClassName("dropdown_button").length; i++) {
                        document.getElementsByClassName("dropdown_button")[i].onclick = function (e) {
                            for (var k = 0; k < e.srcElement.parentNode.children.length; k++) {
                                if (e.srcElement.parentNode.children[k].className == "question" || e.srcElement.parentNode.children[k].className == "add_button") {
                                    if (e.srcElement.parentNode.children[k].style.display == "none") {
                                        e.srcElement.innerHTML = "-";
                                        e.srcElement.parentNode.children[k].style.display = "block";
                                    } else {
                                        e.srcElement.innerHTML = "+";
                                        e.srcElement.parentNode.children[k].style.display = "none";
                                    }
                                }
                            }
                        }
                    }

				} else {
					answer_return = 'Er is een fout opgetreden';
				}
			}
		}
    }

    function randomCharacters() {
        showLoadingOverlay();
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
        //var token = readCookie('token');
        var token = "";
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','../controller.php?function=randomCharacters&token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
                    //console.log(answer_return);
					if(answer_return != "no_admin") {
                        //console.log(answer_return);
                        hideLoading();
                        document.getElementById("unique_code").value = answer_return;
                        document.getElementById("register_unique_code").value = answer_return;
					} else {
                        location_reload(-1);
                    }
				} else {
					answer_return = 'Er is een fout opgetreden';
				}
			}
		}
    }

    function createAdmin() {
        showLoadingOverlay();
        var temp_name = document.getElementById("voornaam").value;
        var surname = document.getElementById("achternaam").value;
        var age_d = document.getElementById("age_d").value;
		var age_m = document.getElementById("age_m").value;
		var age_y = document.getElementById("age_y").value;
        var temp_age = age_d+'-'+age_m+'-'+age_y;
        var age = getAge(temp_age);
        var leadercode = document.getElementById("register_unique_code").value;

        var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
        //var token = readCookie('token');
        var token = "";
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','../controller.php?user_name='+temp_name+'&surname='+surname+'&temp_age='+temp_age+'&age='+age+'&leadercode='+leadercode+'&function=createAdmin');
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
                    hideLoading();
					if(answer_return == "success") {
                        validateAdmin();
                        randomCharacters();

                        document.getElementById("admin_menu").style.display="none";
                        document.getElementById("code_menu").style.display="block";

                        showPrompt("Groepsleider aangemaakt.<br> De gegevens zijn: <br><br> Voornaam: <br> "+temp_name+" <br><br> Achternaam: <br> "+surname+" <br><br> Geboortedatum: <br> "+age_d+"-"+age_m+"-"+age_y+" <br><br> Code:<br> "+leadercode,false);

                        document.getElementById("voornaam").value = "";
                        document.getElementById("achternaam").value = "";
                        document.getElementById("age_d").value = "";
                        document.getElementById("age_m").value = "";
                        document.getElementById("age_y").value = "";
					} else {
                        validateAdmin();
                        showPrompt("Er is een fout opgetreden.",false);
                        document.getElementById("voornaam").value = "";
                        document.getElementById("achternaam").value = "";
                        document.getElementById("age_d").value = "";
                        document.getElementById("age_m").value = "";
                        document.getElementById("age_y").value = "";
                    }
				} else {
					answer_return = 'Er is een fout opgetreden';
				}
			}
		}
    }

    function validateAdmin() {
        var httpRequest = new XMLHttpRequest();
		var answer_return;
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
        var token = readCookie("session_token");
		httpRequest.open('GET','../controller.php?function=validateAdmin&token='+token);
		httpRequest.send();

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
					console.log(answer_return);
					if (answer_return != "is_admin") {
                        hideAllMenuItems();
                        logout();
						//location.reload(-1);
					}
				}
			}
		}
    }

    function loginAjax(username,password) {
        showLoadingOverlay();
		var httpRequest = new XMLHttpRequest();
		if(!httpRequest) return false;
		httpRequest.onreadystatechange = validate;
		httpRequest.open('GET','../controller.php?function=loginAjax&username='+username+'&password='+password);
		httpRequest.send();

        console.log(username,password);

		function validate() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					answer_return = httpRequest.responseText;
                    console.log(answer_return);
					if(answer_return != "") {
                        hideLoading();
                        document.getElementById("main_menu").style.display="block";
                        createCookie("session_token",answer_return);
                        console.log(readCookie("session_token"));
						//alert("goood");
						//console.log("Sent play request to all users in this group.");
					} else {
                        //console.log("nope");
                        document.getElementById("login_menu").style.display="block";
                        hideLoading();
                    }
				} else {
					answer_return = 'Er is een fout opgetreden';
				}
			}
		}
	}

    var age_d_container = document.getElementById("age_d");
	var age_m_container = document.getElementById("age_m");
	var age_y_container = document.getElementById("age_y");

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
        console.log("GO");
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
			}
		}
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

}

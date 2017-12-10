window.onload = function() {

    document.getElementById("login").onclick = function() {
        login();
    }

    document.getElementById("logout").onclick = function() {
        logout();
    }

    document.getElementById("to_code_menu").onclick = function() {
        toCodeMenu();
    }

    document.getElementById("to_app_menu").onclick = function() {
        toAppMenu();
    }

    document.getElementById("to_admin_menu").onclick = function() {
        toAdminMenu();
    }

    document.getElementById("to_code_menu_admin").onclick = function() {
        toCodeMenu();
    }

    document.getElementById("register_admin").onclick = function() {
        showLoadingOverlay();
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
    }

    function hideOverlay() {
        document.getElementsByClassName("overlay_container")[0].style.display="none";
    }

    function toCodeMenu() {
        hideAllMenuItems();
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
        document.getElementById("main_menu").style.display="block";
    }

    function logout() {
        hideAllMenuItems();
        document.getElementById("login_menu").style.display="block";
    }

    function backToMain() {
        hideAllMenuItems();
        document.getElementById("main_menu").style.display="block";
    }

}

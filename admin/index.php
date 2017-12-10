<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta http-equiv="pragma" content="no-cache" />

        <title>Admin - Hempensermeerpolder App</title>

        <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
        <link rel="stylesheet" href="css/stylesheet.css">
        <script type="text/javascript" src="script/menu_admin.js"></script>
    </head>
    <body>
        <div class="header">
            <img src="../assets/img/logo_1.png" class="logo">
        </div>
        <div class="overlay_container">
            <div class="dark_inner_container">
                <div id="loading">
                    <img src="../assets/img/loader.gif" class="prompt_img">
                    <h1 class="prompt_title">Loading..</h1>
                </div>
                <div id="prompt">
                    <h1 class="prompt_title" id="prompt_text">Test text</h1>
                    <div class="button sub_button return unselectable hide">Terug</div>
                </div>
            </div>
        </div>
        <div class="container">
            <h3 class="text-center">CMS Hempensermeerpolder App</h3>

            <div class="inner_container" id="login_menu">
                <h3 class="sub_title">Login</h3>
                <input type="text" class="login_input" placeholder="Gebruikersnaam">
                <input type="password" class="login_input" placeholder="Wachtwoord">
                <div class="button sub_button unselectable" id="login">Inloggen</div>
            </div>

            <div class="inner_container" id="main_menu">
                <h3 class="sub_title">Selecteer een beheersoptie</h3>
                <div class="button unselectable" id="to_code_menu">Code generen</div>
                <div class="button unselectable" id="to_app_menu">App beheren</div>
                <div class="button sub_button return unselectable" id="logout">Uitloggen</div>
            </div>

            <div class="inner_container" id="code_menu">
                <h3 class="sub_title">Code generen</h3>
                <input class="code_input" value="0000" readonly>
                <div class="button unselectable" id="generate_code">Genereer nieuwe code</div>
                <div class="button unselectable" id="to_admin_menu">Registreer beheerder</div>
                <div class="button sub_button return unselectable return_to_main">Terug naar menu</div>
                <div class=""></div>
            </div>

            <div class="inner_container" id="admin_menu">
                <h3 class="sub_title">Registreer beheerder</h3>
                <input type="text" class="code_dn_input" placeholder="Voornaam">
                <input type="text" class="code_dn_input" placeholder="Achternaam">
                <div class="age_container">
                    <input type="text" class="code_age_input" placeholder="Dag">
                    <input type="text" class="code_age_input" placeholder="Maand">
                    <input type="text" class="code_age_input" placeholder="Jaar">
                </div>
                <input type="text" class="code_dn_input" placeholder="Code" value="0000" readonly>
                <div class="button sub_button unselectable" id="register_admin">Registreer beheerder</div>
                <div class="button sub_button return unselectable" id="to_code_menu_admin">Terug</div>
                <div class=""></div>
            </div>

            <div class="inner_container" id="app_menu">
                <h3 class="sub_title">App beheren</h3>
                <div class="button unselectable">Categorieën, vragen en antwoorden</div>
                <div class="button unselectable">Gebruikers</div>
                <div class="button sub_button return unselectable return_to_main">Terug naar menu</div>
            </div>
        </div>
    </body>
</html>

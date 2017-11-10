<!DOCTYPE html>
<?php
    include 'controller.php';
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta http-equiv="pragma" content="no-cache" />

        <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
        <link rel="stylesheet" href="assets/icons/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/stylesheet.css">
        <script type="text/javascript" src="script/engine/three.min.js"></script>
        <script type="text/javascript" src="script/engine/ColladaLoader2.js"></script>
    </head>
    <body>
        <div class="main_content">
            <div class="dark_overlay lobby_container">
                <div class="create_group_container">
                    <h1>Hoe wil je de groep noemen?</h1>
                    <input id="groupname" type="text">
                    <h1>Voer een wachtwoord in om de eindresultaten op te halen.</h1>
                    <input id="groupcode" type="text">
                    <h1>Uit welke categorien moeten er vragen komen?</h1>
                    <div class="categories_group_selection_container">

                    </div>
                    <div class="chosen_button" id="creategroup">
                        <p>Groep aanmaken</p>
                    </div>
                    <div class="chosen_button chosen_menu_group">
                        <p>Terug naar menu</p>
                    </div>
                </div>
                <div class="lobby">
                    <h1>In welke groep zit je?</h1>
                    <div class="lobby_item_list">
                        <div class="lobby_item" id="lobby_0">Testgroepsnaam</div>
                    </div>
                    <div class="chosen_button" id="chosen_new_group">
                        <p>Nieuwe groep aanmaken</p>
                    </div>
                    <div class="chosen_button chosen_menu">
                        <p>Terug naar menu</p>
                    </div>
                </div>
            </div>
            <div class="dark_overlay new_user_prompt_container">
                <div class="new_user_prompt">
                    <h1>Wat is je naam?</h1>
                    <input id="username" type="text" name="username">
                    <div class="chosen_button" id="chosen_username">
                        <p>Doorgaan</p>
                    </div>
                </div>
            </div>
            <div class="dark_overlay about_container">
                <div class="about">
                    <div class="chosen_button chosen_menu">
                        <p>Terug naar menu</p>
                    </div>
                </div>
            </div>
            <div class="chosen_container">
                <div id="chosen_answer">
                    <p id="chosen_answer_question">Je gekozen antwoord is:</p>
                    <p id="chosen_answer_content">Gekozen antwoord</p>
                    <div class="chosen_button_container">
                        <div class="chosen_button" id="chosen_yes">
                            <p>Doorgaan</p>
                        </div>
                        <div class="chosen_button" id="chosen_no">
                            <p>Anders</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading_screen">
                <h1 class="vibrate-1">Loading..</h1>
                <h1 class="vibrate-1" id="debug"></h1>
            </div>
            <div class="logo_container">
                <img src="assets/img/logo.png" class="test_logo">
            </div>
            <div id="container"></div>
            <div class="main_menu_container slide-in-bottom">
                <div class="main_menu_item flip-in-hor-bottom" id="group">Groep</div>
                <div class="main_menu_item flip-in-hor-bottom" id="alone">Alleen</div>
                <div class="main_menu_item flip-in-hor-bottom" id="expl">Uitleg</div>
            </div>
            <div class="overlay correct">Goed!</div>
            <div class="overlay not_correct">Fout!</div>
            <div class="question_container">
                <div class="question"></div>
                <div class="answer" id="0"></div>
                <div class="answer" id="1"></div>
                <div class="answer" id="2"></div>
                <div class="answer" id="3"></div>
            </div>
            <div class="category_container">
                <div class="category_inner_container">
                    <div class="category_visual jumper"><h1 id="countdown">5</h1></div>
                    <div class="category_name">Spel starten..</div>
                </div>
            </div>
            <div class="final_score_container">
                <div class="pos_score">Eindscore komt hier</div>
                <div class="chosen_button chosen_menu">
                    <p>Terug naar menu</p>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="script/bird.js"></script>
    <script type="text/javascript" src="script/birds_engine.js"></script>
    <script type="text/javascript" src="script/main.js"></script>
    <script type="text/javascript" src="script/menu.js"></script>
</html>

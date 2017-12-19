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

        <title>Hempensermeerpolder App</title>

        <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
        <link rel="stylesheet" href="assets/icons/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/stylesheet.css">
        <script type="text/javascript" src="script/engine/three.min.js"></script>
        <script type="text/javascript" src="script/engine/SimplifyModifier.js"></script>
        <script type="text/javascript" src="script/engine/ColladaLoader2.js"></script>
    </head>
    <body>
        <div id="code_overlay">
            <div class="code_overlay_inner">
                <h1>Om de app te spelen heb je de code nodig.</h1>
                <input placeholder="Code" id="intro_code" type="text">
                <div id="intro_button">Doorgaan</div>
            </div>
        </div>
        <div class="category_prompt_overlay">
            <div class="category_prompt_overlay_inner">
                <img src="assets/img/geschiedenis.jpg" id="img_geschiedenis">
                <img src="assets/img/floraenfauna.jpg" id="img_floraenfauna">
                <img src="assets/img/polder.png" id="img_polder">
                <img src="assets/img/molen.jpg" id="img_molen">
                <h1 id="category_prompt_text"></h1>
            </div>
        </div>
        <div class="prompt_overlay">
            <div class="prompt_overlay_inner">
                <h1 id="prompt_text">Helloo</h1>
                <div id="prompt_button">
                    <p>Doorgaan</p>
                </div>
            </div>
        </div>
        <div class="super_main_content">
            <div class="main_content">
                <div class="dark_overlay multiplayer_lobby_container">
                    <div class="multiplayer_lobby_inner_container">
                        <h1 id="groupnametitle">Groepsnaam aan het laden..</h1>
                        <h1>Wachten tot iedereen in de groep zit</h1>
                        <div class="multiplayer_name_list">

                        </div>
                        <div class="chosen_button" id="play">
                            <p>Meespelen met deze groep en alle groepen laten spelen</p>
                        </div>
                        <div class="chosen_button chosen_menu_group" id="exit_group">
                            <p>Terug naar menu</p>
                        </div>
                    </div>
                </div>
                <div class="dark_overlay lobby_container">
                    <div class="create_group_container">
                        <h1>Hoe wil je de groep noemen?</h1>
                        <input id="groupname" type="text">
                        <h1>Van welke categorieën moeten er vragen komen?</h1>
                        <div class="categories_group_selection_container">
                            <div class="categories_group_selection_item_container">

                            </div>
                        </div>
                        <h1>Wie mogen er in de groep komen?</h1> <h4>Alleen gebruikers die zich in de wachtkamer bevinden komen in deze lijst.</h4>
                        <div class="users_group_selection_container">
                            <div class="user_group_selection_item" style="border: 2px solid #777777; width: 95%;">
                                <input type="checkbox" id="user_group_check_-1">
                                <p id="user_group_-1">Iedereen!</p>
                            </div>
                            <div class="users_group_selection_item_container">

                            </div>
                        </div>
                        <div class="chosen_button" id="creategroup">
                            <p>Groep aanmaken</p>
                        </div>
                        <div class="chosen_button chosen_menu_group">
                            <p>Terug naar lobby</p>
                        </div>
                    </div>
                    <div class="lobby">
                        <h1>Lobby</h1>
                        <h3>Je wordt door de groepsleider in een groep ingedeeld. De groep zie je automatisch in beeld verschijnen.</h3>
                        <div class="lobby_item_list">

                        </div>
                        <h3 id="username_show"></h3>
                        <div class="chosen_button" id="back_to_login">
                            <p>Terug naar menu</p>
                        </div>
                    </div>
                    <div class="lobby_admin">
                        <h1>Lobby</h1>
                        <h3 id="adminname_show"></h3>
                        <h3>Wachtende groepen:</h3>
                        <div class="lobby_item_list">

                        </div>
                        <div class="chosen_button" id="play_all">
                            <p>Alle wachtende groepen laten spelen</p>
                        </div>
                        <div class="chosen_button" id="chosen_new_group">
                            <p>Nieuwe groep aanmaken</p>
                        </div>
                        <h3 style="margin-top:40px;">Alle groepen, klik om scores te bekijken:</h3>
                        <div class="lobby_item_list">

                        </div>
                        <div class="chosen_button" id="back_to_login_admin">
                            <p>Terug naar menu</p>
                        </div>
                    </div>
                </div>
                <div class="dark_overlay pre_new_user_prompt_container">
                    <div class="pre_new_user_prompt">
                        <h1 id="pre_new_user_prompt_text"></h1>
                        <h1 id="admin_code_title">Als beheerder heb je een code nodig</h1>
                        <div class="chosen_button_container">
                            <div class="chosen_button" id="user_chosen_yes">
                                <p>Beheerder</p>
                            </div>
                            <div class="chosen_button" id="user_chosen_no">
                                <p>Deelnemer</p>
                            </div>
                            <div class="chosen_button" id="user_chosen_logout">
                                <p>Uitloggen</p>
                            </div>
                            <div class="chosen_button" id="user_chosen_menu">
                                <p>Terug naar menu</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dark_overlay new_user_prompt_container">
                    <div class="new_user_prompt">
                        <h1 id="new_user_prompt_title">Inloggen als beheerder</h1>
                        <h1>Voornaam</h1>
                        <input id="username" placeholder="voornaam" type="text">
                        <h1>Achternaam</h1>
                        <input id="surname" placeholder="achternaam" type="text">
                        <h1>Geboortedatum</h1>
                        <input class="age_input" placeholder="dag" id="age_d" type="tel" maxlength="2">
                        <input class="age_input" placeholder="maand" id="age_m" type="tel" maxlength="2">
                        <input class="age_input" placeholder="jaar" id="age_y" type="tel" maxlength="4">
                        <h1 id="leadername_title">Wat is de voor- en achternaam van je groepsleider?</h1>
                        <input placeholder="Groepsleider voornaam" id="leadername" type="text">
                        <input placeholder="Groepsleider achternaam" id="leadersurname" type="text">
                        <h1 id="leadercode_title">Voer de beheerderscode in</h1>
                        <input id="leadercode" placeholder="code" type="text">
                        <div class="chosen_button" id="chosen_username">
                            <p>Aanmelden</p>
                        </div>
                        <div class="chosen_button" id="chosen_username_back">
                            <p>Terug</p>
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
                        <h1 id="chosen_answer_title"></h1>
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
                    <img src="assets/img/logo_1.png" class="test_logo" id="logo_1">
                    <img src="assets/img/logo_2.png" class="test_logo" id="logo_2">
                    <img src="assets/img/logo_3.png" class="test_logo" id="logo_3">
                </div>
                <div id="container"></div>
                <div class="main_menu_container slide-in-bottom" id="start_menu">
                    <div class="main_menu_item flip-in-hor-bottom" id="explain">Uitleg</div>
                    <div class="main_menu_item flip-in-hor-bottom" id="pre_alone">Alleen</div>
                    <div class="main_menu_item flip-in-hor-bottom" id="play_group">Groep</div>
                </div>
                <div class="main_menu_container slide-in-bottom" id="explain_menu">
                    <div class="main_menu_item flip-in-hor-bottom" id="explain_group_button">Leider van een groep?</div>
                    <div class="main_menu_item flip-in-hor-bottom" id="explain_part_button">Deelnemer van een groep?</div>
                    <div class="main_menu_item flip-in-hor-bottom" id="explain_alone_button">Alleen spelen?</div>
                </div>
                <div class="main_menu_container explain_container">
                    <div class="explain_inner_container">
                        <div id="explain_part">
                            <h3>Deelnemer van een groep</h3>
                            Deze app is een online mobile trivia game waar je vragen over de polder, molen, geschiedenis, flora en fauna moet beantwoorden.<br><br>Als een Deelnemer maak je deel uit van een groep die beheert wordt door een Groepsleider.<br><br>
                            Stel je kennis van de Hempensermeerpolder op de proef met uitdagende vragen!
                        </div>
                        <div id="explain_alone">
                            <h3>Spelen</h3>
                            Deze app is een online mobile trivia game waar je vragen over de polder, molen, geschiedenis, flora en fauna moet beantwoorden.<br><br>
                            Stel je kennis van de Hempensermeerpolder op de proef met uitdagende vragen!
                        </div>
                        <div id="explain_group">
                            <h3>Leider van een groep</h3>
                            Deze app is een online mobile trivia game waar je vragen over de polder, molen, geschiedenis, flora en fauna moet beantwoorden.<br><br>Als een Groepsleider heb je mogelijkheid om een groep aan te maken waar Deelnemers zich aan kunnen sluiten.<br><br>
                            Stel je kennis van de Hempensermeerpolder op de proef met uitdagende vragen!
                        </div>
                        <div id="categories_alone">
                            <p>Ik snap het</p>
                        </div>
                        <div class="back_to_start_button">
                            <p>Terug naar startscherm</p>
                        </div>
                    </div>
                </div>
                <div class="dark_overlay alone_select_categories_container">
                    <div class="alone_select_inner_container">
                        <h1>Vanuit welke categorieën moeten er vragen komen?</h1>
                        <div class="alone_select_categories">
                            Laden..
                        </div>
                        <h1>Wat is je leeftijd?</h1>
                        <input id="age_alone" type="tel" maxlength="2" value="">
                        <div id="alone">
                            <p>Ik wil spelen!</p>
                        </div>
                        <div class="back_to_explain_button">
                            <p>Terug naar uitleg</p>
                        </div>
                    </div>
                </div>
                <div class="overlay correct">Goed!</div>
                <div class="overlay not_correct">Fout!</div>
                <div class="question_container">
                    <div style="display:none;" class="category"></div>
                    <div class="question"></div>
                    <div class="answer answers_0"></div>
                    <div class="answer answers_1"></div>
                    <div class="answer answers_2"></div>
                    <div class="answer answers_3"></div>
                </div>
                <div class="category_container">
                    <div class="category_inner_container">
                        <div class="category_visual jumper"><h1 id="countdown">5</h1></div>
                        <div class="category_name">Spel starten..</div>
                    </div>
                </div>
                <div class="final_score_container">
                    <div class="pos_score">
                        <h3 id="end_text">Eindscore</h3>
                        <img class="parrot" src="assets/img/parrot.gif">
                        <div class="inner_pos_score"></div>
                        <div class="user_answers_container"></div>
                    </div>
                    <div class="sub_final_score_container">
                        <div class="chosen_button_end" id="back_to_scores">
                            <p>Terug naar overzicht</p>
                        </div>
                        <div class="chosen_button" id="back_to_admin">
                            <p>Terug naar groepenbeheer</p>
                        </div>
                        <div class="chosen_button" id="reload">
                            <p>Terug naar menu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="script/bird.js"></script>
    <script type="text/javascript" src="script/birds_engine.js"></script>
    <script type="text/javascript" src="script/main.js"></script>
    <script type="text/javascript" src="script/menu.js"></script>
</html>

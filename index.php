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

        <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="assets/icons/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/stylesheet.css">
        <script type="text/javascript" src="script/engine/three.min.js"></script>
        <script type="text/javascript" src="script/engine/ColladaLoader2.js"></script>
    </head>
    <body>
        <div class="main_content">
            <div class="chosen_container">
                <div id="chosen_answer">
                    <p id="chosen_answer_question">Je gekozen antwoord is:</p>
                    <p id="chosen_answer_content">Gekozen antwoord</p>
                    <div class="chosen_button_container">
                        <div class="chosen_button" id="chosen_yes">
                            <p>Doorgaan</p>
                        </div>
                        <div class="chosen_button" id="chosen_no">
                            <p>Andere kiezen..</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading_screen">
                <h1 class="vibrate-1">Loading..</h1>
                <h1 class="vibrate-1" id="debug"></h1>
            </div>
            <h1 class="title">Hempensermeerpolder <p> - Trivia - </p></h1>
            <div id="container"></div>
            <div class="main_menu_container slide-in-bottom">
                <div class="main_menu_item flip-in-hor-bottom" id="group">Groep</div>
                <div class="main_menu_item flip-in-hor-bottom" id="alone">Alleen</div>
                <div class="main_menu_item flip-in-hor-bottom" id="expl">Hoe werkt deze game?</div>
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
                <div class="menu_button"></div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="script/bird.js"></script>
    <script type="text/javascript" src="script/birds_engine.js"></script>
    <script type="text/javascript" src="script/main.js"></script>
</html>

<?php
    if(session_id() == '' || !isset($_SESSION)) {
        session_start();
    }

    if (isset($_GET['function'])) {
        if ($_GET['function'] == "validate") {
            validateAnswer();
        } else if ($_GET['function'] == "getQandA") {
            getQuestionAndAnswers();
        } else if ($_GET['function'] == "getUserProgress") {
            if(isset($_SESSION['user_id'])) {
                getUserProgress();
            } else {
                echo "new_user";
            }
        } else if ($_GET['function'] == "newUser") {
            createUser();
        }
    }

    function getUserProgress() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        mysqli_close($mysqli);
    }

    function createUser() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        $user_name = $mysqli->real_escape_string($_GET['username']);
        $query = "INSERT INTO users (user_name, group_id, 0, time_created) VALUES ()";
        $_SESSION["user_id"] = 0;
        mysqli_close($mysqli);
    }

    function validateUser() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");

        mysqli_close($mysqli);
    }

    function validateAnswer() {
        validateUser();
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        $input_answer = preg_replace( '/[^0-9]/', '', $_GET['answer']);
        $input_question = preg_replace( '/[^0-9]/', '', $_GET['question_id']);
        if ($input_question > 0) $input_answer = (($input_answer+4)*$input_question);
        if ($result = $mysqli->query("SELECT id FROM answers WHERE is_correct = 1 AND question_id = $input_question")) {
            if ((string)$result->fetch_row()[0] == (string)$input_answer) {
                echo "correct";
            } else {
                echo "false";
            }
        }
        mysqli_close($mysqli);
    }

    function getQuestionAndAnswers() {
        validateUser();
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        $input_category = preg_replace( '/[^0-9]/', '', $_GET['category_id']);
        $result = $mysqli->query("SELECT * FROM questions");
        $amount_of_questions = mysqli_num_rows($result);
        $questions_answered_array = explode(",",$_GET['questions_answered']);
        if ($amount_of_questions == count($questions_answered_array)) {
            echo "end";
        } else {
            while (in_array(($input_question = rand(0,mysqli_num_rows($result)-1)),$questions_answered_array));
            if ($result_question = $mysqli->query("SELECT question FROM questions WHERE id = $input_question")) {
                echo $result_question->fetch_row()[0];
                echo "|";
                if ($result_category = $mysqli->query("SELECT cat_id FROM questions WHERE id = $input_question")) {
                    $result_category_id = preg_replace( '/[^0-9]/', '', $result_category->fetch_row()[0]);
                    if($result_category_name = $mysqli->query("SELECT category_name FROM categories WHERE id = $result_category_id")) {
                        echo $result_category_name->fetch_row()[0];
                    }
                }
                echo "|".$input_question;
                if($result_answer = $mysqli->query("SELECT answer FROM answers WHERE question_id = $input_question")) {
                    $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                    for ($i = 0; $i < $result_answer->num_rows; $i++) {
                        echo "|".$row[$i]["answer"];
                    }
                }
            }
        }
        mysqli_close($mysqli);
    }
?>

<?php
    if(session_id() == '' || !isset($_SESSION)) {
        session_start();
    }

    if (isset($_GET['function'])) {
        if ($_GET['function'] == "validate") {
            validateAnswer();
        } else if ($_GET['function'] == "getCatsGroup") {
            getCategories();
        } else if ($_GET['function'] == "getGroups") {
            getGroups();
        } else if ($_GET['function'] == "getQandA") {
            getQuestionAndAnswers();
        } else if ($_GET['function'] == "createGroup") {
            createGroup();
        } else if ($_GET['function'] == "getUserProgress") {
            if(isset($_SESSION['user_id'])) {
                getUserProgress();
            } else {
                echo "new_user";
            }
        } else if ($_GET['function'] == "createUser") {
            createUser();
        } else if ($_GET['function'] == "joinGroup") {
            joinGroup();
        } else if ($_GET['function'] == "getUsers") {
            getUsers();
        }
    }

    function getUsers() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        $group_id = $mysqli->real_escape_string($_GET['group_id']);

        if($result_answer = $mysqli->query("SELECT * FROM users INNER JOIN scores ON users.session_token = scores.user_token AND scores.group_id = '$group_id'")) {
            $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
            for ($i = 0; $i < $result_answer->num_rows; $i++) {
                echo $row[$i]["id"]."=".$row[$i]["user_name"]."|";
            }
        } else {
            echo mysqli_error($mysqli);
        }

        mysqli_close($mysqli);
    }

    function joinGroup() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        $token = $mysqli->real_escape_string($_GET['token']);
        $group_id = $mysqli->real_escape_string($_GET['group_id']);
        if ($result_answer = $mysqli->query("SELECT user_token FROM scores WHERE user_token = '$token' AND group_id = '$group_id'")) {
            if($result_answer->num_rows == 0) {
                $mysqli->query("INSERT INTO scores (user_token, group_id, score, progression) VALUES ('$token', '$group_id', '0', '')");
            }
            if ($result = $mysqli->query("SELECT group_admin FROM groups WHERE id = '$group_id' AND group_admin = '$token'")) {
                if ((string)$result->fetch_row()[0] == (string)$token) {
                    echo "admin";
                } else {
                    echo "user";
                }
            } else {
                echo mysqli_error($mysqli);
            }
        } else {
            echo mysqli_error($mysqli);
        }
        mysqli_close($mysqli);
    }

    function getGroups() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        if($result_answer = $mysqli->query("SELECT * FROM groups")) {
            $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
            for ($i = 0; $i < $result_answer->num_rows; $i++) {
                echo $row[$i]["id"]."=".$row[$i]["group_name"]."|";
            }
        }
        mysqli_close($mysqli);
    }


    function getCategories() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        if($result_answer = $mysqli->query("SELECT * FROM categories")) {
            $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
            for ($i = 0; $i < $result_answer->num_rows; $i++) {
                echo $row[$i]["id"]."=".$row[$i]["category_name"]."|";
            }
        }
        mysqli_close($mysqli);
    }

    function getUserProgress() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        mysqli_close($mysqli);
    }

    function createUser() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        $user_name = $mysqli->real_escape_string($_GET['user_name']);
        $age = $mysqli->real_escape_string($_GET['age']);
        $token = uniqid(rand());
        $mysqli->query("INSERT INTO `users`(`user_name`, `age`, `session_token`) VALUES ('$user_name','$age','$token')");
        echo $token;
        mysqli_close($mysqli);
    }

    function createGroup() {
        $mysqli = new mysqli("localhost", "root", "", "hemp_app_db");
        $group_name = $mysqli->real_escape_string($_GET['group_name']);
        $group_code = $mysqli->real_escape_string($_GET['group_code']);
        $group_admin = $mysqli->real_escape_string($_GET['group_admin']);
        $categories = $mysqli->real_escape_string($_GET['categories']);
        $categories = json_encode($categories);
        $current_date = json_encode(date('Y-m-d'));
        //echo $current_date;
        if ($mysqli->query("INSERT INTO groups (code, group_name, time_created, categories, started, group_admin) VALUES ('$group_code', '$group_name', '$current_date', '$categories', 0, '$group_admin')")) {
            echo $mysqli->insert_id;
        } else {
            echo mysqli_error($mysqli);
        }
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

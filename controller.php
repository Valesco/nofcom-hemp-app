<?php
    //echo "oke";
    class CallFunctions {

        private $_connection;
        private static $_instance;
        private $_host = "localhost";
        private $_username = "root";
        private $_password = "";
        private $_database = "hemp_app_db";

        public static function getInstance() {
            if(!self::$_instance) { // If no instance then make one
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function __construct() {
            $this->_connection = new mysqli($this->_host, $this->_username, $this->_password, $this->_database);
    		// Error handling
    		if(mysqli_connect_error()) {
    			trigger_error("Failed to connect to database: " . mysql_connect_error(), E_USER_ERROR);
    		}
        }

	    private function __clone() { }

        public function getConnection() {
    		return $this->_connection;
    	}

        public function __destruct() {
            $this->_connection->close();
        }

        function getScoresAllUsers() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $group_id = $mysqli->real_escape_string($_GET['group_id']);
            $token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT group_admin FROM groups WHERE group_admin = '$token'")) {
                if ((string)$result_answer->fetch_row()[0] == (string)$token) {
                    if($result_answer = $mysqli->query("SELECT * FROM scores WHERE group_id = '$group_id' ORDER BY score DESC")) {
                        $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                        for ($i = 0; $i < $result_answer->num_rows; $i++) {
                            $temp_user = $row[$i]["user_token"];
                            if($result_user = $mysqli->query("SELECT * FROM users WHERE session_token = '$temp_user'")) {
                                $temp_user_row = mysqli_fetch_all($result_user, MYSQLI_ASSOC);
                                if ($row[$i]["finished"] == "1") {
                                    echo "✓ ";
                                }
                                echo $temp_user_row[0]["id"]."=".$temp_user_row[0]["user_name"]." ".$temp_user_row[0]["surname"]." heeft <br>";
                            }
                            if ($row[$i]["score"] == "1") {
                                echo ":".$row[$i]["score"]." ";
                            } else {
                                echo ":".$row[$i]["score"]." ";
                            }
                            echo "|";
                        }
                    }
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function getScoreSingleUser() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $group_id = $mysqli->real_escape_string($_GET['group_id']);
            $token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT * FROM scores WHERE user_token = '$token' AND group_id = '$group_id'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    echo $row[$i]["score"]." ";
                    if ($row[$i]["finished"] != "0") {
                        $mysqli->query("UPDATE scores SET finished='1' WHERE user_token = '$token' AND group_id = '$group_id'");
                    }
                    //$mysqli->query("UPDATE users SET waiting='0' WHERE session_token = '$token'");
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function finishUser() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $group_id = $mysqli->real_escape_string($_GET['group_id']);
            $token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT * FROM scores WHERE user_token = '$token' AND group_id = '$group_id'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    if ($row[$i]["finished"] != "0") {
                        $mysqli->query("UPDATE scores SET finished='1' WHERE user_token = '$token' AND group_id = '$group_id'");
                    }
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function checkLobbyStatus () {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $token = $mysqli->real_escape_string($_GET['token']);
            $group_id = $mysqli->real_escape_string($_GET['group_id']);
            $kicked = "kicked";
            $play = "play";
            if($result_answer = $mysqli->query("SELECT progression FROM scores WHERE user_token = '$token' AND group_id = '$group_id'")) {
                $result = (string)$result_answer->fetch_row()[0];
                if ($result == (string)$kicked) {
                    $mysqli->query("DELETE FROM scores WHERE user_token = '$token' AND group_id = '$group_id'");
                    echo $kicked;
                }
                if ($result == (string)$play) {
                    echo $play;
                }
            }
        }

        function playPing() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $admin_token = $mysqli->real_escape_string($_GET['token']);
            $group_id = $mysqli->real_escape_string($_GET['group_id']);
            $play = "play";
            if($result_answer = $mysqli->query("SELECT * FROM groups WHERE group_admin = '$admin_token'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    $temp_id = $row[$i]["id"];
                    $mysqli->query("UPDATE scores SET progression = '$play' WHERE group_id = '$temp_id'");
                    $mysqli->query("UPDATE groups SET started = '1' WHERE group_admin = '$admin_token'");
                    echo "playing";
                }
            }
        }

        function kickUser() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $admin_token = $mysqli->real_escape_string($_GET['token']);
            $user_id = $mysqli->real_escape_string($_GET['user_id']);
            $kicked = "kicked";
            if($result_answer = $mysqli->query("SELECT group_admin FROM groups WHERE group_admin = '$admin_token'")) {
                if ((string)$result_answer->fetch_row()[0] == (string)$admin_token) {
                    $mysqli->query("UPDATE scores SET progression='$kicked' WHERE id = '$user_id'");
                    echo "removed";
                }
            }
        }

        function exitAllGroups() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $token = $mysqli->real_escape_string($_GET['token']);
            $mysqli->query("DELETE FROM scores WHERE user_token = '$token' AND progression = ''");
            echo "Removed from all groups.";
        }

        function getUsers() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $group_id = $mysqli->real_escape_string($_GET['group_id']);
            if($result_answer = $mysqli->query("SELECT * FROM users INNER JOIN scores ON users.session_token = scores.user_token AND scores.group_id = '$group_id'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    echo $row[$i]["id"]."=".$row[$i]["user_name"]." ".$row[$i]["surname"]."|";
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function joinGroup() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
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
        }

        function getGroups() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $user_id = 0;
            $row_couple = 0;

            if($result_answer_users = $mysqli->query("SELECT id FROM users WHERE session_token='$session_token'")) {
                $row_user = mysqli_fetch_all($result_answer_users, MYSQLI_ASSOC);
                $user_id = $row_user[0]["id"];
            } else {
                echo mysqli_error($mysqli);
            }
            if($result_answer_couple = $mysqli->query("SELECT * FROM group_has_user WHERE user_id='$user_id' ORDER BY id DESC")) {
                //echo $user_id." ";
                $row_couple = mysqli_fetch_all($result_answer_couple, MYSQLI_ASSOC);
                for($j = 0; $j < $result_answer_couple->num_rows; $j++) {
                    $temp_group_id = $row_couple[$j]["group_id"];
                    //echo $temp_group_id." ".$result_answer_couple->num_rows." ".$j." ";
                    if($result_answer = $mysqli->query("SELECT * FROM groups WHERE id = '$temp_group_id'")) {
                        //echo "lol";
                        $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                        for ($i = 0; $i < $result_answer->num_rows; $i++) {
                            $group_id = $row[$i]["id"];
                            $temp_user_result_answer = $mysqli->query("SELECT * FROM scores WHERE group_id = '$group_id'");
                            $temp_user_row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                            $temp_current_user_sum = $temp_user_result_answer->num_rows;

                            $temp_max_user_sum = 0;
                            $temp_max_user_result_answer = $mysqli->query("SELECT * FROM group_has_user WHERE group_id = '$group_id'");
                            $temp_max_user_sum = ($temp_max_user_result_answer->num_rows)-1;
                            if ($row[$i]['started'] == '0') {
                                echo $row[$i]["id"]."=".$row[$i]["group_name"]." (".$temp_current_user_sum."/".$temp_max_user_sum.")|";
                            } else if ($temp_current_user_sum > 0) {
                                echo $row[$i]["id"]."=*".$row[$i]["group_name"]." (".$temp_current_user_sum." deelnemers)|";
                            }

                        }
                    } else {
                        echo mysqli_error($mysqli);
                    }
                }
                echo mysqli_error($mysqli);
                //echo print_r($row_couple);
            } else {
                echo mysqli_error($mysqli);
            }

        }


        function getCategories() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            if($result_answer = $mysqli->query("SELECT * FROM categories")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    echo $row[$i]["id"]."=".$row[$i]["category_name"]."|";
                }
            }
        }

        function getUserProgress() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
        }

        function createAdmin() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();

            $user_name = $mysqli->real_escape_string($_GET['user_name']);
            $surname = $mysqli->real_escape_string($_GET['surname']);
            $temp_age = $mysqli->real_escape_string($_GET['temp_age']);
            $age = $mysqli->real_escape_string($_GET['age']);
            $leadercode = $mysqli->real_escape_string($_GET['leadercode']);

            $token = uniqid(rand());
            if($mysqli->query("INSERT INTO `users`(`admin_level`,`user_name`, `surname`, `age`, `session_token`, `birthdate`, `admin_code`, `admin_parent_id`) VALUES ('1','$user_name','$surname','$age','$token','$temp_age','$leadercode','-1')")) {
                $mysqli->query("INSERT INTO `admin_codes` (`admin_code`,`used`) VALUES ('$leadercode','0')");
                echo "success";
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function validateUser() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $user_name = $mysqli->real_escape_string($_GET['user_name']);
            $surname = $mysqli->real_escape_string($_GET['surname']);
            $temp_age = $mysqli->real_escape_string($_GET['temp_age']);
            $age = $mysqli->real_escape_string($_GET['age']);
            $leadersurname = $mysqli->real_escape_string($_GET['leadersurname']);
            $leadername = $mysqli->real_escape_string($_GET['leadername']);
            $leadercode = $mysqli->real_escape_string($_GET['leadercode']);

            $exists = false;
            $token = 0;
            $admin_id = -1;

            //REGULAR LOGIN
            if(strlen($leadername) > 0 && strlen($leadersurname) > 0 && strlen($leadercode) == 0) {
                if($result_answer = $mysqli->query("SELECT * FROM users WHERE admin_level='1' AND user_name='$leadername' AND surname='$leadersurname' AND admin_code!='-1'")) {
                    if(($result_answer->num_rows) > 0) {
                        $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                        $admin_id = $row[0]["id"];
                    }
                }
                if($admin_id != -1 && $result_answer = $mysqli->query("SELECT * FROM users WHERE user_name='$user_name' AND surname='$surname' AND age='$age' AND birthdate='$temp_age' AND admin_parent_id='$admin_id'")) {
                    if(($result_answer->num_rows) > 0) {
                        $exists = true;
                        $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                        $token = $row[0]["session_token"];
                        echo "regular";
                    }
                }
                if ($admin_id != -1 && !$exists) {
                    $token = uniqid(rand());
                    if($mysqli->query("INSERT INTO `users`(`admin_level`,`user_name`, `surname`, `age`, `session_token`, `birthdate`, `admin_parent_id`) VALUES ('0','$user_name','$surname','$age','$token','$temp_age','$admin_id')")) {
                        echo "regular";
                    } else {
                        echo mysqli_error($mysqli);
                    }
                }
                if ($admin_id == -1) echo "no_admin";
            //ADMIN LOGIN
            } else if (strlen($leadername) == 0 && strlen($leadersurname) == 0 && strlen($leadercode) > 0) {
                $admin_code = "";
                if($result_answer = $mysqli->query("SELECT * FROM admin_codes WHERE admin_code='$leadercode' AND used='0'")) {
                    if(($result_answer->num_rows) > 0) {
                        $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                        $admin_code = $row[0]["admin_code"];
                    }
                }
                if ($leadercode == $admin_code && $admin_code != "") {
                    if($result_answer = $mysqli->query("SELECT * FROM users WHERE user_name='$user_name' AND surname='$surname' AND age='$age' AND birthdate='$temp_age' AND admin_code='$leadercode'")) {
                        if(($result_answer->num_rows) > 0) {
                            $exists = true;
                            $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                            $token = $row[0]["session_token"];
                            echo "admin";
                        }
                    }
                    if (!$exists) {
                        $token = uniqid(rand());
                        if($mysqli->query("INSERT INTO `users`(`admin_level`,`user_name`, `surname`, `age`, `session_token`, `birthdate`, `admin_code`, `admin_parent_id`) VALUES ('1','$user_name','$surname','$age','$token','$temp_age','$leadercode','-1')")) {
                            //$mysqli->query("UPDATE admin_codes SET used='1' WHERE admin_code='$leadercode'");
                            echo "admin";
                        } else {
                            echo mysqli_error($mysqli);
                        }
                    }
                } else {
                    echo "no_code";
                }
            }

            echo ":".$token;
        }

        function createGroup() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $group_name = $mysqli->real_escape_string($_GET['group_name']);
            $group_admin = $mysqli->real_escape_string($_GET['group_admin']);
            $categories = $mysqli->real_escape_string($_GET['categories']);
            $users = $mysqli->real_escape_string($_GET['users']);
            $max_questions = $mysqli->real_escape_string($_GET['max_questions']);
            //$users = json_encode($users);
            $current_date = json_encode(date('Y-m-d'));
            $users_array = explode(",", $users);
            $exists = false;
            $exists_user = false;

            //echo $current_date;
            if ($mysqli->query("INSERT INTO groups (group_name, time_created, categories, started, group_admin, max_questions) VALUES ('$group_name', '$current_date', '$categories' ,0, '$group_admin', '$max_questions')")) {
                $temp_new_id = $mysqli->insert_id;
                if($result = $mysqli->query("SELECT * FROM users WHERE session_token = '$group_admin'")) {

                    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    $group_admin_id = $row[0]["id"];

                    $mysqli->query("INSERT INTO group_has_user (group_id, user_id) VALUES ('$temp_new_id', '$group_admin_id')");

                    for ($i = 0; $i < count($users_array); $i++) {
                        if ($users_array[$i] != 0) {
                            if($result_answer = $mysqli->query("SELECT * FROM group_has_user WHERE group_id='$temp_new_id' AND user_id='$users_array[$i]'")) {
                                if(($result_answer->num_rows) == 0) {
                                    $mysqli->query("INSERT INTO group_has_user (group_id, user_id) VALUES ('$temp_new_id', '$users_array[$i]')");
                                }
                            }
                        }
                    }
                }
            } else {

            }
        }

        function validateAnswer() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $input_answer = preg_replace( '/[^0-9]/', '', $_GET['answer']);
            $input_question = preg_replace( '/[^0-9]/', '', $_GET['question_id']);
            $token = $mysqli->real_escape_string($_GET['token']);
            $group_id = preg_replace( '/[^0-9]/', '', $_GET['group_id']);
            if ($input_question > 0) $input_answer = (($input_question*4)+$input_answer);
            if ($result = $mysqli->query("SELECT id FROM answers WHERE is_correct = 1 AND question_id = $input_question")) {
                if ((string)$result->fetch_row()[0] == (string)$input_answer) {
                    echo "correct";
                    $appendprogression = "|".$input_question."=1.".$input_answer;
                    $mysqli->query("UPDATE scores SET progression = CONCAT(progression, '$appendprogression') WHERE user_token = '$token' AND group_id = '$group_id'");
                    $mysqli->query("UPDATE scores SET score = score + 1 WHERE user_token = '$token' AND group_id = '$group_id'");
                } else {
                    echo "false";
                    $appendprogression = "|".$input_question."=0.".$input_answer;
                    $mysqli->query("UPDATE scores SET progression = CONCAT(progression, '$appendprogression') WHERE user_token = '$token' AND group_id = '$group_id'");
                }
            }
            echo mysqli_error($mysqli);
        }

        function getCatAndQuestions() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();

            $age = preg_replace( '/[^0-9]/', '', $_GET['age']);

            $group_id = $mysqli->real_escape_string($_GET['group_id']);
            $local_alone_categories = $mysqli->real_escape_string($_GET['local_alone_categories']);
            $amount_questions = 0;

            if($local_alone_categories == "") {
                if($result_admin = $mysqli->query("SELECT * FROM groups WHERE id='$group_id'")) {
                    $row_admin = mysqli_fetch_all($result_admin, MYSQLI_ASSOC);
                    $local_alone_categories = $row_admin[0]["categories"];
                    $amount_questions = $row_admin[0]["max_questions"];
                }
            } else {
                $amount_questions = preg_replace( '/[^0-9]/', '', $_GET['max_questions']);
                $result_temp = $mysqli->query("SELECT * FROM categories WHERE id='$category_array[$i]'");
                $max = 0;
                if($result_categories = $mysqli->query("SELECT * FROM categories")) {
                    $row_categories = mysqli_fetch_all($result_categories, MYSQLI_ASSOC);
                    for($i = 0; $i < $result_categories->num_rows; $i++) {
                        $temp_question_id = $row_categories[$i]['id'];
                        if($result_questions = $mysqli->query("SELECT * FROM questions WHERE cat_id = '$temp_question_id'")) {
                            $temp_amount = $result_questions->num_rows;
                            if ($i == 0) {
                                $max = $temp_amount;
                            } else if ($temp_amount < $max) {
                                $max = $temp_amount;
                            }
                        }
                    }
                    echo $max;
                }
                if ($amount_questions > $max) {
                    $amount_questions = $max;
                }
            }

            $category_array = explode(",",$local_alone_categories);
            shuffle($category_array);

            for($i = 0; $i < count($category_array); $i++) {
                if($result_categories = $mysqli->query("SELECT * FROM categories WHERE id='$category_array[$i]'")) {
                    $row = mysqli_fetch_all($result_categories, MYSQLI_ASSOC);
                    for ($j = 0; $j < $result_categories->num_rows; $j++) {
                        $category_id = $row[$j]["id"];
                        $category_name = $row[$j]["category_name"];

                        echo $category_id."[";

                        if($result_questions = $mysqli->query("SELECT * FROM questions WHERE cat_id='$category_id' AND (age_start <= '$age' AND age_stop > '$age') ORDER BY RAND() ")) {
                            $row_questions = mysqli_fetch_all($result_questions, MYSQLI_ASSOC);
                            if (($result_questions->num_rows) > 0) {
                                for($k = 0; $k < $amount_questions; $k++) {
                                    if($k <= $result_questions->num_rows-1) {
                                        echo $row_questions[$k]["id"];
                                    }
                                    if ($k != $amount_questions-1) echo ",";
                                }
                            }
                        }

                        echo "]".$category_name."|";
                    }
                }
            }
        }

        function getQuestionWithAnswers() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $input_question = preg_replace( '/[^0-9]/', '', $_GET['question_id']);
            if ($result_question = $mysqli->query("SELECT question FROM questions WHERE id = '$input_question'")) {
                echo $result_question->fetch_row()[0];
                if($result_answer = $mysqli->query("SELECT answer FROM answers WHERE question_id = '$input_question'")) {
                    $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                    for ($i = 0; $i < $result_answer->num_rows; $i++) {
                        echo "|".$row[$i]["answer"];
                    }
                }
            }
        }

        function setWaitingToFalse() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $mysqli->query("UPDATE users SET waiting='0' WHERE session_token = '$session_token'");
            echo "success";
        }

        function setWaitingToTrue() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $waiting_last_ping = $mysqli->real_escape_string($_GET['waiting_last_ping']);
            $mysqli->query("UPDATE users SET waiting='1', waiting_last_ping='$waiting_last_ping' WHERE session_token = '$session_token'");
            echo "success";
        }

        function getAllUsersCreateGroupList() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $admin_id;
            if($result_admin = $mysqli->query("SELECT * FROM users WHERE admin_level='1' AND session_token='$session_token'")) {
                $row_admin = mysqli_fetch_all($result_admin, MYSQLI_ASSOC);
                $admin_id = $row_admin[0]["id"];
            }
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE waiting='1' AND admin_parent_id='$admin_id'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    echo $row[$i]["id"]."=".$row[$i]["user_name"]." ".$row[$i]["surname"].":".$row[$i]["waiting_last_ping"]."|";
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function getGroupNameAndQuantity() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $group_id = preg_replace( '/[^0-9]/', '', $_GET['group_id']);
            if($result_answer = $mysqli->query("SELECT * FROM groups WHERE id = '$group_id'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                if ($result_answer_users = $mysqli->query("SELECT * FROM scores WHERE group_id = '$group_id'")) {
                    $temp_current_user_sum = $result_answer_users->num_rows;

                    $temp_max_user_result_answer = $mysqli->query("SELECT * FROM group_has_user WHERE group_id = '$group_id'");
                    $temp_max_user_sum = ($temp_max_user_result_answer->num_rows)-1;

                    echo $row[0]["group_name"]." (".$temp_current_user_sum."/".$temp_max_user_sum.")";
                }
            }
        }

        function timeOut() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $user_id = preg_replace( '/[^0-9]/', '', $_GET['id']);
            $mysqli->query("UPDATE users SET waiting='0' WHERE id = '$user_id'");
            echo "success";
        }

        function validateAdmin() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND (admin_level='1' OR admin_level='2')")) {
                if($result_answer->num_rows > 0) echo "is_admin";
            }
        }

        function getAdminByUserToken() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='0'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    $admin_id = $row[$i]["admin_parent_id"];
                    if($result_admin = $mysqli->query("SELECT * FROM users WHERE id = '$admin_id' AND admin_level='1'")) {
                        $row_admin = mysqli_fetch_all($result_admin, MYSQLI_ASSOC);
                        for ($j = 0; $j < $result_admin->num_rows; $j++) {
                            echo $row_admin[$j]["user_name"]." ".$row_admin[$j]["surname"];
                        }
                    } else {
                        echo mysqli_error($mysqli);
                    }
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function getRandomCharacters() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2'")) {
                if($result_admin = $mysqli->query("SELECT * FROM app_codes")) {
                    $row_admin = mysqli_fetch_all($result_admin, MYSQLI_ASSOC);
                    echo $row_admin[0]["code"];
                } else {
                    echo mysqli_error($mysqli);
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function randomCharacters() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2'")) {
                $rand = substr(uniqid('', true), -4);
                $mysqli->query("UPDATE `app_codes` SET `code` = '$rand' WHERE `app_codes`.`id` = 1");
                echo $rand;
            } else {
                echo "no_admin";
            }
        }

        function randomAdminCharacters() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['token']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2'")) {
                echo $rand = substr(uniqid('', true), -4);
            } else {
                echo "no_admin";
            }
        }

        function loginAjax() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $username = $mysqli->real_escape_string($_GET['username']);
            $password = $mysqli->real_escape_string($_GET['password']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE user_name = '$username' AND admin_level='2'")) {
                $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                for ($i = 0; $i < $result_answer->num_rows; $i++) {
                    $hash = $row[$i]["password"];
                    if (password_verify($password, $hash)) {
                        echo $row[$i]["session_token"];
                    }
                }
            }
        }

        function removeQuestion() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $question_id = $mysqli->real_escape_string($_GET['question_id']);

            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2'")) {
                if($result_answer->num_rows > 0) {
                    $mysqli->query("DELETE FROM questions WHERE id = '$question_id'");
                    $mysqli->query("DELETE FROM answers WHERE question_id = '$question_id'");
                }
            }
        }

        function addQuestion() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $cat_id = $mysqli->real_escape_string($_GET['cat_id']);
            $is_correct = $mysqli->real_escape_string($_GET['is_correct']);
            $question = $mysqli->real_escape_string($_GET['question']);
            $answer_0 = $mysqli->real_escape_string($_GET['answer_0']);
            $answer_1 = $mysqli->real_escape_string($_GET['answer_1']);
            $answer_2 = $mysqli->real_escape_string($_GET['answer_2']);
            $answer_3 = $mysqli->real_escape_string($_GET['answer_3']);
            $age_start = $mysqli->real_escape_string($_GET['age_start']);
            $age_stop = $mysqli->real_escape_string($_GET['age_stop']);

            $answer_array = [$answer_0,$answer_1,$answer_2,$answer_3];
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2'")) {
                if($result_answer->num_rows > 0) {
                    if($mysqli->query("INSERT INTO questions (cat_id, question, age_start, age_stop) VALUES ('$cat_id', '$question', '$age_start', '$age_stop')")) {
                        $temp_new_id = $mysqli->insert_id;
                        for ($i = 0; $i < count($answer_array); $i++) {
                            if ($i == $is_correct) {
                                $mysqli->query("INSERT INTO answers (question_id, answer, is_correct) VALUES ('$temp_new_id', '$answer_array[$i]', '1')");
                            } else {
                                $mysqli->query("INSERT INTO answers (question_id, answer, is_correct) VALUES ('$temp_new_id', '$answer_array[$i]', '0')");
                            }
                        }
                    } else {
                        echo mysqli_error($mysqli);
                    }
                }
            } else {
                echo mysqli_error($mysqli);
            }
        }

        function getCategoriesQuestionsAnswers() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);

            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2'")) {
                if($result_answer->num_rows > 0) {
                    if ($result_categories = $mysqli->query("SELECT * FROM categories")) {
                        $row_categories = mysqli_fetch_all($result_categories, MYSQLI_ASSOC);
                        for($k = 0; $k < $result_categories->num_rows; $k++) {
                            $cat_id = $row_categories[$k]["id"];
                            if ($k > 0) echo "&";
                            echo $cat_id."=".$row_categories[$k]["category_name"];
                            if ($result_question = $mysqli->query("SELECT * FROM questions WHERE cat_id='$cat_id'")) {
                                $row_question = mysqli_fetch_all($result_question, MYSQLI_ASSOC);
                                for($j = 0; $j < $result_question->num_rows; $j++) {
                                    echo "*".$row_question[$j]["id"]."=".$row_question[$j]["question"]."^".$row_question[$j]["age_start"]."-".$row_question[$j]["age_stop"].";";
                                    $question_id = $row_question[$j]["id"];
                                    if($result_answer = $mysqli->query("SELECT * FROM answers WHERE question_id = '$question_id'")) {
                                        $row = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                                        for ($i = 0; $i < $result_answer->num_rows; $i++) {
                                            echo "|".$row[$i]["id"]."=".$row[$i]["answer"].":".$row[$i]["is_correct"];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function getAllUsers () {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);

            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2' ORDER BY admin_level ASC")) {
                if($result_answer->num_rows > 0) {
                    if ($result_users = $mysqli->query("SELECT * FROM users")) {
                        $row_users = mysqli_fetch_all($result_users, MYSQLI_ASSOC);
                        for($k = 0; $k < $result_users->num_rows; $k++) {
                            if ($row_users[$k]["admin_level"] != 2) {
                                echo "|".$row_users[$k]["id"]."=".$row_users[$k]["admin_level"]."?".$row_users[$k]["user_name"]." ".$row_users[$k]["surname"].":".$row_users[$k]["age"]." jaar, ".$row_users[$k]["birthdate"];
                            }
                        }
                    }
                }
            }
        }

        function removeUser() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $user_id = $mysqli->real_escape_string($_GET['user_id']);

            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='2' ORDER BY admin_level ASC")) {
                if($result_answer->num_rows > 0) {
                    $mysqli->query("DELETE FROM users WHERE id = '$user_id'");
                }
            }
        }

        function getScoresSingleUser() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            $user_id = $mysqli->real_escape_string($_GET['user_id']);
            $group_id = $mysqli->real_escape_string($_GET['group_id']);

            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='1'")) {
                if($result_answer->num_rows > 0) {
                    if ($result_users = $mysqli->query("SELECT * FROM users WHERE id = '$user_id'")) {
                        $row_users = mysqli_fetch_all($result_users, MYSQLI_ASSOC);
                        for($k = 0; $k < $result_users->num_rows; $k++) {
                            $temp_token = $row_users[0]["session_token"];
                            echo $temp_token;
                            if ($result_user = $mysqli->query("SELECT * FROM scores WHERE user_token = '$temp_token' AND group_id = '$group_id'")) {
                                if($result_user->num_rows > 0) {
                                    $row_user = mysqli_fetch_all($result_user, MYSQLI_ASSOC);
                                    for($i = 0; $i < $result_user->num_rows; $i++) {
                                        $result_array = explode("|",$row_user[$i]["progression"]);
                                        for($j = 1; $j < count($result_array); $j++) {
                                            $question_id = explode("=",$result_array[$j])[0];
                                            $question = "";
                                            $answer = explode("=",$result_array[$j])[1];
                                            echo "|";
                                            if($result_question = $mysqli->query("SELECT * FROM questions WHERE id = '$question_id'")) {
                                                $row_question = mysqli_fetch_all($result_question, MYSQLI_ASSOC);
                                                echo $row_question[0]["question"];
                                            }
                                            if($result_answer = $mysqli->query("SELECT * FROM answers WHERE question_id = '$question_id' AND is_correct='1'")) {
                                                $row_answer = mysqli_fetch_all($result_answer, MYSQLI_ASSOC);
                                                $guessed = explode(".",$answer)[1];
                                                echo ":".$row_answer[0]["answer"]."=";
                                                if($result_guess = $mysqli->query("SELECT * FROM answers WHERE id = '$guessed'")) {
                                                    $row_guess = mysqli_fetch_all($result_guess, MYSQLI_ASSOC);
                                                    if ($result_guess->num_rows > 0) {
                                                        echo $row_guess[0]["answer"];
                                                    }
                                                }
                                            }
                                        }
                                        //echo $row_user[$i]["progression"];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function checkIntroCode() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $code = $mysqli->real_escape_string($_GET['code']);
            if($result_admin = $mysqli->query("SELECT * FROM app_codes")) {
                $row_admin = mysqli_fetch_all($result_admin, MYSQLI_ASSOC);
                if($row_admin[0]["code"] == $code) {
                    echo "true";
                } else {
                    echo "false";
                }
            }
        }

        function getMax() {
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='1'")) {
                if($result_categories = $mysqli->query("SELECT * FROM categories")) {
                    $row_categories = mysqli_fetch_all($result_categories, MYSQLI_ASSOC);
                    $max = 0;
                    for($i = 0; $i < $result_categories->num_rows; $i++) {
                        $temp_question_id = $row_categories[$i]['id'];
                        if($result_questions = $mysqli->query("SELECT * FROM questions WHERE cat_id = '$temp_question_id'")) {
                            $temp_amount = $result_questions->num_rows;
                            if ($i == 0) {
                                $max = $temp_amount;
                            } else if ($temp_amount < $max) {
                                $max = $temp_amount;
                            }
                        }
                    }
                    echo $max;
                }
            }
        }

        function getMaxScoreCount() {
            echo "AAAGHH";
            $db = CallFunctions::getInstance();
            $mysqli = $db->getConnection();
            $session_token = $mysqli->real_escape_string($_GET['session_token']);
            if($result_answer = $mysqli->query("SELECT * FROM users WHERE session_token = '$session_token' AND admin_level='1'")) {
                if($result_categories = $mysqli->query("SELECT * FROM categories")) {
                    $row_categories = mysqli_fetch_all($result_categories, MYSQLI_ASSOC);
                    $max = 0;
                    for($i = 0; $i < $result_categories->num_rows; $i++) {
                        $temp_question_id = $row_categories[$i]['id'];
                        if($result_questions = $mysqli->query("SELECT * FROM questions WHERE cat_id = '$temp_question_id'")) {
                            $temp_amount = $result_questions->num_rows;
                            if ($i == 0) {
                                $max = $temp_amount;
                            } else if ($temp_amount < $max) {
                                $max = $temp_amount;
                            }
                        }
                    }
                    echo $max;
                }
            }
        }
    }

    $functions = new CallFunctions;
    $functions_array = [
        "validateAnswer",
        "getCategories",
        "getGroups",
        "getCatAndQuestions",
        "createGroup",
        "validateUser",
        "joinGroup",
        "getUsers",
        "exitAllGroups",
        "kickUser",
        "checkLobbyStatus",
        "playPing",
        "getScoreSingleUser",
        "getScoresAllUsers",
        "getUserProgress",
        "getGroupNameAndQuantity",
        "getAllUsersCreateGroupList",
        "finishUser",
        "setWaitingToTrue",
        "setWaitingToFalse",
        "timeOut",
        "validateAdmin",
        "getQuestionWithAnswers",
        "getAdminByUserToken",
        "loginAjax",
        "randomCharacters",
        "createAdmin",
        "getCategoriesQuestionsAnswers",
        "addQuestion",
        "removeQuestion",
        "getAllUsers",
        "removeUser",
        "getScoresSingleUser",
        "checkIntroCode",
        "randomAdminCharacters",
        "getRandomCharacters",
        "getMax",
        "getMaxScoreCount"
    ];

    if(isset($_GET['function']) && in_array($_GET['function'], $functions_array)) {
        $i = 0;
        for($i = 0; $i < count($functions_array); ++$i) {
            if ($functions_array[$i] == $_GET['function']) {
                $functions->{$functions_array[$i]}();
            }
        }
    }
?>

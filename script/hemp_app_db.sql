-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2017 at 04:44 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hemp_app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_codes`
--

CREATE TABLE `admin_codes` (
  `id` int(11) NOT NULL,
  `admin_code` varchar(10) NOT NULL,
  `used` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_codes`
--

INSERT INTO `admin_codes` (`id`, `admin_code`, `used`) VALUES
(1, '0000', 0);

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `is_correct` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer`, `is_correct`) VALUES
(0, 0, '1863', 1),
(1, 0, '1263', 0),
(2, 0, '1994', 0),
(3, 0, '2008', 0),
(4, 1, 'Een houtzaagmolen', 0),
(5, 1, 'Een monnikmolen', 1),
(6, 1, 'Een waterradmolen', 0),
(7, 1, 'Een spinnenkopmolen', 0),
(8, 2, 'Olifant', 0),
(9, 2, 'Grutto', 1),
(10, 2, 'Giraffe', 0),
(11, 2, 'Zebra', 0),
(12, 3, 'Een UNESCO Werelderfgoedgebied', 0),
(13, 3, 'Een beschermd natuurgebied', 0),
(14, 3, 'Een cementfabriek', 1),
(15, 3, 'Een polder', 0),
(16, 4, '2001', 0),
(17, 4, '1785', 1),
(18, 4, '1283', 0),
(19, 4, '1622', 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(0, 'Geschiedenis vragen'),
(1, 'Molen vragen'),
(2, 'Natuur vragen'),
(3, 'Polder vragen');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `time_created` varchar(255) NOT NULL,
  `categories` varchar(255) NOT NULL,
  `started` int(11) NOT NULL,
  `group_admin` varchar(255) NOT NULL,
  `supergroup_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `time_created`, `categories`, `started`, `group_admin`, `supergroup_id`) VALUES
(155, 'Groep A', '"2017-12-04"', '"0,1,2,3"', 0, '291785a211440e471d', 0),
(156, 'test', '"2017-12-06"', '"0,1,2,3"', 1, '247945a27af056a3e9', 0),
(157, 'Bruine banaan', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(158, 'Testgroep', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(159, 'Af', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(160, 'Groep A', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(161, '1234', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(162, 'test', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(163, '123', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(164, '12314141', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(165, '123', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(166, '123', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(167, '123', '"2017-12-06"', '"0,1,2,3"', 1, '309555a27b41f1f0c6', 0),
(168, '123', '"2017-12-06"', '', 1, '309555a27b41f1f0c6', 0),
(169, 'Iphone test beheerder', '"2017-12-07"', '', 1, '283815a2940071d796', 0),
(170, 'test', '"2017-12-07"', '', 1, '200865a29502ce92cf', 0),
(171, 'test', '"2017-12-07"', '', 1, '200865a29502ce92cf', 0),
(172, 'Hahaga', '"2017-12-07"', '', 1, '200865a29502ce92cf', 0),
(173, 'Test', '"2017-12-07"', '', 1, '200865a29502ce92cf', 0),
(174, 'Yyyyy', '"2017-12-07"', '', 1, '200865a29502ce92cf', 0),
(175, 'Dhfhfju', '"2017-12-07"', '', 1, '200865a29502ce92cf', 0),
(176, 'Fjgjgj', '"2017-12-07"', '', 0, '200865a29502ce92cf', 0),
(177, 'Fbfhgjgjgk', '"2017-12-07"', '', 1, '200865a29502ce92cf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `group_has_categories`
--

CREATE TABLE `group_has_categories` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `group_has_user`
--

CREATE TABLE `group_has_user` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group_has_user`
--

INSERT INTO `group_has_user` (`id`, `group_id`, `user_id`) VALUES
(38, 155, 105),
(39, 156, 113),
(40, 156, 114),
(41, 157, 115),
(42, 157, 116),
(43, 158, 115),
(44, 158, 117),
(45, 159, 115),
(46, 159, 117),
(47, 160, 115),
(48, 160, 120),
(52, 161, 115),
(53, 161, 122),
(54, 162, 115),
(55, 162, 123),
(56, 163, 115),
(57, 163, 123),
(58, 164, 115),
(59, 164, 123),
(60, 165, 115),
(61, 166, 115),
(62, 167, 115),
(63, 168, 115),
(64, 168, 123),
(65, 169, 124),
(66, 170, 125),
(67, 170, 126),
(68, 171, 125),
(69, 171, 126),
(70, 172, 125),
(71, 172, 127),
(72, 173, 125),
(73, 173, 127),
(74, 174, 125),
(75, 174, 127),
(76, 175, 125),
(77, 175, 127),
(78, 176, 125),
(79, 177, 125),
(80, 177, 127);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `age` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `cat_id`, `question`, `age`) VALUES
(0, 0, 'In welk jaar is de molen gebouwd?', '0-100'),
(1, 1, 'Wat is de Hempenserpoldermolen?', '0-100'),
(2, 2, 'Welk dier vind je WEL in de polder?', '4-8'),
(3, 3, 'Wat is de polder niet?', '0-100'),
(4, 0, 'In welk jaar is de polder drooggelegd?', '0-100');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `user_token` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `progression` varchar(255) NOT NULL,
  `finished` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `user_token`, `group_id`, `score`, `progression`, `finished`) VALUES
(1, '247945a27af056a3e9', 156, 0, 'play', 0),
(2, '103635a27af2c2a992', 156, 0, 'play', 0),
(4, '309555a27b41f1f0c6', 157, 2, 'play|1=1|0=0|2=1', 0),
(5, '179925a27b43848aa2', 157, 2, 'play|1=0|0=1|2=1', 0),
(6, '65695a27b9ac29d57', 158, 0, 'play', 0),
(7, '309555a27b41f1f0c6', 158, 0, 'play', 0),
(8, '309555a27b41f1f0c6', 159, 0, 'play', 0),
(9, '65695a27b9ac29d57', 159, 0, 'play', 0),
(14, '136395a27c6c012c7f', 160, 0, 'play', 0),
(15, '309555a27b41f1f0c6', 160, 0, 'play', 0),
(16, '181185a27e1d9d0066', 161, 0, 'play', 0),
(17, '309555a27b41f1f0c6', 161, 0, 'play', 0),
(22, '309555a27b41f1f0c6', 162, 2, 'play|2=1|1=1|0=0', 0),
(23, '113395a27e2bbd64df', 162, 3, 'play|2=1|0=1|1=1', 0),
(26, '113395a27e2bbd64df', 164, 0, 'play', 0),
(28, '309555a27b41f1f0c6', 164, 0, 'play', 0),
(29, '113395a27e2bbd64df', 163, 0, 'play', 0),
(32, '309555a27b41f1f0c6', 163, 0, 'play', 0),
(33, '309555a27b41f1f0c6', 165, 0, 'play', 0),
(34, '309555a27b41f1f0c6', 166, 0, 'play', 0),
(35, '309555a27b41f1f0c6', 167, 0, 'play', 0),
(36, '309555a27b41f1f0c6', 168, 0, 'play', 0),
(37, '113395a27e2bbd64df', 168, 0, 'play', 0),
(38, '283815a2940071d796', 169, 3, 'play|0=0|1=0|0=1|1=1|0=1', 0),
(39, '24065a2950bc548d6', 170, 5, 'play|2=1|1=1|3=1|0=1|4=1', 0),
(40, '200865a29502ce92cf', 170, 5, 'play|2=1|3=1|0=1|4=1|1=1', 0),
(41, '24065a2950bc548d6', 171, 5, 'play|4=1|0=1|1=1|3=1|2=1', 0),
(42, '200865a29502ce92cf', 171, 3, 'play|1=1|2=1|4=1|0=0|3=0', 0),
(43, '200865a29502ce92cf', 172, 0, 'play', 0),
(44, '90095a29535813a5b', 173, 1, 'play|2=1', 0),
(45, '200865a29502ce92cf', 173, 0, 'play', 0),
(46, '90095a29535813a5b', 174, 5, 'play|3=1|2=1|0=1|4=1|1=1', 0),
(47, '200865a29502ce92cf', 174, 5, 'play|0=1|4=1|1=1|2=1|3=1', 0),
(48, '90095a29535813a5b', 175, 4, 'play|2=1|0=1|4=1|3=1|1=0', 0),
(49, '200865a29502ce92cf', 175, 5, 'play|2=1|1=1|4=1|0=1|3=1', 0),
(50, '200865a29502ce92cf', 177, 0, 'play', 0),
(51, '90095a29535813a5b', 177, 5, 'play|2=1|0=1|4=1|1=1|3=1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `admin_level` int(1) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `age` int(4) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `birthdate` varchar(20) NOT NULL,
  `admin_code` varchar(255) NOT NULL,
  `admin_parent_id` int(11) NOT NULL,
  `waiting` int(1) NOT NULL,
  `waiting_last_ping` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `admin_level`, `user_name`, `surname`, `age`, `session_token`, `birthdate`, `admin_code`, `admin_parent_id`, `waiting`, `waiting_last_ping`) VALUES
(94, 1, 'Admin', 'Admin', 2004, '291785a211440e471d', '12-12-12', '0000', 0, 0, ''),
(98, 0, 'Test', 'Persoon', 2004, '146365a2661f6c2c60', '12-12-12', '', 94, 0, ''),
(99, 0, 'Zonder Test', 'Persoon', 2004, '292475a266204ec454', '12-12-12', '', -1, 0, ''),
(100, 0, 'Zonder Test', 'Persoon', 2004, '173395a2662d5141d9', '12-12-12', '', -1, 0, ''),
(101, 0, 'Zonder Test', 'Persoon', 2004, '2165a2662d8c9b37', '12-12-12', '', 94, 0, ''),
(102, 0, '123', '123', 2004, '3945a2669174d1b6', '12-12-12', '', 94, 1, '1512477375359'),
(104, 0, '123', '123', 22, '300575a268adde36fb', '12-12-1994', '', 94, 0, '1512475399767'),
(105, 0, 'Piet', 'van Keesen', 2004, '286215a2692d24bbea', '12-12-12', '', 94, 0, '1512483030383'),
(107, 0, 'Ahhh', 'Ehhh', 787, '271395a26a98b3e4bd', '12-12-1229', '', 94, 0, '1512483265550'),
(108, 1, 'Hey', 'Arnold', 2004, '9465a26acedd0bde', '12-12-12', '0000', -1, 0, ''),
(109, 1, '123', '123', 2004, '265905a26ad84ebce9', '12-12-12', '0000', -1, 0, '1512548354417'),
(110, 0, '123', '123', 2004, '237915a27a8159ae07', '31-13-12', '', 109, 0, ''),
(111, 0, '321', '123', 2004, '37755a27a83bdf359', '12-12-12', '', 109, 0, ''),
(112, 0, '123', '1234', 2004, '1175a27a8a8e3b7c', '12-12-12', '', 109, 0, '1512549973933'),
(113, 1, 'Test', 'Admin', 22, '247945a27af056a3e9', '12-12-1994', '0000', -1, 0, '1512552720760'),
(114, 0, 'Test', 'Persoon', 24, '103635a27af2c2a992', '12-12-1992', '', 113, 0, '1512551209718'),
(116, 0, 'Mike', 'Platjes', 97, '179925a27b43848aa2', '05-66-1919', '', 115, 0, '1512551547123'),
(117, 0, 'Test', '123', 22, '65695a27b9ac29d57', '12-12-1994', '', 115, 0, '1512555646996'),
(119, 0, 'Qq', 'Qq', 2007, '180545a27bcf24bae0', '10-00-10', '', 115, 0, '1512553881983'),
(120, 0, 'ggggg', 'hhhhhhh', 17, '136395a27c6c012c7f', '01-01-2000', '', 115, 0, '1512561890342'),
(121, 0, 'ghjghk', 'fgjhfghj', 2004, '216655a27e140e046b', '12-12-12', '', 115, 0, '1512563012919'),
(122, 0, 'Fjchcjj', 'Cuucucu', 2004, '181185a27e1d9d0066', '12-12-12', '', 115, 0, '1512563202503'),
(123, 0, 'Test', 'Test', 23, '113395a27e2bbd64df', '13-12-1993', '', 115, 0, '1512569924192'),
(124, 1, 'Klaas', 'Postma', 18, '283815a2940071d796', '10-11-1999', '0000', -1, 0, '1512653151440'),
(125, 1, 'Valesco', 'Bakker', 22, '200865a29502ce92cf', '12-12-1994', '0000', -1, 0, '1512658337663'),
(126, 0, 'Test', 'Gfhgghg', 24, '24065a2950bc548d6', '12-12-1992', '', 125, 0, '1512657388364'),
(127, 0, '123', '123', 1893, '90095a29535813a5b', '12-12-123', '', 125, 0, '1512658346851');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_codes`
--
ALTER TABLE `admin_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_has_categories`
--
ALTER TABLE `group_has_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_has_user`
--
ALTER TABLE `group_has_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_codes`
--
ALTER TABLE `admin_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;
--
-- AUTO_INCREMENT for table `group_has_categories`
--
ALTER TABLE `group_has_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `group_has_user`
--
ALTER TABLE `group_has_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

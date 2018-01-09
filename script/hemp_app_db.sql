-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2018 at 11:20 AM
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
(8, 2, 'Olifant', 0),
(9, 2, 'Grutto', 1),
(10, 2, 'Giraffe', 0),
(11, 2, 'Zebra', 0),
(16, 4, '2001', 0),
(17, 4, '1785', 1),
(18, 4, '1283', 0),
(19, 4, '1622', 0),
(24, 6, '40', 0),
(25, 6, '3', 0),
(26, 6, '5', 0),
(27, 6, '4', 1),
(28, 7, '1', 0),
(29, 7, '1', 1),
(30, 7, '1', 0),
(31, 7, '1', 0),
(40, 10, '1223', 0),
(41, 10, '1441', 0),
(42, 10, '1890', 1),
(43, 10, '1997', 0),
(44, 11, 'Een paleis', 0),
(45, 11, 'Een boerderij', 1),
(46, 11, 'Een winkelcentrum', 0),
(47, 11, 'Een kasteel', 0),
(48, 12, 'Voor veeteelt', 1),
(49, 12, 'Voor jacht', 0),
(50, 12, 'Voor schoon drinkwater', 0),
(51, 12, 'Voor autocross', 0),
(52, 13, 'Om de polder te vullen met water', 0),
(53, 13, 'Het verkrijgen van schoon drinkwater', 0),
(54, 13, 'Meten van windsnelheid', 0),
(55, 13, 'Drooglegging van de polder', 1),
(56, 14, '2,- gulden', 1),
(57, 14, '200.000,- gulden', 0),
(58, 14, '50.000,- gulden', 0),
(59, 14, '1.000.000,- dollars', 0),
(64, 16, 'Gebruiken als broedgebied', 1),
(65, 16, 'De richting vragen naar Afrika', 0),
(66, 16, 'De Hempensermeerpolder App spelen', 0),
(67, 16, 'Darten', 0),
(68, 17, 'Zeer goed weidevogelgebied', 1),
(69, 17, 'Zeer grote polder', 0),
(70, 17, 'Verboden voor weidevogels', 0),
(71, 17, 'Schoon drinkwater', 0),
(72, 18, 'Kolgans', 0),
(73, 18, 'Watersnip', 0),
(74, 18, 'Kievit', 0),
(75, 18, 'Pterodactyl', 1),
(80, 20, 'Een vaarroute', 0),
(81, 20, 'Een fietsroute', 0),
(82, 20, 'Een vliegroute', 1),
(83, 20, 'Een wandelroute', 0),
(88, 22, 'Paardenbloemen', 0),
(89, 22, 'Pinksterbloemen', 0),
(90, 22, 'Boterbloemen', 0),
(91, 22, 'Een reuzenaronskelk', 1),
(112, 28, 'Een houtzaagmolen', 0),
(113, 28, 'Een monnikmolen', 1),
(114, 28, 'Een waterradmolen', 0),
(115, 28, 'Een spinnenkopmolen', 0),
(116, 29, 'Een dieselmotor', 0),
(117, 29, 'Een elektromotor', 0),
(118, 29, 'Een benzinemotor', 1),
(119, 29, 'Er heeft nooit een motor in de molen gezeten', 0),
(120, 30, 'Een broedgebied', 0),
(121, 30, 'Een beschermd natuurgebied', 0),
(122, 30, 'Een schoenenfabriek', 1),
(123, 30, 'Een polder', 0),
(124, 31, '6', 0),
(125, 31, '9', 1),
(126, 31, '12', 0),
(127, 31, '4', 0),
(128, 32, '1863', 1),
(129, 32, '1263', 0),
(130, 32, '1994', 0),
(131, 32, '2008', 0),
(132, 33, 'Het type gras wat er groeit sinds 1772', 0),
(133, 33, 'De grond bestaat uit een speciaal soort klei', 0),
(134, 33, 'Het unieke dambord patroon', 1),
(135, 33, 'Dat er sinds 1445 actief is geteld voor de hoeveelheid Watersnippen', 0);

-- --------------------------------------------------------

--
-- Table structure for table `app_codes`
--

CREATE TABLE `app_codes` (
  `id` int(11) NOT NULL,
  `code` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_codes`
--

INSERT INTO `app_codes` (`id`, `code`) VALUES
(1, 4997);

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
  `max_questions` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `time_created`, `categories`, `started`, `group_admin`, `max_questions`) VALUES
(286, '123', '"2017-12-20"', '0,1,2,3', 1, '313975a3a19cb0ee51', 1),
(287, '123', '"2017-12-20"', '0,1,2,3', 1, '313975a3a19cb0ee51', 1),
(288, 'Agghh', '"2017-12-20"', '0,1,2,3', 1, '313975a3a19cb0ee51', 1),
(289, 'test', '"2018-01-02"', '0,1,2,3', 1, '302975a4b519f023ed', 4),
(290, 'test2', '"2018-01-02"', '0,1,2,3', 1, '302975a4b519f023ed', 1),
(291, 'shiueeet', '"2018-01-02"', '0,1,2,3', 1, '302975a4b519f023ed', 1),
(292, 'Test Groep', '"2018-01-08"', '0,1,2,3', 1, '246515a5334e7e70a4', 3),
(293, 'Test Groep', '"2018-01-08"', '0,1,2,3', 1, '246515a5334e7e70a4', 3);

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
(164, 213, 147),
(165, 213, 149),
(166, 214, 147),
(167, 214, 149),
(168, 215, 147),
(169, 215, 150),
(170, 215, 151),
(171, 216, 147),
(172, 217, 147),
(173, 218, 147),
(174, 219, 147),
(175, 220, 147),
(176, 221, 147),
(177, 222, 147),
(178, 223, 147),
(179, 224, 147),
(180, 225, 147),
(181, 226, 147),
(182, 227, 147),
(183, 228, 147),
(184, 229, 147),
(185, 230, 147),
(186, 231, 147),
(187, 232, 147),
(188, 233, 147),
(189, 234, 147),
(190, 235, 147),
(191, 236, 147),
(192, 237, 147),
(193, 238, 147),
(194, 239, 147),
(195, 240, 147),
(196, 241, 147),
(197, 242, 147),
(198, 243, 147),
(199, 244, 147),
(200, 244, 152),
(201, 245, 147),
(202, 246, 147),
(203, 247, 147),
(204, 247, 152),
(205, 248, 147),
(206, 248, 152),
(207, 249, 147),
(208, 249, 152),
(209, 250, 147),
(210, 251, 147),
(211, 252, 147),
(212, 253, 147),
(213, 254, 147),
(214, 255, 147),
(215, 255, 152),
(216, 256, 153),
(217, 256, 154),
(218, 257, 153),
(219, 257, 154),
(220, 257, 155),
(221, 258, 156),
(222, 259, 156),
(223, 260, 158),
(224, 260, 159),
(225, 261, 158),
(226, 261, 159),
(227, 262, 160),
(228, 262, 161),
(229, 263, 162),
(230, 264, 164),
(231, 265, 166),
(232, 266, 168),
(233, 266, 169),
(234, 267, 170),
(235, 268, 170),
(236, 269, 170),
(237, 269, 172),
(238, 270, 170),
(239, 270, 171),
(240, 270, 173),
(241, 271, 170),
(242, 271, 171),
(243, 271, 173),
(244, 272, 170),
(245, 272, 173),
(246, 273, 170),
(247, 274, 170),
(248, 275, 170),
(249, 276, 170),
(250, 277, 170),
(251, 277, 174),
(252, 278, 170),
(253, 279, 170),
(254, 280, 170),
(255, 281, 170),
(256, 282, 170),
(257, 283, 170),
(258, 284, 170),
(259, 285, 170),
(260, 286, 170),
(261, 287, 170),
(262, 288, 170),
(263, 289, 175),
(264, 289, 176),
(265, 290, 175),
(266, 290, 176),
(267, 291, 175),
(268, 291, 176),
(269, 292, 177),
(270, 292, 178),
(271, 293, 177),
(272, 293, 178);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `age_start` varchar(2) NOT NULL,
  `age_stop` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `cat_id`, `question`, `age_start`, `age_stop`) VALUES
(2, 2, 'Welk dier vind je WEL in de polder?', '0', 100),
(4, 0, 'In welk jaar is de polder drooggelegd?', '0', 100),
(6, 1, 'Hoeveel wieken heeft de molen?', '0', 100),
(10, 0, 'In welk jaar is de waterschap opgericht?', '0', 100),
(11, 0, 'Wat werd er in 1788 aan de noordkant van de polder gebouwd?', '0', 100),
(12, 0, 'Waarvoor werd de polder WEL gebruikt?', '0', 100),
(13, 1, 'Waar is de molen WEL voor gebruikt?', '0', 100),
(14, 0, 'Voor hoeveel is de molen in 1959 verkocht?', '0', 100),
(16, 2, 'Wat doen vogels op de polder?', '0', 100),
(17, 2, 'Welke kwalificatie heeft de Hempensermeerpolder?', '20', 100),
(18, 2, 'Welke van deze vogels horen hier niet tussen?', '0', 100),
(20, 3, 'Welke van deze onderstaande routes vind je NIET op de polder?', '0', 100),
(22, 2, 'Wat voor planten groeien er op het gebied NIET?', '0', 100),
(28, 1, 'Wat is de Hempenserpoldermolen?', '0', 100),
(29, 1, 'Wat voor type motor heeft er NIET in de molen gezeten?', '0', 100),
(30, 3, 'Wat is de polder niet?', '0', 100),
(31, 3, 'In hoeveel vakken is de polder verdeeld?', '0', 100),
(32, 0, 'In welk jaar is de molen gebouwd?', '14', 80),
(33, 3, 'Wat is er bijzonder aan het gebied?', '20', 100);

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
(51, '90095a29535813a5b', 177, 5, 'play|2=1|0=1|4=1|1=1|3=1', 0),
(52, '311145a2a4a15f181f', 178, 4, 'play|3=1.14|0=1.0|4=0.16|1=1.5|2=1.9', 0),
(53, '183935a2a4ab16a85d', 178, 5, 'play|3=1.14|1=1.5|2=1.9|0=1.0|4=1.17', 0),
(54, '164525a2a4abedd701', 178, 4, 'play|1=0.4|0=1.0|4=1.17|2=1.9|3=1.14', 0),
(55, '280715a2a4bcac959f', 179, 5, 'play|1=1.5|2=1.9|0=1.0|4=1.17|3=1.14', 0),
(57, '326175a2a4c1803251', 179, 4, 'play|1=1.5|0=1.0|4=0.19|2=1.9|3=1.14', 0),
(58, '276305a2a62cc324bf', 180, 0, 'play', 0),
(59, '252835a2a62c72b643', 180, 0, 'play', 0),
(60, '276305a2a62cc324bf', 181, 5, 'play|3=1.14|2=1.9|1=1.5|4=1.17|0=1.0', 0),
(61, '252835a2a62c72b643', 181, 5, 'play|1=1.5|3=1.14|4=1.17|0=1.0|2=1.9', 0),
(62, '252835a2a62c72b643', 182, 1, 'play|1=1.5', 0),
(63, '252835a2a62c72b643', 183, 0, 'play|3=0.13', 0),
(64, '252835a2a62c72b643', 184, 1, 'play|3=1.14', 0),
(65, '276305a2a62cc324bf', 184, 1, 'play|3=1.14', 0),
(66, '276305a2a62cc324bf', 185, 2, 'play|3=1.14|0=1.0|4=0.18', 0),
(67, '252835a2a62c72b643', 185, 1, 'play|3=1.14|4=0.18|0=0.2', 0),
(68, '276305a2a62cc324bf', 186, 5, 'play|0=1.0|4=1.17|2=1.9|1=1.5|3=1.14', 0),
(69, '252835a2a62c72b643', 186, 3, 'play|1=1.5|4=0.16|0=0.1|3=1.14|2=1.9', 0),
(71, '252835a2a62c72b643', 187, 4, 'play|4=1.17|0=1.0|1=1.5|3=0.13|2=1.9', 0),
(72, '90435a2e4ac013007', 188, 5, 'play|1=1.5|2=1.9|3=1.14|0=1.0|4=1.17', 0),
(73, '267235a2e4a9f3db85', 188, 5, 'play|3=1.14|4=1.17|0=1.0|1=1.5|2=1.9', 0),
(74, '35605a2e4b536e5ac', 189, 2, 'play|3=1.14|2=0.10|0=1.0|4=0.18|1=0.6', 0),
(75, '253855a2fb5814c04f', 190, 0, 'play', 0),
(76, '49125a2fddd005b09', 191, 6, 'play|1=1.5|5=1.23|4=1.17|0=1.0|2=1.9|3=1.14', 0),
(77, '50595a2fde0cae880', 191, 6, 'play|5=1.23|1=1.5|0=1.0|4=1.17|2=1.9|3=1.14', 0),
(78, '50595a2fde0cae880', 192, 1, 'play|2=1.9', 0),
(79, '49125a2fddd005b09', 192, 1, 'play|2=1.9', 0),
(80, '264955a3251bb4ed46', 193, 17, 'play|19=1.78|21=1.84|20=1.82|3=1.14|4=1.17|14=1.56|26=1.104|10=1.42|12=1.48|11=1.45|29=1.118|28=1.113|6=1.27|13=1.55|16=1.64|18=1.75|17=0.71|22=1.91|2=0.11', 0),
(81, '174135a32521d6a34f', 193, 14, 'play|18=1.75|22=1.91|16=1.64|17=1.68|2=1.9|26=1.104|14=1.56|11=0.44|12=1.48|10=1.42|4=0.16|13=1.55|6=1.27|29=0.119|28=1.113|21=0.85|20=1.82|3=1.14|19=0.77', 0),
(82, '137295a3253315712d', 194, 1, 'play|26=1.104', 0),
(83, '144575a3253114939e', 194, 0, 'play|14=0.58|12=0.49|26=0.105|4=0.16|11=0.44|10=0.41', 0),
(84, '152305a33bd6a11b2b', 195, 0, 'play', 0),
(85, '136035a33bda7d3e23', 195, 0, 'play', 0),
(98, '35015a377aff8f89c', 214, 1, 'play|13=0.54|29=1.118|28=0.114|6=0.25', 0),
(99, '64435a377e03e4097', 214, 3, 'play|13=1.55|6=0.26|29=1.118|28=1.113', 0),
(106, '64235a378132ed2ed', 215, 6, 'play|16=1.64|22=0.89|17=0.69|18=0.73|2=0.10|4=1.17|26=0.105|12=1.48|10=0.41|11=1.45|14=0.57|21=0.85|3=0.13|19=0.77|20=0.81|29=1.118|13=0.53|28=1.113|6=0.25', 0),
(107, '35015a377aff8f89c', 215, 5, 'play|2=1.9|22=0.90|17=0.69|16=0.66|18=0.74|4=1.17|11=0.44|10=0.41|12=0.49|14=1.56|26=1.104|29=0.117|28=0.112|13=0.53|6=0.25|20=0.81|3=0.13|19=1.78|21=0.85', 0),
(108, '28275a37846919a99', 215, 5, 'play|19=0.77|20=0.81|21=0.86|3=1.14|16=0.66|2=0.8|18=0.73|22=0.89|17=1.68|12=0.49|10=0.40|11=0.44|26=1.104|4=0.18|14=1.56|29=1.118|13=0.53|28=0.112|6=0.24', 0),
(109, '35015a377aff8f89c', 213, 0, 'play', 0),
(110, '35015a377aff8f89c', 216, 2, 'play|16=0.67|2=1.9|18=0.73|22=0.90|17=1.68', 0),
(111, '35015a377aff8f89c', 217, 1, 'play|3=0.15|20=0.81|21=0.87|19=1.78', 0),
(112, '35015a377aff8f89c', 218, 2, 'play|21=0.87|3=0.12|20=1.82|19=1.78', 0),
(113, '35015a377aff8f89c', 219, 2, 'play|22=0.90|2=1.9|16=0.66|17=1.68|18=0.74', 0),
(114, '35015a377aff8f89c', 220, 2, 'play|6=1.27|13=0.53|28=0.114|29=1.118', 0),
(115, '35015a377aff8f89c', 221, 2, 'play|21=0.87|19=0.79|20=1.82|3=1.14', 0),
(116, '35015a377aff8f89c', 222, 3, 'play|19=1.78|20=1.82|3=1.14|21=0.87', 0),
(117, '35015a377aff8f89c', 223, 2, 'play|20=1.82|3=1.14|19=0.79|21=0.85', 0),
(118, '35015a377aff8f89c', 224, 3, 'play|20=1.82|21=0.87|19=1.78|3=1.14', 0),
(119, '35015a377aff8f89c', 225, 0, 'play', 0),
(120, '35015a377aff8f89c', 226, 3, 'play|19=1.78|20=1.82|21=0.87|3=1.14', 0),
(121, '35015a377aff8f89c', 227, 3, 'play|19=1.78|3=1.14|21=0.87|20=1.82', 0),
(122, '35015a377aff8f89c', 228, 2, 'play|19=1.78|20=1.82|21=0.87|3=0.15', 0),
(123, '35015a377aff8f89c', 229, 2, 'play|13=0.54|6=1.27|29=1.118|28=0.114', 0),
(124, '35015a377aff8f89c', 230, 3, 'play|21=0.87|19=1.78|20=1.82|3=1.14', 0),
(125, '35015a377aff8f89c', 231, 3, 'play|19=1.78|21=0.87|3=1.14|20=1.82', 0),
(126, '35015a377aff8f89c', 232, 2, 'play|20=1.82|19=0.79|21=0.87|3=1.14', 0),
(127, '35015a377aff8f89c', 233, 1, 'play|19=1.78|21=0.87|20=0.81|3=0.13', 0),
(128, '35015a377aff8f89c', 234, 3, 'play|6=1.27|13=0.54|28=1.113|29=1.118', 0),
(129, '35015a377aff8f89c', 235, 2, 'play|28=0.114|13=0.54|29=1.118|6=1.27', 0),
(130, '35015a377aff8f89c', 236, 4, 'play|2=1.9|16=1.64|17=1.68|18=0.74|22=1.91', 0),
(131, '35015a377aff8f89c', 237, 3, 'play|19=1.78|21=0.87|3=1.14|20=1.82', 0),
(132, '35015a377aff8f89c', 238, 3, 'play|20=1.82|21=0.87|19=1.78|3=1.14', 0),
(133, '35015a377aff8f89c', 239, 2, 'play|20=1.82|21=0.87|3=0.13|19=1.78', 0),
(134, '35015a377aff8f89c', 240, 2, 'play|4=0.18|26=1.104|14=1.56|10=0.40|11=0.44|12=0.50', 0),
(135, '35015a377aff8f89c', 241, 1, 'play|21=0.87|3=0.12|20=0.83|19=1.78', 0),
(136, '35015a377aff8f89c', 242, 3, 'play|3=1.14|21=0.85|19=1.78|20=1.82', 0),
(137, '35015a377aff8f89c', 243, 10, 'play|2=1.9|22=1.91|17=1.68|16=0.67|18=1.75|26=1.104|10=0.41|11=0.46|4=0.16|12=0.49|14=0.58|21=0.87|3=0.12|20=1.82|19=1.78|13=1.55|6=1.27|29=1.118|28=0.115', 0),
(138, '35015a377aff8f89c', 244, 6, 'play|6=1.27|29=1.118|28=0.112|13=0.52|26=0.105|14=1.56|10=1.42|12=0.50|11=0.44|4=0.18|21=0.87|19=0.77|3=0.13|20=0.80|17=0.71|16=0.67|22=1.91|2=0.10|18=1.75', 0),
(139, '131215a37affde9604', 244, 9, 'play|11=1.45|10=1.42|12=0.50|26=0.106|4=0.16|14=1.56|28=1.113|29=1.118|6=1.27|13=0.54|3=1.14|21=0.87|20=0.81|19=1.78|2=1.9|16=0.66|22=0.90|18=0.74|17=0.69', 0),
(140, '35015a377aff8f89c', 245, 0, 'play', 0),
(141, '35015a377aff8f89c', 246, 2, 'play|18=0.74|16=1.64|2=1.9|17=0.70|22=0.88', 0),
(142, '131215a37affde9604', 247, 2, 'play|19=1.78|20=0.81|3=0.13|21=1.84', 0),
(143, '35015a377aff8f89c', 247, 1, 'play|19=0.77|3=1.14|21=0.87|20=0.81', 0),
(144, '35015a377aff8f89c', 248, 1, 'play|28=1.113|13=0.53|6=0.25|29=0.116', 0),
(145, '131215a37affde9604', 248, 0, 'play', 0),
(146, '131215a37affde9604', 249, 2, 'play|19=1.78|20=1.82|3=0.13|21=0.87', 0),
(147, '35015a377aff8f89c', 249, 1, 'play|21=0.87|3=0.13|20=0.81|19=1.78', 0),
(148, '35015a377aff8f89c', 250, 0, 'play|16=0.66|18=0.72|22=0.90|2=0.11|17=0.69', 0),
(149, '35015a377aff8f89c', 251, 0, 'play|20=0.81|21=0.87|19=0.76|3=0.13', 0),
(150, '35015a377aff8f89c', 252, 2, 'play|29=1.118|6=0.25|13=0.52|28=1.113', 0),
(151, '35015a377aff8f89c', 253, 3, 'play|13=1.55|28=0.112|29=1.118|6=0.24|3=0.15|19=1.78|20=0.80|21=0.86', 0),
(152, '35015a377aff8f89c', 254, 7, 'play|3=1.14|20=1.82|19=1.78|21=0.87|13=1.55|28=1.113|29=1.118|6=1.27', 0),
(153, '35015a377aff8f89c', 255, 6, 'play|2=1.9|18=0.73|17=0.69|22=0.88|16=0.66|4=1.17|11=1.45|26=1.104|10=0.41|14=0.58|12=0.51|29=0.117|6=0.24|13=0.53|28=0.114|3=0.13|19=1.78|20=1.82|21=0.85', 0),
(154, '131215a37affde9604', 255, 8, 'play|17=1.68|22=0.90|16=0.66|18=0.74|2=0.10|19=1.78|3=1.14|21=1.84|20=0.81|6=0.24|13=1.55|29=1.118|28=1.113|26=0.105|10=0.40|11=1.45|14=0.58|12=0.50|4=0.18', 0),
(155, '245185a37b6e155c3b', 256, 9, 'play|19=1.78|20=1.82|21=0.86|3=0.15|29=0.117|6=1.27|13=0.53|28=1.113|11=1.45|10=1.42|12=1.48|26=0.105|14=1.56|4=1.17', 0),
(158, '80325a37b6d355830', 256, 1, 'play|12=1.48|14=0.57|26=0.106|11=0.47|10=0.40|4=0.16|13=0.53|6=0.25|29=0.117|28=0.112|19=0.77|20=0.80|3=0.13|21=0.85', 0),
(159, '80325a37b6d355830', 257, 0, 'play|3=0.12|20=0.81|19=0.77|21=0.85', 0),
(160, '245185a37b6e155c3b', 257, 1, 'play|20=0.81|19=0.79|3=1.14|21=0.85', 0),
(161, '296815a37b7e9c1083', 257, 2, 'play|19=1.78|3=0.12|21=1.84|20=0.80', 0),
(162, '260135a37b84422786', 258, 2, 'play|20=0.81|21=0.87|3=1.14|19=1.78', 0),
(163, '260135a37b84422786', 259, 2, 'play|21=0.87|20=0.81|3=1.14|19=1.78', 0),
(164, '247565a38c98b43217', 260, 3, 'play|4=0.16|12=1.48|11=0.44|10=0.40|14=1.56|26=1.104', 0),
(165, '226495a38c98e1e91f', 260, 0, 'play|11=0.44|12=0.49|14=0.57|10=0.41|26=0.105|4=0.16', 0),
(166, '247565a38c98b43217', 261, 5, 'play|3=0.12|19=0.76|20=0.80|21=1.84|17=0.69|18=0.72|22=0.88|2=0.8|16=1.64|14=0.57|12=1.48|11=0.44|10=0.41|26=1.104|4=1.17|6=0.25|13=0.52|29=0.116|28=0.112', 0),
(167, '226495a38c98e1e91f', 261, 5, 'play|14=0.57|12=0.49|11=1.45|4=1.17|10=1.42|26=0.105|2=0.11|22=0.88|16=0.66|17=0.69|18=0.73|19=1.78|3=0.13|21=0.85|20=0.80|28=0.114|29=1.118|13=0.54|6=0.25', 0),
(168, '240875a38d0a7ab9e9', 262, 13, 'play|6=1.27|13=0.52|28=0.112|29=0.117|16=1.64|22=1.91|17=1.68|2=1.9|18=1.75|14=1.56|26=1.104|11=1.45|10=1.42|4=0.16|12=1.48|3=1.14|20=1.82|19=0.77|21=0.86', 0),
(169, '147825a38d07f112cf', 262, 12, 'play|14=1.56|11=1.45|26=1.104|4=1.17|12=0.49|10=1.42|28=1.113|6=1.27|29=1.118|13=0.52|16=0.66|17=0.70|22=0.90|2=1.9|18=0.74|20=1.82|19=1.78|3=1.14|21=0.87', 0),
(170, '222475a38d49fb3dd2', 263, 0, 'play|21=0.87', 0),
(171, '114955a38d6fcd3cc3', 264, 4, 'play|13=1.55|29=1.118|6=1.27|28=1.113', 0),
(172, '8215a38ec4ae3ab4', 265, 19, 'play|4=1.17|14=1.56|26=1.104|12=1.48|11=1.45|10=1.42|16=1.64|17=1.68|18=1.75|22=1.91|2=1.9|30=1.122|20=1.82|21=1.84|19=1.78|6=1.27|13=1.55|29=1.118|28=1.113', 0),
(173, '81885a3913937265a', 266, 19, 'play|30=1.122|19=1.78|20=1.82|21=1.84|14=1.56|11=1.45|10=1.42|4=1.17|26=1.104|12=1.48|18=1.75|17=1.68|16=1.64|22=1.91|2=1.9|13=1.55|29=1.118|6=1.27|28=1.113', 0),
(174, '172735a39137eae0fe', 266, 11, 'play|22=0.90|2=1.9|17=1.68|16=1.64|18=0.73|28=1.113|13=0.53|29=1.118|6=0.26|30=1.122|21=1.84|20=1.82|19=1.78|14=1.56|26=0.107|10=0.43|12=0.49|11=1.45|4=0.16', 0),
(176, '227585a3a1acc53e10', 270, 0, 'play', 0),
(177, '135945a3a1aa966c2e', 270, 0, 'play', 0),
(178, '233615a3a1aa96a987', 269, 0, 'play', 0),
(180, '135945a3a1aa966c2e', 271, 3, 'play', 0),
(181, '227585a3a1acc53e10', 272, 11, 'play', 0),
(183, '313975a3a19cb0ee51', 276, 4, 'play', 0),
(185, '134775a3a2dcac5e09', 277, 17, 'play', 0),
(187, '313975a3a19cb0ee51', 280, 0, 'play', 0),
(188, '313975a3a19cb0ee51', 281, 0, 'play', 0),
(189, '313975a3a19cb0ee51', 282, 1, 'play', 0),
(191, '313975a3a19cb0ee51', 283, 4, 'play', 0),
(192, '313975a3a19cb0ee51', 284, 0, 'play', 0),
(193, '313975a3a19cb0ee51', 285, 6, 'play|10=1.42|12=1.48|13=0.54|6=0.24|20=1.82|33=1.134|22=1.91|17=1.68', 0),
(194, '313975a3a19cb0ee51', 287, 4, 'play', 0),
(196, '313975a3a19cb0ee51', 288, 4, 'play|18=1.75|29=1.118|10=1.42|20=1.82', 0),
(198, '128305a4b51a8083eb', 289, 2, 'play', 0),
(199, '128305a4b51a8083eb', 290, 4, 'play', 0),
(202, '128305a4b51a8083eb', 291, 1, 'play|4=1.17', 0),
(204, '26005a53362d97f28', 293, 6, 'play|16=1.64|2=1.9|18=1.75|28=1.113|6=1.27|29=1.118', 0);

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
  `waiting_last_ping` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `admin_level`, `user_name`, `surname`, `age`, `session_token`, `birthdate`, `admin_code`, `admin_parent_id`, `waiting`, `waiting_last_ping`, `password`) VALUES
(162, 2, 'Admin', '', 0, '222475a38d49fb3dd2', '', '', 0, 0, '1513674381161', '$2y$10$yqqeUYO4eGklQTMwfhOMWuv5jdzacUnr4M891JQcnj7docF2A96LW'),
(170, 1, '123', '123', 25, '313975a3a19cb0ee51', '12-12-1992', '0000', -1, 0, '1513845794615', ''),
(174, 0, 'test', '123', 67, '134775a3a2dcac5e09', '12-12-1950', '', 170, 0, '1513762262333', ''),
(175, 1, 'bitcoin', 'is kut', 25, '302975a4b519f023ed', '12-12-1992', '0000', -1, 0, '1514887206998', ''),
(176, 0, 'aaahh', 'test', 25, '128305a4b51a8083eb', '12-12-1992', '', 175, 0, '1514887187156', ''),
(177, 1, 'Test Verslag', 'Persoon', 24, '246515a5334e7e70a4', '01-01-1994', '0000', -1, 0, '1515403097560', ''),
(178, 0, 'Test', 'Deelnemer', 19, '26005a53362d97f28', '02-02-1998', '', 177, 0, '1515402990223', '');

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
-- Indexes for table `app_codes`
--
ALTER TABLE `app_codes`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
--
-- AUTO_INCREMENT for table `app_codes`
--
ALTER TABLE `app_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;
--
-- AUTO_INCREMENT for table `group_has_user`
--
ALTER TABLE `group_has_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

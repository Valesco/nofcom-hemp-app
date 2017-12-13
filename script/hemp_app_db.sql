-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2017 at 10:35 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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
(12, 3, 'Een broedgebied', 0),
(13, 3, 'Een beschermd natuurgebied', 0),
(14, 3, 'Een cementfabriek', 1),
(15, 3, 'Een polder', 0),
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
(76, 19, 'Het type gras wat er groeit sinds 1772', 0),
(77, 19, 'De grond bestaat uit een speciaal soort klei', 0),
(78, 19, 'Het unieke dambord patroon', 1),
(79, 19, 'Dat er sinds 1445 actief is geteld voor de hoeveelheid Watersnippen', 0),
(80, 20, 'Een vaarroute', 0),
(81, 20, 'Een fietsroute', 0),
(82, 20, 'Een vliegroute', 1),
(83, 20, 'Een wandelroute', 0),
(84, 21, '6', 1),
(85, 21, '9', 0),
(86, 21, '12', 0),
(87, 21, '4', 0),
(88, 22, 'Paardenbloemen', 0),
(89, 22, 'Pinksterbloemen', 0),
(90, 22, 'Boterbloemen', 0),
(91, 22, 'Een reuzenaronskelk', 1),
(104, 26, '1863', 1),
(105, 26, '1263', 0),
(106, 26, '1994', 0),
(107, 26, '2008', 0),
(112, 28, 'Een houtzaagmolen', 0),
(113, 28, 'Een monnikmolen', 1),
(114, 28, 'Een waterradmolen', 0),
(115, 28, 'Een spinnenkopmolen', 0),
(116, 29, 'Een dieselmotor', 0),
(117, 29, 'Een elektromotor', 0),
(118, 29, 'Een benzinemotor', 1),
(119, 29, 'Er heeft nooit een motor in de molen gezeten', 0);

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
(155, 'Groep A', '\"2017-12-04\"', '\"0,1,2,3\"', 0, '291785a211440e471d', 0),
(156, 'test', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '247945a27af056a3e9', 0),
(157, 'Bruine banaan', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(158, 'Testgroep', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(159, 'Af', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(160, 'Groep A', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(161, '1234', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(162, 'test', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(163, '123', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(164, '12314141', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(165, '123', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(166, '123', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(167, '123', '\"2017-12-06\"', '\"0,1,2,3\"', 1, '309555a27b41f1f0c6', 0),
(168, '123', '\"2017-12-06\"', '', 1, '309555a27b41f1f0c6', 0),
(169, 'Iphone test beheerder', '\"2017-12-07\"', '', 1, '283815a2940071d796', 0),
(170, 'test', '\"2017-12-07\"', '', 1, '200865a29502ce92cf', 0),
(171, 'test', '\"2017-12-07\"', '', 1, '200865a29502ce92cf', 0),
(172, 'Hahaga', '\"2017-12-07\"', '', 1, '200865a29502ce92cf', 0),
(173, 'Test', '\"2017-12-07\"', '', 1, '200865a29502ce92cf', 0),
(174, 'Yyyyy', '\"2017-12-07\"', '', 1, '200865a29502ce92cf', 0),
(175, 'Dhfhfju', '\"2017-12-07\"', '', 1, '200865a29502ce92cf', 0),
(176, 'Fjgjgj', '\"2017-12-07\"', '', 0, '200865a29502ce92cf', 0),
(177, 'Fbfhgjgjgk', '\"2017-12-07\"', '', 1, '200865a29502ce92cf', 0),
(178, 'Test', '\"2017-12-07\"', '', 0, '11723732515a2972b04aca9', 0),
(179, 'Test', '\"2017-12-07\"', '', 1, '11723732515a2972b04aca9', 0),
(180, 'test', '\"2017-12-07\"', '0', 1, '10883640255a297679ec2a8', 0),
(181, '123', '\"2017-12-07\"', '0', 1, '10883640255a297679ec2a8', 0),
(182, '14141', '\"2017-12-07\"', '0', 1, '10883640255a297679ec2a8', 0),
(183, '1111', '\"2017-12-07\"', '2', 1, '10883640255a297679ec2a8', 0),
(184, '414141', '\"2017-12-07\"', '0,2', 1, '10883640255a297679ec2a8', 0),
(185, '414141', '\"2017-12-07\"', '0,1,2,3', 1, '10883640255a297679ec2a8', 0),
(186, '123', '\"2017-12-07\"', '1', 1, '10883640255a297679ec2a8', 0),
(187, 'test', '\"2017-12-07\"', '0,2,3', 1, '16037451435a299e934c8a4', 0),
(188, 'opnieuw', '\"2017-12-07\"', '0,2,3', 1, '16037451435a299e934c8a4', 0),
(189, 'ff', '\"2017-12-07\"', '3', 1, '16037451435a299e934c8a4', 0),
(190, '123', '\"2017-12-07\"', '0,1,2,3', 1, '16037451435a299e934c8a4', 0),
(191, '4141', '\"2017-12-07\"', '0,1,2,3', 1, '16037451435a299e934c8a4', 0),
(192, 'Jacket', '\"2017-12-08\"', '0,1,2,3', 1, '17931016475a29c94f00d10', 0),
(193, '123', '\"2017-12-10\"', '0,1,2,3', 1, '8917433725a2d92c5287be', 0),
(194, '123', '\"2017-12-10\"', '0,1,2,3', 1, '8917433725a2d92c5287be', 0),
(195, 'test', '\"2017-12-13\"', '0,1,2,3', 1, '15316217395a317cbc3935d', 0);

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
(80, 177, 127),
(81, 178, 129),
(82, 179, 129),
(83, 179, 128),
(84, 180, 130),
(85, 181, 130),
(86, 182, 130),
(87, 183, 130),
(88, 184, 130),
(89, 185, 130),
(90, 186, 130),
(91, 187, 131),
(92, 187, 132),
(93, 188, 131),
(94, 188, 132),
(95, 189, 131),
(96, 189, 132),
(97, 190, 131),
(98, 191, 131),
(99, 192, 134),
(100, 192, 136),
(101, 193, 138),
(102, 194, 138),
(103, 195, 144);

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
(2, 2, 'Welk dier vind je WEL in de polder?', '4-8'),
(3, 3, 'Wat is de polder niet?', '0-100'),
(4, 0, 'In welk jaar is de polder drooggelegd?', '0-100'),
(6, 1, 'Hoeveel wieken heeft de molen?', ''),
(10, 0, 'In welk jaar is de waterschap opgericht?', ''),
(11, 0, 'Wat werd er in 1788 aan de noordkant van de polder gebouwd?', ''),
(12, 0, 'Waarvoor werd de polder WEL gebruikt?', ''),
(13, 1, 'Waar is de molen WEL voor gebruikt?', ''),
(14, 0, 'Voor hoeveel is de molen in 1959 verkocht?', ''),
(16, 2, 'Wat doen vogels op de polder?', ''),
(17, 2, 'Welke kwalificatie heeft de Hempensermeerpolder?', ''),
(18, 2, 'Welke van deze vogels horen hier niet tussen?', ''),
(19, 3, 'Wat is er bijzonder aan het gebied?', ''),
(20, 3, 'Welke van deze onderstaande routes vind je NIET op de polder?', ''),
(21, 3, 'In hoeveel vakken is de polder verdeeld?', ''),
(22, 2, 'Wat voor planten groeien er op het gebied NIET?', ''),
(26, 0, 'In welk jaar is de molen gebouwd?', ''),
(28, 1, 'Wat is de Hempenserpoldermolen?', ''),
(29, 1, 'Wat voor type motor heeft er NIET in de molen gezeten?', '');

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
(53, '11723732515a2972b04aca9', 179, 4, 'play|1=1|2=1|3=1|4=0|0=1', 0),
(54, '353304045a29643aeedc8', 179, 5, 'play|1=1|0=1|4=1|2=1|3=1', 0),
(55, '10883640255a297679ec2a8', 180, 5, 'play|4=1|0=1|2=1|1=1|3=1', 0),
(56, '10883640255a297679ec2a8', 181, 0, 'play', 0),
(57, '10883640255a297679ec2a8', 182, 2, 'play|0=1|4=1', 0),
(58, '10883640255a297679ec2a8', 183, 1, 'play|2=1', 0),
(59, '10883640255a297679ec2a8', 184, 3, 'play|4=1|0=1|2=1', 0),
(60, '10883640255a297679ec2a8', 185, 5, 'play|3=1|2=1|1=1|0=1|4=1', 0),
(61, '10883640255a297679ec2a8', 186, 1, 'play|1=1.5', 0),
(62, '2215558545a299e9a1978a', 187, 0, 'play', 0),
(63, '16037451435a299e934c8a4', 187, 0, 'play', 0),
(64, '2215558545a299e9a1978a', 188, 4, 'play|3=1.14|2=1.9|0=1.0|4=1.17', 0),
(65, '16037451435a299e934c8a4', 188, 1, 'play|4=1.17|0=0.3|3=0.12|2=0.8', 0),
(66, '16037451435a299e934c8a4', 189, 1, 'play|3=1.14', 0),
(67, '2215558545a299e9a1978a', 189, 0, 'play|3=0.13', 0),
(68, '16037451435a299e934c8a4', 190, 5, 'play|1=1.5|3=1.14|4=1.17|0=1.0|2=1.9', 0),
(69, '16037451435a299e934c8a4', 191, 1, 'play|1=1.5', 0),
(70, '21301123615a29c9db6938d', 192, 5, 'play|2=1.9|3=1.14|1=1.5|0=1.0|4=1.17', 0),
(72, '17931016475a29c94f00d10', 192, 3, 'play|4=1.17|0=1.0|3=0.13|2=1.9|1=0.4', 0),
(74, '8917433725a2d92c5287be', 193, 3, 'play|1=1.5|3=0.12|2=1.9|4=0.18|0=1.0', 0),
(79, '8917433725a2d92c5287be', 194, 0, 'play', 0),
(81, '15316217395a317cbc3935d', 195, 1, 'play|16=0.66|2=1.9', 0);

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
(139, 2, 'Admin', '', 0, '21301123615a29c9db6938d', '', '', -1, 0, '', '$2y$10$dvoEaBcIR1iUYh2tjqV8tuMLH.qvWIetkYuraP5vmYlSsHBGaPi0a'),
(144, 1, '123', '123', 25, '15316217395a317cbc3935d', '12-12-1992', '0000', -1, 0, '1513192709807', '');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `group_has_categories`
--
ALTER TABLE `group_has_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `group_has_user`
--
ALTER TABLE `group_has_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

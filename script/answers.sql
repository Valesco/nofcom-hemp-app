-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2017 at 10:37 PM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

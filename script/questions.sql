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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

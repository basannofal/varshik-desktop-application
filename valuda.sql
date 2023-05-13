-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2023 at 03:54 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `valuda`
--

-- --------------------------------------------------------

--
-- Table structure for table `clan`
--

CREATE TABLE `clan` (
  `id` int(11) NOT NULL,
  `clan_name` varchar(50) NOT NULL,
  `parent_clan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clan`
--

INSERT INTO `clan` (`id`, `clan_name`, `parent_clan`) VALUES
(3, 'basan', NULL),
(4, 'kadival', 0),
(6, 'madhiya', 3),
(8, 'valuda', NULL),
(12, 'jagarala', 10),
(13, 'sunasara', 12),
(14, 'maknojiya', 12),
(25, 'nodoliya', 8);

-- --------------------------------------------------------

--
-- Table structure for table `expense_category`
--

CREATE TABLE `expense_category` (
  `id` int(11) NOT NULL,
  `e_category` varchar(20) NOT NULL,
  `e_subcategory` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense_category`
--

INSERT INTO `expense_category` (`id`, `e_category`, `e_subcategory`) VALUES
(1, 'Tea', NULL),
(4, 'Chay', 1),
(5, 'Lightbill', NULL),
(6, 'water', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `expense_master`
--

CREATE TABLE `expense_master` (
  `id` int(11) NOT NULL,
  `e_title` varchar(50) NOT NULL,
  `e_disc` varchar(50) NOT NULL,
  `e_date` date NOT NULL,
  `e_expense_by` varchar(50) NOT NULL,
  `e_check_cash` varchar(50) NOT NULL,
  `e_received` double NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense_master`
--

INSERT INTO `expense_master` (`id`, `e_title`, `e_disc`, `e_date`, `e_expense_by`, `e_check_cash`, `e_received`, `category_id`) VALUES
(1, 'black tea', 'black tea ordered because some people in the offic', '2023-05-08', 'aakib bhai', 'cash', 25, 1),
(2, 'house lightbill', 'house lightbill handel by rahmatullah bhai valuda.', '2023-05-04', 'rahmatullah bhai', 'check', 670, 5),
(7, 'hot chay', 'hot chay', '2023-05-09', 'husen', 'cash', 100, 4),
(8, 'legpis', 'chay', '2023-05-12', 'husen bhai', 'check', 123, 4),
(10, 'houses lightbill', 'houses lightbill is the most weapon', '2023-05-12', 'aakib valuda', 'cash', 330, 5);

-- --------------------------------------------------------

--
-- Table structure for table `income_category`
--

CREATE TABLE `income_category` (
  `id` int(11) NOT NULL,
  `i_category` varchar(50) NOT NULL,
  `i_subcategory` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income_category`
--

INSERT INTO `income_category` (`id`, `i_category`, `i_subcategory`) VALUES
(1, 'zakat', NULL),
(3, 'sadka', NULL),
(4, 'lillah', NULL),
(5, 'fitrah', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `income_master`
--

CREATE TABLE `income_master` (
  `id` int(11) NOT NULL,
  `i_title` varchar(50) NOT NULL,
  `i_disc` varchar(50) NOT NULL,
  `i_date` date NOT NULL,
  `i_collected_by` varchar(50) NOT NULL,
  `i_payments` varchar(50) NOT NULL,
  `i_received` double NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income_master`
--

INSERT INTO `income_master` (`id`, `i_title`, `i_disc`, `i_date`, `i_collected_by`, `i_payments`, `i_received`, `category_id`) VALUES
(1, 'village zakat', 'village zakat is required for all people.', '2023-05-09', 'rahmatullah bhai', 'cash', 90000, 1),
(3, 'masjid sadka', 'all masjid in majadar are provided sadka box, so p', '1234-11-13', 'ataullah bhai', 'cash', 76270, 3);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` double NOT NULL,
  `roll_no` int(11) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `m_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `join_date` date NOT NULL,
  `pre_entry` double NOT NULL,
  `clanid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `roll_no`, `f_name`, `m_name`, `l_name`, `join_date`, `pre_entry`, `clanid`) VALUES
(1, 1, 'nofal', 'farhan', 'malik', '2017-12-30', -1000, 3),
(2, 3, 'hussain', 'husen', 'sunasara', '2002-02-02', 0, 4),
(3, 4, 'akib', 'abdul', 'valuda', '2020-02-20', 0, 8),
(5, 2, 'mohammad', 'mohammad', 'sunasara', '2002-10-10', 0, 6),
(6, 5, 'adnan', 'ajij', 'maknojiya', '2022-02-20', 0, 4),
(11, 38, 'mr', 'xyz', 'xyz', '2023-04-05', 1000, 3),
(12, 90, 'nofal', 'nofa', 'nfo', '2023-01-01', -10000, 3),
(13, 101, 'Aakib', 'Abdulbhai', 'Valuda', '2021-01-01', -2000, 8),
(15, 115, 'rehan bhai', 'aamin', 'jagarala', '2023-05-05', 200, 12),
(16, 116, 'yusuf', 'aasif', 'nedariya', '2023-05-05', 500, 13),
(17, 117, 'kk', 'rr', 'kkrr', '2023-05-05', 200, 14),
(18, 127, 'mr', 'srh', 'rcb', '2023-05-05', 0, 8),
(20, 137, 'mr', 'dc', 'lsg', '2023-05-05', 0, 8),
(21, 147, 'mr', 'abc', 'xyz', '2023-05-05', 0, 25);

--
-- Triggers `member`
--
DELIMITER $$
CREATE TRIGGER `add_payment` AFTER INSERT ON `member` FOR EACH ROW INSERT INTO payment (`member_id`, `roll_no`, `pay_amount`, `collected_by`, `book_no`, `voucher_no`, `payment_date`) VALUES (NEW.id, NEW.roll_no, 0, 'trigger', 0,0, NEW.join_date)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` double NOT NULL,
  `member_id` double NOT NULL,
  `roll_no` double NOT NULL,
  `pay_amount` double NOT NULL,
  `collected_by` varchar(50) NOT NULL,
  `book_no` double NOT NULL,
  `voucher_no` double NOT NULL,
  `payment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `member_id`, `roll_no`, `pay_amount`, `collected_by`, `book_no`, `voucher_no`, `payment_date`) VALUES
(1, 1, 1, 3000, 'nofal', 18, 9, '2024-01-30'),
(8, 1, 1, 3000, 'nofal', 18, 9, '2024-01-30'),
(10, 2, 3, 3000, 'nofal', 18, 9, '2024-01-30'),
(12, 3, 4, 1000, 'basan', 90, 90, '2020-12-20'),
(13, 6, 5, 5000, 'akib', 9, 9, '2021-09-11'),
(21, 5, 2, 200, 'nofal', 3, 8, '2021-01-02'),
(22, 5, 2, 677, 'nofal', 6, 6, '2023-04-09'),
(23, 5, 2, 900, 'no', 9, 9, '2023-04-09'),
(24, 5, 2, 900, 'no', 9, 9, '2022-04-09'),
(25, 5, 2, 200, '', 0, 0, '2021-02-09'),
(29, 13, 101, 100, '', 101, 101, '2021-01-01'),
(30, 13, 101, 3000, 'irfan', 2, 3, '2023-04-11'),
(31, 13, 101, 500, '', 101, 1002, '2023-11-04'),
(32, 5, 2, 300, '', 1, 5, '2023-11-04'),
(34, 12, 12, 2000, 'irfan', 1, 2, '2023-04-14'),
(36, 13, 13, 300, '', 0, 0, '2023-04-14'),
(38, 3, 3, 500, '', 101, 21, '2023-04-08'),
(39, 13, 13, 1000, '', 102, 30, '2023-04-19'),
(40, 15, 115, 0, 'trigger', 0, 0, '2023-05-05'),
(41, 16, 116, 0, 'trigger', 0, 0, '2023-05-05'),
(42, 17, 117, 0, 'trigger', 0, 0, '2023-05-05'),
(43, 18, 127, 0, 'trigger', 0, 0, '2023-05-05'),
(44, 20, 137, 0, 'trigger', 0, 0, '2023-05-05'),
(45, 21, 147, 0, 'trigger', 0, 0, '2023-05-05');

-- --------------------------------------------------------

--
-- Table structure for table `yearly_income`
--

CREATE TABLE `yearly_income` (
  `id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `year_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `yearly_income`
--

INSERT INTO `yearly_income` (`id`, `amount`, `year_date`) VALUES
(3, 2000, '2023-04-09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clan`
--
ALTER TABLE `clan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expense_category`
--
ALTER TABLE `expense_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expense_master`
--
ALTER TABLE `expense_master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expense_category` (`category_id`);

--
-- Indexes for table `income_category`
--
ALTER TABLE `income_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `income_master`
--
ALTER TABLE `income_master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `income_fk` (`category_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clanid` (`clanid`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `roll_no` (`roll_no`);

--
-- Indexes for table `yearly_income`
--
ALTER TABLE `yearly_income`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clan`
--
ALTER TABLE `clan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `expense_category`
--
ALTER TABLE `expense_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `expense_master`
--
ALTER TABLE `expense_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `income_category`
--
ALTER TABLE `income_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `income_master`
--
ALTER TABLE `income_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `yearly_income`
--
ALTER TABLE `yearly_income`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expense_master`
--
ALTER TABLE `expense_master`
  ADD CONSTRAINT `expense_category` FOREIGN KEY (`category_id`) REFERENCES `expense_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `income_master`
--
ALTER TABLE `income_master`
  ADD CONSTRAINT `income_fk` FOREIGN KEY (`category_id`) REFERENCES `income_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`clanid`) REFERENCES `clan` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

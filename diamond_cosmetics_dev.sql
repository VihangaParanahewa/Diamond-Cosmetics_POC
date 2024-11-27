-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2024 at 12:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diamond_cosmetics_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Face'),
(2, 'Lipstick'),
(3, 'Lips'),
(4, 'Lip Liner'),
(5, 'Moisturiser'),
(6, 'Skin'),
(7, 'Body'),
(8, 'Facewash'),
(9, 'Hand'),
(10, 'Hair');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `categoryId` varchar(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `directions` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `in_stock` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `categoryId`, `description`, `directions`, `price`, `in_stock`, `image_url`) VALUES
(15, 'Radient - Night Creame', '5', 'Rejuvinates your skin while you rest and sleep at night', 'HOW TO USE:\r\n\r\nCleanse area to apply and apply cream', 3000, 68, '/public/uploads/images/1732694931445-olifair-night-cream.jpg'),
(17, 'Radient - Night Cream', '7', 'Rejuvinates your skin while you rest and sleep at night', 'HOW TO USE:\r\n\r\nCleanse area to apply and apply cream', 3000, 75, '/public/uploads/images/1732696794962-255856.jpg'),
(18, 'Red Glossy Lipstick', '3', 'Load your lips with long lasting and impeccable red colour to fulfill your makeup requirements.', 'HOW TO USE:\r\n\r\n1. Exfoliate your lips.\r\n2. Line your lips with the CCUK Lip definer, then fill them in.\r\n3. Blot your lips for an extra-matte finish.\r\n*Please note that actual colours may vary slightly.', 2500, 150, '/public/uploads/images/1732697027080-img2.png'),
(19, 'Wine Lip Liner', '4', 'Defines and creates a neat lip outline resulting on full, bold lips.', 'HOW TO USE:\r\n\r\nPrime and line lips with lip liner.\r\nFill in to wear alone, or apply lipstick to complete the look.\r\nFor an even bolder look, fill in and apply Colour Lipstick on top', 1200, 56, '/public/uploads/images/1732697170922-PERIPERA-lip-liner.jpg'),
(20, 'Damson Lip Liner', '3', 'Defines and creates a neat lip outline resulting on full, bold lips.', 'HOW TO USE:\r\n\r\nPrime and line lips with lip liner.\r\nFill in to wear alone, or apply lipstick to complete the look.\r\nFor an even bolder look, fill in and apply Colour Lipstick on top', 1400, 75, '/public/uploads/images/1732697321843-bdlccuk2617lar.jpg'),
(21, 'Tumeric Handwash', '9', 'Effectifly removes dirt and germs from skin', 'Wash hands using one or two drops of the handwash whenever needed.', 600, 160, '/public/uploads/images/1732697434828-turmeric-hand-wash.jpeg'),
(22, 'Aloe Facewash', '1', 'Removes dead skin and effective on dry skin types', 'HOW TO USE:\r\n\r\nWash face with clean water and apply product on face. Finally rinse with clean water', 1550, 500, '/public/uploads/images/1732697539278-61caYT6H-QL.jpg'),
(23, 'Mint Bodywash', '7', 'Feel mint freshness all through your body and take the day with mint filled energy', 'Wash body with clean water and apply. Finally rinse with clean water', 1450, 110, '/public/uploads/images/1732697612464-710PgiZMDYL.jpg'),
(24, 'Hair Repair Conditioner', '10', 'Repair your damaged and dry hair with this amazing solution', 'Wash hair with clean water and apply product. Rinse with clean cold water', 1499, 200, '/public/uploads/images/1732697696920-41gTe5-MrL.jpg'),
(25, 'Tea Tree Facewash', '1', 'Cleans the dirt and oil from your face and gives a bright healthy look', 'HOW TO USE:\r\n\r\nWash face with clean water and apply product on face. Finally rinse with clean water', 1350, 600, '/public/uploads/images/1732697832475-images3.jpg'),
(26, 'Radient - Night Cream', '5', 'Rejuvinates your skin while you rest and sleep at night', 'HOW TO USE:\r\n\r\nCleanse area to apply and apply cream', 3250, 150, '/public/uploads/images/1732697986405-7oz_oobwb-min-en-us.png'),
(27, 'Jasmin Bodywash', '7', 'Makes you feel like you are in a field of jasmin. Feeling fresh and amazing', 'Wash body with clean water and apply. Finally rinse with clean water', 600, 120, '/public/uploads/images/1732698082839-Jasmin-Mogra.jpeg'),
(28, 'Wine Lip Liner', '4', 'Defines and creates a neat lip outline resulting on full, bold lips.', 'HOW TO USE:\r\n\r\nPrime and line lips with lip liner.\r\nFill in to wear alone, or apply lipstick to complete the look.\r\nFor an even bolder look, fill in and apply Colour Lipstick on top', 1200, 50, '/public/uploads/images/1732698241441-027afdd3c7ae5d6a36803bb72c72b606.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

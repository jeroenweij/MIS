SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `Activities` (
  `Id` smallint(6) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Export` tinyint(4) DEFAULT 1,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `BudgetHours` smallint(6) DEFAULT NULL,
  `Project` smallint(6) NOT NULL,
  `Budget` int(11) DEFAULT NULL,
  `OopSpend` int(11) DEFAULT NULL,
  `Rate` smallint(6) DEFAULT NULL,
  `WBSO` varchar(20) DEFAULT NULL,
  `Key` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Hours` (
  `Project` smallint(6) DEFAULT NULL,
  `Activity` smallint(6) DEFAULT NULL,
  `Person` smallint(6) DEFAULT NULL,
  `Hours` int(11) DEFAULT NULL,
  `Plan` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Personel` (
  `Id` smallint(6) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `Name` varchar(32) DEFAULT NULL,
  `Startdate` date NOT NULL DEFAULT '2023-01-01',
  `WBSO` tinyint(1) DEFAULT 0,
  `Fultime` tinyint(4) DEFAULT 100,
  `Type` tinyint(4) DEFAULT 1,
  `Number` smallint(6) DEFAULT NULL,
  `Ord` smallint(6) DEFAULT 250
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Projects` (
  `Id` smallint(6) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Status` tinyint(4) DEFAULT 0,
  `Manager` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Status` (
  `Id` tinyint(4) NOT NULL,
  `Status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Status` (`Id`, `Status`) VALUES
(1, 'Lead'),
(2, 'Quote'),
(3, 'Active'),
(4, 'Closed');

CREATE TABLE `Types` (
  `Id` tinyint(4) NOT NULL,
  `Name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Types` (`Id`, `Name`) VALUES
(1, 'User'),
(2, 'Project Manager'),
(3, 'Elevated'),
(4, 'Administrator');

ALTER TABLE `Activities`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Project` (`Project`),
  ADD KEY `Key` (`Key`);

ALTER TABLE `Hours`
  ADD UNIQUE KEY `hoursIndex` (`Project`,`Activity`,`Person`),
  ADD KEY `Activity` (`Activity`),
  ADD KEY `Person` (`Person`);

ALTER TABLE `Personel`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Personel_UNIQUE` (`Email`),
  ADD KEY `Type` (`Type`),
  ADD KEY `Number` (`Number`);

ALTER TABLE `Projects`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Status` (`Status`),
  ADD KEY `Manager` (`Manager`);

ALTER TABLE `Status`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `Types`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `Activities`
  MODIFY `Id` smallint(6) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Personel`
  MODIFY `Id` smallint(6) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Projects`
  MODIFY `Id` smallint(6) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Status`
  MODIFY `Id` tinyint(4) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Types`
  MODIFY `Id` tinyint(4) NOT NULL AUTO_INCREMENT;


ALTER TABLE `Activities`
  ADD CONSTRAINT `Activities_ibfk_1` FOREIGN KEY (`Project`) REFERENCES `Projects` (`Id`) ON UPDATE NO ACTION;

ALTER TABLE `Personel`
  ADD CONSTRAINT `Personel_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `Types` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `Projects`
  ADD CONSTRAINT `Projects_ibfk_1` FOREIGN KEY (`Status`) REFERENCES `Status` (`Id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `Projects_ibfk_2` FOREIGN KEY (`Manager`) REFERENCES `Personel` (`Id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
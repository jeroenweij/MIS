
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `Activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Activities` (
  `Id` smallint NOT NULL AUTO_INCREMENT,
  `Project` smallint NOT NULL,
  `Key` smallint NOT NULL,
  `Name` varchar(50) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `BudgetHours` smallint DEFAULT NULL,
  `Rate` smallint DEFAULT NULL,
  `OopSpend` int DEFAULT NULL,
  `Budget` int DEFAULT NULL,
  `WBSO` varchar(20) DEFAULT NULL,
  `Export` tinyint DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `Project` (`Project`),
  KEY `Key` (`Key`),
  CONSTRAINT `Activities_ibfk_1` FOREIGN KEY (`Project`) REFERENCES `Projects` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `Hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hours` (
  `Project` smallint DEFAULT NULL,
  `Activity` smallint DEFAULT NULL,
  `Person` smallint DEFAULT NULL,
  `Hours` int DEFAULT NULL,
  `Plan` int DEFAULT '0',
  UNIQUE KEY `hoursIndex` (`Project`,`Activity`,`Person`),
  KEY `Activity` (`Activity`),
  KEY `Person` (`Person`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `Personel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Personel` (
  `Id` smallint NOT NULL AUTO_INCREMENT,
  `Email` varchar(64) NOT NULL,
  `Name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Startdate` date NOT NULL DEFAULT '2023-01-01',
  `WBSO` tinyint(1) DEFAULT '0',
  `Fultime` tinyint DEFAULT '100',
  `Type` tinyint DEFAULT '1',
  `Number` smallint DEFAULT NULL,
  `Ord` smallint DEFAULT '250',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Personel_UNIQUE` (`Email`),
  KEY `Type` (`Type`),
  KEY `Number` (`Number`),
  CONSTRAINT `Personel_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `Types` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `Projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Projects` (
  `Id` smallint NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Status` tinyint DEFAULT '0',
  `Manager` smallint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Status` (`Status`),
  KEY `Manager` (`Manager`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Status` (
  `Id` tinyint NOT NULL AUTO_INCREMENT,
  `Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Types` (
  `Id` tinyint NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Status` (`Id`, `Status`) VALUES
(1, 'Lead'),
(2, 'Quote'),
(3, 'Active'),
(4, 'Closed');

INSERT INTO `Types` (`Id`, `Name`) VALUES
(1, 'User'),
(2, 'Project Manager'),
(3, 'Elevated'),
(4, 'Administrator');

/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


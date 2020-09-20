-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: trumpeter-database
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'Kind of Blue',1959,'cool jazz',1,NULL),(2,'Birth of the Cool',1957,'cool jazz',1,NULL),(3,'Clifford Brown and Max Roach',1954,'hard bop',2,NULL),(4,'Study in Brown',1955,'hard bop',2,NULL),(5,'Bitches Brew',1970,'jazz fusion',1,NULL),(6,'Tutu',1986,'jazz fusion',1,NULL),(7,'Miles Ahead',1957,'cool jazz',1,NULL),(8,'Sketches of Spain',1960,'Latin jazz',1,NULL),(9,'In a Silent Way',1969,'jazz fusion',1,NULL),(10,'Milestones',1958,'modal jazz',1,NULL),(11,'Ascenseur pour l\'échafaud',1958,'cool jazz',1,NULL),(12,'Round About Midnight',1957,'hard bop',1,NULL),(13,'On the Corner',1972,'jazz rock',1,NULL),(14,'A Tribute to Jack Johnson',1971,'jazz fusion',1,NULL),(23,'The Sidewinder',1964,'hard bop',4,NULL),(24,'The Sidewinder',1964,'hard bop',4,NULL),(25,'The Gigolo',1968,'hard bop',4,NULL),(26,'Test',4567,'Test',1,NULL),(27,'test',1234,'test',11,NULL),(28,'test1',1234,'test1',11,NULL);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Miles Davis','New York',1945,1991,'./img/milesdavis.jpg'),(2,'Clifford Brown','New York, Los Angeles',1949,1956,'./img/cliffordbrown.jpg'),(3,'Louis Armstrong','New Orleans',1919,1971,'./img/louisarmstrong.jpg'),(4,'Lee Morgan','New York',1956,1972,'./img/leemorgan.jpg'),(5,'Chet Baker','Los Angeles',1949,1988,'./img/chetbaker.jpg'),(6,'Dizzy Gillespie','New York',1935,1993,'./img/dizzygillespie.jpg'),(7,'Donald Byrd','New York',1954,2013,'./img/donaldbyrd.jpg'),(8,'Wynton Marsalis','New York',1980,2020,'./img/wyntonmarsalis.jpg'),(9,'Freddie Hubbard','New York',1958,2008,'./img/freddiehubbard.jpg'),(10,'Clark Terry','New York',1947,2015,'./img/clarkterry.jpg'),(11,'Arturo Sandoval','Artemisa',1977,2020,NULL),(12,'Maynard Ferguson','Los Angeles, New York',1939,2006,NULL),(13,'Fats Navarro','New York',1943,1950,NULL),(14,'Don Cherry','Los Angeles, New York',1950,1995,NULL),(15,'Roy Eldridge','New York, Chicago',1927,1989,NULL),(16,'Art Farmer','Los Angeles, New York, Vienna',1945,1999,NULL),(17,'Roy Hargrove','New York',1987,2018,NULL),(18,'Terence Blanchard','New York, Los Angeles',1980,2020,NULL),(19,'Chris Botti','New York',1979,2020,NULL),(20,'Woody Shaw','Newark, Paris, San Francisco, New York',1963,1989,NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-19 13:18:40

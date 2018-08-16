
drop database if exists userManager;
create database userManager;
use userManager;

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(160) NOT NULL,
  `password` varchar(160) NOT NULL,
  
  UNIQUE KEY `USER_ID_UNIQUE` (`id`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


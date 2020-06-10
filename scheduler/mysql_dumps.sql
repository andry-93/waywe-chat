CREATE DATABASE  IF NOT EXISTS `wayWe-dashboard`;
USE `wayWe-dashboard`;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` bigint(20) unsigned AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `recurring_events`;
CREATE TABLE `recurring_events` (
  `id` bigint(20) unsigned AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `evType` bigint(20) unsigned DEFAULT '0',
  `event_pid` bigint(20) unsigned DEFAULT '0',
  `event_length` bigint(20) unsigned DEFAULT '0',
  `rec_type` varchar(25) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

INSERT recurring_events(start_date, end_date, text, evType) 
VALUES ("2020-06-01  8:00", "2020-06-01 11:00", "World Darts Championship (morning session)", null),
	  ("2020-06-01 12:00", "2020-06-01 14:00", "Lunch with Iurii & Sergey", 2),
    ("2020-06-02 16:00", "2020-06-02 17:30", "Game of Thrones", 3),
	  ("2020-06-04  9:00", "2020-06-04 11:00", "Design workshop", 4),
	  ("2020-06-04 18:00", "2020-06-04 21:00", "World Darts Championship (evening session)", null),
	  ("2020-06-04 00:00", "2020-06-04 00:00", "Call to Elon Musk", null)
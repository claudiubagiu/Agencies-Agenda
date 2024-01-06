USE node_complete;

-- Define tables
CREATE TABLE `agentie` (
  `id_agentie` int NOT NULL,
  `nume` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_agentie`)
);

CREATE TABLE `tip` (
  `id_tip` int NOT NULL,
  `denumire` varchar(255) NOT NULL,
  `caracteristici` text,
  PRIMARY KEY (`id_tip`)
);

CREATE TABLE `spatiu` (
  `id_spatiu` int NOT NULL,
  `adresa` varchar(255) NOT NULL,
  `zona` int DEFAULT NULL,
  `suprafata` int DEFAULT NULL,
  `id_tip` int NOT NULL,
  PRIMARY KEY (`id_spatiu`),
  KEY `id_tip` (`id_tip`),
  CONSTRAINT `spatiu_ibfk_1` FOREIGN KEY (`id_tip`) REFERENCES `tip` (`id_tip`)
);

CREATE TABLE `oferta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_agentie` int NOT NULL,
  `id_spatiu` int NOT NULL,
  `vanzare` char(1) NOT NULL,
  `pret` decimal(10,2) DEFAULT NULL,
  `moneda` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_agentie` (`id_agentie`),
  KEY `id_spatiu` (`id_spatiu`),
  CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`id_agentie`) REFERENCES `agentie` (`id_agentie`),
  CONSTRAINT `oferta_ibfk_2` FOREIGN KEY (`id_spatiu`) REFERENCES `spatiu` (`id_spatiu`)
);

CREATE TABLE `exceptii` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_agentie` int NOT NULL,
  `id_spatiu` int NOT NULL,
  `vanzare` char(1) NOT NULL,
  `pret` int NOT NULL,
  `moneda` varchar(3) NOT NULL,
  `natura_exceptiei` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE VIEW `viewoferte` AS select `oferta`.`id` AS `id`,`node_complete`.`agentie`.`id_agentie` AS `id_agentie`,`node_complete`.`agentie`.`nume` AS `nume`,`node_complete`.`agentie`.`email` AS `email`,`node_complete`.`oferta`.`id_spatiu` AS `id_spatiu`,`node_complete`.`spatiu`.`id_tip` AS `id_tip`,`node_complete`.`tip`.`denumire` AS `denumire`,`node_complete`.`tip`.`caracteristici` AS `caracteristici`,`node_complete`.`spatiu`.`adresa` AS `adresa`,`node_complete`.`spatiu`.`zona` AS `zona`,`node_complete`.`spatiu`.`suprafata` AS `suprafata`,`node_complete`.`oferta`.`pret` AS `pret`,`node_complete`.`oferta`.`vanzare` AS `vanzare`,`node_complete`.`oferta`.`moneda` AS `moneda` from (((`node_complete`.`agentie` join `node_complete`.`oferta` on((`node_complete`.`agentie`.`id_agentie` = `node_complete`.`oferta`.`id_agentie`))) join `node_complete`.`spatiu` on((`node_complete`.`oferta`.`id_spatiu` = `node_complete`.`spatiu`.`id_spatiu`))) join `node_complete`.`tip` on((`node_complete`.`spatiu`.`id_tip` = `node_complete`.`tip`.`id_tip`)));

DELIMITER //

CREATE PROCEDURE `InserareExceptii`()
BEGIN
  INSERT INTO Exceptii (id_agentie, id_spatiu, vanzare, pret, moneda, natura_exceptiei)
  SELECT
    o.id_agentie,
    o.id_spatiu,
    o.vanzare,
    o.pret,
    o.moneda,
    CASE
      WHEN (o.vanzare = 'N' AND o.pret < 2 * s.suprafata AND o.moneda = 'RON') THEN 'Exceptia 1'
      WHEN (o.vanzare = 'N' AND o.pret < 0.4 * s.suprafata AND o.moneda = 'EUR') THEN 'Exceptia 2'
      WHEN (o.vanzare = 'N' AND o.pret < 0.41 * s.suprafata AND o.moneda = 'USD') THEN 'Exceptia 3'
    END AS natura_exceptiei
  FROM Oferta o
  JOIN Spatiu s ON o.id_spatiu = s.id_spatiu
  WHERE (o.vanzare = 'N' AND o.pret < 2 * s.suprafata AND o.moneda = 'RON')
     OR (o.vanzare = 'N' AND o.pret < 0.4 * s.suprafata AND o.moneda = 'EUR')
     OR (o.vanzare = 'N' AND o.pret < 0.41 * s.suprafata AND o.moneda = 'USD');
END//

DELIMITER ;


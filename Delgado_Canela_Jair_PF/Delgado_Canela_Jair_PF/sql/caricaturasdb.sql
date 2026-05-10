DROP SCHEMA IF EXISTS `caricaturasdb`;
CREATE SCHEMA IF NOT EXISTS `caricaturasdb`;
USE `caricaturasdb`;

DROP TABLE IF EXISTS `caricaturasdb`.`caricaturas`;

CREATE TABLE IF NOT EXISTS `caricaturasdb`.`caricaturas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `creador` VARCHAR(100) NOT NULL,
  `anioCreacion` INT NOT NULL,
  `lanzamiento` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `caricaturasdb`.`caricaturas` 
(titulo, descripcion, creador, anioCreacion, lanzamiento) VALUES
('El Show de los Looney Tunes',
 'Serie animada clásica con personajes icónicos como Bugs Bunny y el Pato Lucas.',
 'Warner Bros.',
 1930,
 '17-08-1932'),
('Avatar: La Leyenda de Aang',
 'Una serie animada sobre un joven maestro del aire que debe salvar el mundo.',
 'Michael Dante DiMartino y Bryan Konietzko',
 2005,
 '25-11-2006');

SELECT * FROM `caricaturasdb`.`caricaturas`;
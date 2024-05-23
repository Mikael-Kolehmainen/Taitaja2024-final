CREATE TABLE `scores` (
  id INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  games_id INT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (games_id) REFERENCES games(id)
);

CREATE TABLE `games` (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL UNIQUE,
  `description` VARCHAR(255) NULL,
  releaseYear INT NULL,
  imagePath VARCHAR(255) NULL,
  createdAt DATETIME NOT NULL,
  amountOfShownScores INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO `games` (title, `description`, releaseYear, imagePath, createdAt, amountOfShownScores) VALUES ("My Test Game", "This is a test game", 2024, "/media/games/test.jpeg", "2024-05-22T00:00:00.000Z", 20);
INSERT INTO `games` (title, `description`, releaseYear, imagePath, createdAt, amountOfShownScores) VALUES ("Snake", "This is a 2-player Snake game", 2024, "/media/games/test.jpeg", "2024-05-22T00:00:00.000Z", 20);

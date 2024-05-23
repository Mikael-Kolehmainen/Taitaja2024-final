CREATE TABLE `users` (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'admin',
  `session` VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

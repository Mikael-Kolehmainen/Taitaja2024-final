const { GetAll, Update, GetWithTitle, Insert } = require("../models/_Game");

const CreateGame = async (title, imagePath, amountOfShownScores) => {
  const now = new Date().toISOString();
  const game = {
    title: title,
    imagePath: imagePath,
    amountOfShownScores: amountOfShownScores,
    createdAt: now,
  };

  await Insert(game);
};

const GetGameWithTitle = async (gameTitle) => {
  return GetWithTitle(gameTitle);
};

const UpdateGame = async (title, imagePath, createdAt, amountOfShownScores, gameId) => {
  const updatedGame = {
    title: title,
    imagePath: imagePath,
    createdAt: createdAt,
    amountOfShownScores: amountOfShownScores,
  };

  await Update(updatedGame, gameId);
};

const GetAllGames = async () => {
  const games = await GetAll();
  return games;
};

module.exports = {
  CreateGame,
  GetGameWithTitle,
  UpdateGame,
  GetAllGames,
};

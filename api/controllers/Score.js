const { Insert, GetAllWithGamesId } = require("../models/_Score");

const GetAllSnakeGameScores = async () => {
  const scores = await GetAllWithGamesId(2);
  return scores;
};

const SaveSnakeGameScore = async (scoreUsername, gameScore) => {
  const now = new Date().toISOString();
  const scoreObj = {
    username: scoreUsername,
    score: gameScore,
    games_id: 2,
    timestamp: now,
  };

  await Insert(scoreObj);
};

module.exports = {
  GetAllSnakeGameScores,
  SaveSnakeGameScore,
};

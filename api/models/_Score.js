const db = require("./_db");

/*
  This is a model file. Only model files are allowed to communicate with the
  database and only controller files should call functions in the model files.
*/

const GetAllWithGamesId = async (gamesId) => {
  return db("scores").where("games_id", gamesId);
};

const Insert = async (score) => {
  return db("scores").insert(score);
};

module.exports = {
  GetAllWithGamesId,
  Insert,
};

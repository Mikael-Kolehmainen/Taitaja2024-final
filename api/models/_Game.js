const db = require("./_db");

/*
  This is a model file. Only model files are allowed to communicate with the
  database and only controller files should call functions in the model files.
*/

const Insert = async (game) => {
  return db("games").insert(game);
};

const Update = async (game, id) => {
  return db("games").update(game).where("id", id);
};

const GetWithTitle = async (title) => {
  return db("games").where("title", title).first();
};

const GetAll = async () => {
  return db("games");
};

module.exports = {
  Insert,
  Update,
  GetWithTitle,
  GetAll,
};

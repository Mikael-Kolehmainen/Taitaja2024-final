const db = require("./_db");

/*
  This is a model file. Only model files are allowed to communicate with the
  database and only controller files should call functions in the model files.
*/

const Get = async (username) => {
  return db("users").where("username", username).first();
};

const GetAll = async () => {
  return db("users").select(["id", "username", "role"]);
};

const Insert = async (user) => {
  return db("users").insert(user);
};

const Update = async (user) => {
  return db("users").update(user).where("username", user.username);
};

const UpdateWithId = async (user, id) => {
  return db("users").update(user).where("id", id);
};

const StoreSession = async (id, session) => {
  return db("users").update({ session: session }).where({ id: id });
};

const Delete = async (id) => {
  return db("users").delete().where({ id: id });
};

module.exports = {
  Get,
  GetAll,
  Insert,
  Update,
  UpdateWithId,
  StoreSession,
  Delete,
};

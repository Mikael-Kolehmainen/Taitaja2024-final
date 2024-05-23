const bcrypt = require("bcrypt");
const { Get, Insert, StoreSession, Update, GetAll, UpdateWithId, Delete } = require("../models/_User");

/*
  This is a controller file, controller files call functions in the models and
  can gather data from different models to be returned from an endpoint.
*/

const Authenticate = async (username, password) => {
  const user = await Get(username);

  if (!user) {
    throw new Error(`Virheelliset tunnukset.`);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error(`Virheelliset tunnukset.`);
  }

  const session = crypto.randomUUID();

  const rowsAffected = await StoreSession(user.id, session);

  if (!rowsAffected) {
    throw new Error("Failed to store session.");
  }

  return { session: session, role: user.role };
};

const CreateUser = async (username, session, newUsersername, role) => {
  const user = await Get(username);

  CheckSession(user, session);

  // Default password is "taitaja2024"
  const hashedPassword = await bcrypt.hash("taitaja2024", 10);
  const newUser = {
    username: newUsersername,
    password: hashedPassword,
    role,
  };

  await Insert(newUser);
};

const ValidateSession = async (username, session) => {
  const user = await Get(username);

  CheckSession(user, session);
};

const ChangeOwnPassword = async (username, session, newPassword) => {
  const user = await Get(username);

  CheckSession(user, session);

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;

  await Update(user);
};

const ChangePassword = async (username, session, newPassword, userId) => {
  const user = await Get(username);

  CheckSession(user, session);

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = {
    password: hashedNewPassword,
  };

  await UpdateWithId(updatedUser, userId);
};

const GetAllUsers = async (username, session) => {
  const user = await Get(username);

  CheckSession(user, session);

  const users = await GetAll();

  return users;
};

const DeleteUserWithId = async (username, session, userId) => {
  const user = await Get(username);

  CheckSession(user, session);

  await Delete(userId);
};

const CheckSession = (user, session) => {
  if (!user) {
    throw new Error(`Käyttäjää ei löytynyt: ${username}.`);
  }

  if (user.session !== session) {
    throw new Error("Session validation failed");
  }
};

module.exports = {
  Authenticate,
  CreateUser,
  ValidateSession,
  ChangeOwnPassword,
  ChangePassword,
  GetAllUsers,
  DeleteUserWithId,
};

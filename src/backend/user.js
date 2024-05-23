import axios from "axios";

/*
  This is user.js. Here are the functions that call endpoints on the backend,
  mostly for fetching data from the database throught the backend controllers.
*/

export const authenticateUser = async (user) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/authenticate`, user, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const valdiateSession = async (userSession) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/validate-session`, userSession, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const changeOwnPassword = async (user) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/change-own-password`, user, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const changeUserPassword = async (user) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/change-password`, user, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const deleteUserWithId = async (deleteUser) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/delete`, deleteUser, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const createNewUser = async (newUser) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/create`, newUser, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getAllUsers = async (user) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URI}/user/get-all`, { params: user });
};

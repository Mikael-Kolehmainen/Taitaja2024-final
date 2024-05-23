import axios from "axios";

export const storeNewGame = async (game) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/game/create`, game, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getAllGames = async () => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URI}/game/get-all`);
};

export const getHallOfFameScoreLimit = async (gameTitle) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URI}/game/get-scoreboard-limit`, {
    params: { gameTitle: gameTitle },
  });
};

export const updateGame = async (game) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/game/update`, game, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

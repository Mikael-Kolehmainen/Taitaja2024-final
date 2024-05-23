import axios from "axios";

export const storeScore = async (score) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URI}/score/store-snake-game-score`, score, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getAllSnakeGameScores = async () => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URI}/score/get-all-snake-game-scores`);
};

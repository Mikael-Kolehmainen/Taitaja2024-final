const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  Authenticate,
  ValidateSession,
  CreateUser,
  ChangePassword,
  GetAllUsers,
  ChangeOwnPassword,
  DeleteUserWithId,
} = require("./controllers/User");
const { GetAllGames, UpdateGame, GetGameWithTitle, CreateGame } = require("./controllers/Game");
const { SaveSnakeGameScore, GetAllSnakeGameScores } = require("./controllers/Score");

/*
  This is the main file for the backend api where the endpoints should be defined.
*/

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

/* USER ENDPOINTS */

app.post("/user/authenticate", (req, res) => {
  (async () => {
    try {
      const { session, role } = await Authenticate(req.body.username, req.body.password);
      res.status(200).send({ session: session, role: role });
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.post("/user/create", (req, res) => {
  (async () => {
    try {
      const session = await CreateUser(req.body.username, req.body.session, req.body.newUsername, req.body.role);
      res.status(200).send({ session: session });
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.post("/user/validate-session", (req, res) => {
  (async () => {
    try {
      await ValidateSession(req.body.username, req.body.session);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.post("/user/change-own-password", (req, res) => {
  (async () => {
    try {
      await ChangeOwnPassword(req.body.username, req.body.session, req.body.newPassword);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.post("/user/change-password", (req, res) => {
  (async () => {
    try {
      await ChangePassword(req.body.username, req.body.session, req.body.newPassword, req.body.userId);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.get("/user/get-all", (req, res) => {
  (async () => {
    try {
      const users = await GetAllUsers(req.query.username, req.query.session);
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.post("/user/delete", (req, res) => {
  (async () => {
    try {
      await DeleteUserWithId(req.body.username, req.body.session, req.body.userId);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

/* GAME ENDPOINTS */

app.get("/game/get-all", (req, res) => {
  (async () => {
    try {
      const games = await GetAllGames();
      res.status(200).send(games);
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.get("/game/get-scoreboard-limit", (req, res) => {
  (async () => {
    try {
      const game = await GetGameWithTitle(req.query.gameTitle);
      res.status(200).send({ amountOfScores: game.amountOfShownScores });
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.post("/game/update", (req, res) => {
  (async () => {
    try {
      await UpdateGame(
        req.body.title,
        req.body.imagePath,
        req.body.createdAt,
        req.body.amountOfShownScores,
        req.body.id,
      );
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.post("/game/create", (req, res) => {
  (async () => {
    try {
      await CreateGame(req.body.title, req.body.imagePath, req.body.amountOfShownScores);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

/* SCORE ENDPOINTS */

app.post("/score/store-snake-game-score", (req, res) => {
  (async () => {
    try {
      await SaveSnakeGameScore(req.body.scoreUsername, req.body.score);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.get("/score/get-all-snake-game-scores", (req, res) => {
  (async () => {
    try {
      const scores = await GetAllSnakeGameScores();
      res.status(200).send(scores);
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
      console.error(error);
    }
  })();
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

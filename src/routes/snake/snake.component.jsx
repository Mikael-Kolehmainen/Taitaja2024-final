import { createRef, useEffect, useState } from "react";
import "./snake.styles.css";
import Footer from "../../components/footer/footer.component";
import Header from "../../components/header/header.component";
import { getAllSnakeGameScores, storeScore } from "../../backend/score";
import { randomTen } from "../../utils";
import { getHallOfFameScoreLimit } from "../../backend/game";

const Snake = () => {
  const GAME_STATES = {
    START: "start",
    GAME: "game",
    STOP: "stop",
  };
  const [scores, setScores] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATES.START);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [showStoreScore, setShowStoreScore] = useState(false);
  const [canvasContext, setCanvasContext] = useState(null);
  const [scoreUsername, setScoreUsername] = useState("");
  const [scoreWasStored, setScoreWasStored] = useState(false);
  const [snake, setSnake] = useState([
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ]);
  const [snake2, setSnake2] = useState([
    { x: 150, y: 300 },
    { x: 140, y: 300 },
    { x: 130, y: 300 },
    { x: 120, y: 300 },
    { x: 110, y: 300 },
  ]);
  const [score, setScore] = useState(0);
  const [changingDirection, setChangingDirection] = useState(false);
  const [changingDirection2, setChangingDirection2] = useState(false);
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;
  const [foodX, setFoodX] = useState(randomTen(0, CANVAS_WIDTH - 10));
  const [foodY, setFoodY] = useState(randomTen(0, CANVAS_HEIGHT - 10));
  const [dx, setDx] = useState(10);
  const [dx2, setDx2] = useState(10);
  const [dy, setDy] = useState(0);
  const [dy2, setDy2] = useState(0);
  const [tickCount, setTickCount] = useState(0);
  const canvasRef = createRef();
  const GAME_SPEED = 100;
  const CANVAS_BORDER_COLOUR = "black";
  const CANVAS_BACKGROUND_COLOUR = "#c7f0d8";
  const SNAKE_COLOUR = "darkgreen";
  const SNAKE_BORDER_COLOUR = "darkgreen";
  const FOOD_COLOUR = "red";
  const FOOD_BORDER_COLOUR = "darkred";

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await getAllSnakeGameScores();
        // Game title is defined as Unique in the db, so we can use it for queries.
        const response2 = await getHallOfFameScoreLimit("Snake");
        if (response.status == 200 && response2.status == 200) {
          let sortedScores = response?.data?.sort((a, b) => b.score - a.score);
          sortedScores.length = response2?.data?.amountOfScores;
          setScores(sortedScores);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (canvasRef.current) {
      setCanvasContext(canvasRef.current.getContext("2d"));
    }

    fetchScores();
  });

  useEffect(() => {
    if (!canvasContext || gameState !== GAME_STATES.GAME) {
      return;
    }

    const changeDirection = (event) => {
      const A_KEY = 65;
      const D_KEY = 68;
      const W_KEY = 87;
      const S_KEY = 83;
      if (changingDirection) return;
      setChangingDirection(true);

      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === A_KEY && !goingRight) {
        setDx(-10);
        setDy(0);
      }

      if (keyPressed === W_KEY && !goingDown) {
        setDx(0);
        setDy(-10);
      }

      if (keyPressed === D_KEY && !goingLeft) {
        setDx(10);
        setDy(0);
      }

      if (keyPressed === S_KEY && !goingUp) {
        setDx(0);
        setDy(10);
      }
    };

    const changeDirection2 = (event) => {
      const LEFT_ARROW_KEY = 37;
      const RIGHT_ARROW_KEY = 39;
      const UP_ARROW_KEY = 38;
      const DOWN_ARROW_KEY = 40;
      if (changingDirection2) return;
      setChangingDirection2(true);

      const keyPressed = event.keyCode;
      const goingUp = dy2 === -10;
      const goingDown = dy2 === 10;
      const goingRight = dx2 === 10;
      const goingLeft = dx2 === -10;
      if (keyPressed === LEFT_ARROW_KEY && !goingRight) {
        setDx2(-10);
        setDy2(0);
      }

      if (keyPressed === UP_ARROW_KEY && !goingDown) {
        setDx2(0);
        setDy2(-10);
      }

      if (keyPressed === RIGHT_ARROW_KEY && !goingLeft) {
        setDx2(10);
        setDy2(0);
      }

      if (keyPressed === DOWN_ARROW_KEY && !goingUp) {
        setDx2(0);
        setDy2(10);
      }
    };

    document.addEventListener("keydown", changeDirection);
    document.addEventListener("keydown", changeDirection2);

    const gameLoop = setTimeout(() => {
      if (didGameEnd(snake, setSnake) || didGameEnd(snake2, setSnake2) || didSnakesCollide()) {
        setGameState(GAME_STATES.STOP);
      }
      setChangingDirection(false);
      setChangingDirection2(false);
      clearCanvas();
      drawFood();
      advanceSnake();
      advanceSnake2();
      drawSnake();
      drawSnake2();
      setTickCount((prevTickCount) => prevTickCount + 1);
    }, GAME_SPEED);

    const didGameEnd = (snakeDto, setSnakeState) => {
      for (let i = 4; i < snakeDto.length; i++) {
        if (snakeDto[i].x === snakeDto[0].x && snakeDto[i].y === snakeDto[0].y) return true;
      }
      const hitLeftWall = snakeDto[0].x < 0;
      const hitRightWall = snakeDto[0].x > CANVAS_WIDTH - 10;
      const hitTopWall = snakeDto[0].y < 0;
      const hitBottomWall = snakeDto[0].y > CANVAS_HEIGHT - 10;

      if (hitLeftWall) {
        let newSnake = [...snakeDto];
        for (let i = 0; i < snakeDto.length; i++) {
          newSnake[i].x = CANVAS_WIDTH + i * 10;
        }
        setSnakeState(newSnake);
      }

      if (hitRightWall) {
        let newSnake = [...snakeDto];
        for (let i = 0; i < snakeDto.length; i++) {
          newSnake[i].x = 0 - i * 10;
        }
        setSnakeState(newSnake);
      }

      if (hitBottomWall) {
        let newSnake = [...snakeDto];
        for (let i = 0; i < snakeDto.length; i++) {
          newSnake[i].y = 0 - i * 10;
        }
        setSnakeState(newSnake);
      }

      if (hitTopWall) {
        let newSnake = [...snakeDto];
        for (let i = 0; i < snakeDto.length; i++) {
          newSnake[i].y = CANVAS_HEIGHT + i * 10;
        }
        setSnakeState(newSnake);
      }
    };

    const didSnakesCollide = () => {
      return snake.some((snakePart) => {
        return snake2.some((snakePart2) => {
          if (snakePart.x === snakePart2.x && snakePart.y === snakePart2.y) {
            return true;
          }
        });
      });
    };

    const clearCanvas = () => {
      canvasContext.fillStyle = CANVAS_BACKGROUND_COLOUR;
      canvasContext.strokeStyle = CANVAS_BORDER_COLOUR;
      canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      canvasContext.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      setCanvasContext(canvasContext);
    };

    const drawFood = () => {
      canvasContext.fillStyle = FOOD_COLOUR;
      canvasContext.strokeStyle = FOOD_BORDER_COLOUR;
      canvasContext.fillRect(foodX, foodY, 10, 10);
      canvasContext.fillRect(foodX, foodY, 10, 10);
      setCanvasContext(canvasContext);
    };

    const advanceSnake = () => {
      let snakeDto = [...snake];
      const head = { x: snakeDto[0].x + dx, y: snakeDto[0].y + dy };
      snakeDto.unshift(head);
      const didEatFood = snakeDto[0].x === foodX && snakeDto[0].y === foodY;
      if (didEatFood) {
        setScore((prevScore) => prevScore + 10);
        createFood();
      } else {
        snakeDto.pop();
      }
      setSnake(snakeDto);
    };

    const advanceSnake2 = () => {
      let snakeDto = [...snake2];
      const head = { x: snakeDto[0].x + dx2, y: snakeDto[0].y + dy2 };
      snakeDto.unshift(head);
      const didEatFood = snakeDto[0].x === foodX && snakeDto[0].y === foodY;
      if (didEatFood) {
        setScore((prevScore) => prevScore + 10);
        createFood();
      } else {
        snakeDto.pop();
      }
      setSnake2(snakeDto);
    };

    const drawSnake = () => {
      snake.forEach(drawSnakePart);
    };

    const drawSnake2 = () => {
      snake2.forEach(drawSnakePart2);
    };

    const drawSnakePart = (snakePart) => {
      canvasContext.fillStyle = SNAKE_COLOUR;
      canvasContext.strokestyle = SNAKE_BORDER_COLOUR;
      canvasContext.fillRect(snakePart.x, snakePart.y, 10, 10);
      canvasContext.strokeRect(snakePart.x, snakePart.y, 10, 10);
    };

    const drawSnakePart2 = (snakePart) => {
      canvasContext.fillStyle = SNAKE_COLOUR;
      canvasContext.strokestyle = SNAKE_BORDER_COLOUR;
      canvasContext.fillRect(snakePart.x, snakePart.y, 10, 10);
      canvasContext.strokeRect(snakePart.x, snakePart.y, 10, 10);
    };

    const createFood = () => {
      setFoodX(randomTen(0, CANVAS_WIDTH - 10));
      setFoodY(randomTen(0, CANVAS_HEIGHT - 10));
      snake.forEach((part) => {
        snake2.forEach((part2) => {
          const foodIsoNsnake = part.x == foodX && part.y == foodY && part2.x == foodX && part2.y == foodY;
          if (foodIsoNsnake) createFood();
        });
      });
    };

    return () => {
      clearTimeout(gameLoop);
    };
  }, [canvasContext, tickCount]);

  const handleStartGame = () => {
    setGameState(GAME_STATES.GAME);
  };

  const handleRejectStoringOfScore = () => {
    setShowPlayAgain(true);
  };

  const handleApproveStoringOfScore = () => {
    setShowStoreScore(true);
  };

  const handlePlayAgain = () => {
    setShowPlayAgain(false);
    setGameState(GAME_STATES.START);
    window.location.reload();
  };

  const handleStoringOfScore = async () => {
    if (!scoreUsername) {
      return;
    }

    try {
      const scoreRequest = {
        scoreUsername: scoreUsername,
        score: score,
      };
      const response = await storeScore(scoreRequest);
      if (response.status == 200) {
        setScoreWasStored(true);
        setShowPlayAgain(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GameOverOptions = () => {
    if (showPlayAgain) {
      return (
        <>
          {scoreWasStored ? <p>Tulos on tallennettu</p> : null}
          <br />
          <button className="btn" onClick={handlePlayAgain}>
            Pelaa uudelleen?
          </button>
        </>
      );
    }

    if (showStoreScore) {
      return (
        <>
          <p className="question">Tallenna tulokset</p>
          <div className="choices">
            <input
              type="text"
              placeholder="Nimi"
              value={scoreUsername}
              onChange={(e) => setScoreUsername(e.target.value)}
            />
            <input type="submit" className="btn" value="Tallenna" onClick={async () => await handleStoringOfScore()} />
          </div>
        </>
      );
    }

    return (
      <>
        <p className="question">Haluatko tallentaa tuloksen?</p>
        <div className="choices">
          <button className="btn" onClick={handleApproveStoringOfScore}>
            Kyllä
          </button>
          <button className="btn" onClick={handleRejectStoringOfScore}>
            Ei
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <section>
        {gameState === GAME_STATES.START ? (
          <article className="game-container">
            <h1>Snake</h1>
            <button onClick={handleStartGame}>Aloita</button>
            <h3>Hall of Fame</h3>
            <table className="snake-scores">
              <thead>
                <tr>
                  <td>Käyttäjänimi</td>
                  <td>Tulos</td>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, i) => {
                  return (
                    <tr key={i}>
                      <td>{score.username}</td>
                      <td>{score.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </article>
        ) : (
          <></>
        )}
        {gameState === GAME_STATES.GAME ? (
          <>
            <p>Pisteet: {score}</p>
            <article className="game-container">
              <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
            </article>
          </>
        ) : (
          <></>
        )}
        {gameState === GAME_STATES.STOP ? (
          <article className="game-container">
            <h1>Peli on ohi</h1>
            <p>Pisteet: {score}</p>
            {GameOverOptions()}
          </article>
        ) : (
          <></>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Snake;

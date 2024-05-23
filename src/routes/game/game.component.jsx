import { Fragment, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./game.styles.css";
import gamesData from "./../../games-data/games.json";
import Header from "../../components/header/header.component";
import Footer from "../../components/footer/footer.component";

const Game = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const gameId = searchParams.get("id");
  const selectedGame = gamesData.games.filter((game) => {
    return game.ID == gameId;
  })[0];
  const players = selectedGame.hall_of_fame.sort((a, b) => b.score - a.score);

  const handleSearch = (search) => {
    setSearchValue(search);

    players.forEach((player) => {
      player.filtered = !player.username.toUpperCase().includes(search.toUpperCase());
    });
  };

  return (
    <>
      <Header />
      <a href="/" className="go-back">
        {"<"} Takaisin
      </a>
      <div className="game-view-container">
        <h1>{selectedGame.game_name.fi}</h1>
        <img src="/media/placeholder.webp" alt="Placeholder" />
      </div>
      <div className="game-view-container">
        <h2>Hall of Fame</h2>
        <div className="search-container">
          <input
            className="search-bar"
            placeholder="Hae käyttäjänimellä"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <td>Sijoitus</td>
              <td>Käyttäjänimi</td>
              <td>Tulos</td>
              <td>Päivämäärä</td>
            </tr>
          </thead>
          <tbody>
            {players.slice(0, 20).map((player, i) => {
              const hightLightClass = i == 0 ? "first" : i == 1 ? "second" : i == 2 ? "third" : "";
              return player?.filtered ? (
                <Fragment key={i} />
              ) : (
                <tr key={i} className={hightLightClass}>
                  <td>{i + 1}</td>
                  <td>{player.username}</td>
                  <td>{player.score}</td>
                  <td>{player.date_time.slice(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer style={{ marginTop: "20px" }} />
    </>
  );
};

export default Game;

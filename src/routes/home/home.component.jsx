import React, { Fragment, act, useEffect, useState } from "react";
import gamesData from "./../../games-data/games.json";
import "./home.styles.css";
import Header from "../../components/header/header.component";
import Footer from "../../components/footer/footer.component";
import GameCard from "../../components/gameCard/gameCard.component";
import Hero from "../../components/hero/hero.component";
import FooterHero from "../../components/footerHero/footerHero.component";

/*
  This is the Home (or the Index) page. This component will always be the landing
  page and is defined as the landing page in App.jsx, the route is '/'.
*/

const Home = () => {
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [games, setGames] = useState(
    gamesData.games.sort((a, b) => new Date(b.added_to_hall_of_fame) - new Date(a.added_to_hall_of_fame)),
  );
  let amountOfPages = 1;
  let shownCards = 0;

  const handleIncrement = () => {
    let incrementedActivePage = activePage + 1;

    if (incrementedActivePage > amountOfPages) {
      setActivePage(incrementedActivePage - 1);
      return;
    }

    setActivePage(incrementedActivePage);
  };

  const handleDecrement = () => {
    let decrementedActivePage = activePage - 1;

    if (decrementedActivePage < 1) {
      setActivePage(decrementedActivePage + 1);
      return;
    }

    setActivePage(decrementedActivePage);
  };

  const handleSearch = (search) => {
    setSearchValue(search);

    games.forEach((game) => {
      game.filtered = !game.game_name.fi.toUpperCase().includes(search.toUpperCase());
    });
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="search-container">
        <input
          className="search-bar"
          placeholder="Hae peliä"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="cards-container">
        {games.map((game, i) => {
          if (shownCards % 20 == 0 && shownCards != 0) {
            amountOfPages += 1;
          }
          if (!game?.filtered) {
            shownCards += 1;
          }

          game.on_page = amountOfPages;

          // First check if filtered then if game card should be on page.
          return game?.filtered ? (
            <Fragment key={i} />
          ) : game.on_page === activePage ? (
            <GameCard key={i} game={game} />
          ) : (
            <Fragment key={i} />
          );
        })}
      </div>
      <div className="page-selector">
        <button onClick={handleDecrement}>{"<-"}</button>
        <p>
          {activePage}/{amountOfPages}
        </p>
        <button onClick={handleIncrement}>{"->"}</button>
      </div>
      <FooterHero />
      <Footer />
    </>
  );
};

export default Home;

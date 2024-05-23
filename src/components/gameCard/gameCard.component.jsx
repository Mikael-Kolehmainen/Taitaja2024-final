import "./gameCard.styles.css";

const GameCard = ({ game }) => {
  const players = game.hall_of_fame.sort((a, b) => b.score - a.score);

  return (
    <div className="card-container">
      <img src="/media/placeholder.webp" alt="placeholder" />
      <div className="right">
        <a href={`/peli?id=${game.ID}`}>{game.game_name.fi}</a>
        <p>Paras tulos: {players[0].score}</p>
        <p>Voittaja: {players[0].username}</p>
      </div>
    </div>
  );
};

export default GameCard;

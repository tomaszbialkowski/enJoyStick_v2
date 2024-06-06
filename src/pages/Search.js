import { useSelector } from "react-redux";

export default function SearchResults() {
  const games = useSelector((state) => state.searchResults);

  return (
    <div>
      <p>
        Found
        {games.length > 1 ? `${games.length} games` : `${games.length}  game`}
      </p>
      <ul>
        {games.length > 0 &&
          games.map((game) => (
            <li key={game.id} style={{ position: "relative" }}>
              <h3 style={{ marginBottom: "4px", marginTop: "32px" }}>
                {game.title}
              </h3>
              <img
                src={game.cover ? game.cover : "img/image-placeholder.jpg"}
                alt={game.title}
              />
              <p>&nbsp;</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

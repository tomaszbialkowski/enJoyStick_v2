import useSelection from "../hooks/useSelection";
import Game from "./Game";
import { ListLabel } from "../constants/listLabels";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GamesList() {
  const { listName } = useParams();
  const listNameWithUpper =
    listName?.charAt(0).toUpperCase() + listName?.slice(1);

  const gamesByUrl = useSelector((state) =>
    state.games.filter((game) => game[`is${listNameWithUpper}`])
  );
  const { allGames } = useSelection();

  const games = listName ? gamesByUrl : allGames;
  return (
    <div>
      <h3>{listNameWithUpper ? listNameWithUpper : ListLabel.ALL}</h3>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Game id={game.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

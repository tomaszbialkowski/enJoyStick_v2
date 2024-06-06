import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useSelection from "../hooks/useSelection";
import Game from "./Game";
import { ListLabel } from "../constants/listLabels";

export default function GamesList() {
  const { listName } = useParams();
  const listNameWithUpper =
    listName?.charAt(0).toUpperCase() + listName?.slice(1);
  const gamesByUrl = useSelector((state) =>
    state.games.filter((game) => game[`is${listNameWithUpper}`])
  );
  const { allGames } = useSelection();
  const games = listName ? gamesByUrl : allGames;

  const dispatch = useDispatch();
  const badges = useSelector((state) => state.badgeNew);
  if (badges && badges.has(listNameWithUpper)) {
    dispatch({
      type: "HIDE_BADGE_NEW",
      listName: listNameWithUpper,
    });
  }

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

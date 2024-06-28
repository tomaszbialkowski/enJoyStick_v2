import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { getGamesInListFromUrl } from "../store/selectors/selectors";
import { getAllGames } from "../store/selectors/selectors";
import Game from "./Game";
import { ListLabel } from "../constants/listLabels";

export default function GamesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listName } = useParams();
  const listNameWithUpperCase =
    listName?.charAt(0).toUpperCase() + listName?.slice(1);
  const isUrlListName = Object.values(ListLabel).some(
    (url) => url === listNameWithUpperCase
  );
  const badges = useSelector((state) => state.badgeNew);
  const gamesInListFromUrl = useSelector((state) =>
    getGamesInListFromUrl(state, listNameWithUpperCase)
  );
  const allGames = useSelector(getAllGames);
  const games = listName
    ? gamesInListFromUrl.reverse()
    : [...allGames].reverse();

  useEffect(() => {
    if (badges && badges.has(listNameWithUpperCase)) {
      dispatch({
        type: "HIDE_BADGE_NEW",
        listName: listNameWithUpperCase,
      });
    }

    if (badges && badges.has(ListLabel.ALL)) {
      dispatch({
        type: "HIDE_BADGE_NEW",
        listName: ListLabel.ALL,
      });
    }
  }, [badges, dispatch, listNameWithUpperCase]);

  useEffect(() => {
    if (listName !== undefined && !isUrlListName) {
      navigate("/error");
    }
  }, [listName, navigate, isUrlListName]);

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          <Game id={game.id} />
        </li>
      ))}
    </ul>
  );
}

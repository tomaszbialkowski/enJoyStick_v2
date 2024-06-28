import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { ListLabel } from "../constants/listLabels";
import Badge from "../components/Badge";
import { getLists, getAllGames } from "../store/selectors/selectors";

export default function Lists() {
  const lists = useSelector(getLists);
  const allGames = useSelector(getAllGames);
  const badges = useSelector((state) => state.badgeNew);

  return (
    <aside className="container__main--lists">
      <ul>
        {lists.map((list) => {
          const gameCount =
            list === ListLabel.ALL
              ? allGames.length
              : allGames.filter((game) => game[`is${list}`]).length;

          return (
            <li key={list} className="list">
              <NavLink
                to={list === ListLabel.ALL ? "/" : `/${list.toLowerCase()}`}
                className="list-information"
              >
                {list.toUpperCase()}
                <Badge text={gameCount} />
                {badges.has(list) ? <Badge variant="new" /> : null}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import useSelection from "../hooks/useSelection";
import { ListLabel } from "../constants/listLabels";
import Badge from "../components/Badge";

export default function Lists({ path }) {
  const { lists, allGames } = useSelection();
  const badges = useSelector((state) => state.badgeNew);
  const pathName = path.slice(1);

  return (
    <aside className="container__main--catalogues">
      <ul>
        {lists.map((list) => {
          const gameCount =
            list === ListLabel.ALL
              ? allGames.length
              : allGames.filter((game) => game[`is${list}`]).length;

          return (
            <li key={list} className={list === pathName ? "active" : ""}>
              <NavLink
                to={list === ListLabel.ALL ? "/" : `/${list.toLowerCase()}`}
              >
                {list.toUpperCase()}
                <Badge text={gameCount} />
                {badges.has(list) ? <Badge text="NEW" /> : null}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

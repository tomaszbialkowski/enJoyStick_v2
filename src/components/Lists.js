import { NavLink } from "react-router-dom";
import useSelection from "../hooks/useSelection";
import { ListLabel } from "../constants/listLabels";
import { useSelector } from "react-redux";

export default function Lists() {
  const { lists, allGames } = useSelection();
  const badges = useSelector((state) => state.badgeNew);

  return (
    <aside className="container__main--catalogues">
      <ul>
        {lists.map((list) => (
          <li key={list}>
            <NavLink
              to={list === ListLabel.ALL ? "/" : `/${list.toLowerCase()}`}
            >
              {list.toUpperCase()} (
              {list === ListLabel.ALL
                ? allGames.length
                : allGames.filter((game) => game[`is${list}`]).length}
              ){" "}
              {badges.has(list) ? (
                <span>
                  <strong>NEW</strong>
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

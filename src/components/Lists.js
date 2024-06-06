import { NavLink } from "react-router-dom";
import useSelection from "../hooks/useSelection";
import { ListLabel } from "../constants/listLabels";

export default function Lists() {
  const { lists, allGames } = useSelection();

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
              )
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

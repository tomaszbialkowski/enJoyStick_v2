import { REACT_APP_OMDB_API_KEY } from "../constants/OAK";
import Button from "../components/Button";
import { showInfo } from "../components/Game";
import useSelection from "../hooks/useSelection";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const SearchResults = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const KEY = REACT_APP_OMDB_API_KEY;
  const [visibleBtnId, setVisibleBtnId] = useState("");
  const dispatch = useDispatch();
  const { allGames } = useSelection();

  const fetchData = async (query) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&type=game&s=${query}`
    );
    const results = await response.json();
    setData(
      results.Search.map((res) => ({
        cover: res.Poster === "N/A" ? "img/image-placeholder.jpg" : res.Poster,
        title: res.Title,
        year: res.Year,
        id: res.imdbID,
      }))
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      fetchData(query);
    }
  }, [location.search]);

  function handleClick(game) {
    if (!allGames.some((g) => g.id === game.id)) {
      dispatch({ type: "ADD_TO_GAMES", payload: game });
      showInfo(dispatch, true, `Add ${game.title} to Your list`, "Add");
    }
  }

  return (
    <div>
      <h3>
        Found
        {data.length > 1 ? `${data.length} games` : `${data.length}  game`}
      </h3>
      <ul>
        {data.map((game) => (
          <li
            key={game.id}
            onMouseEnter={() => setVisibleBtnId(game.id)}
            onMouseLeave={() => setVisibleBtnId(null)}
            style={{ position: "relative" }}
          >
            <h3 style={{ marginBottom: "4px", marginTop: "32px" }}>
              {game.title}
            </h3>
            <img src={game.cover} alt={game.title} />
            {visibleBtnId === game.id && (
              <Button
                text="Add Game to Your Collection"
                style={{ position: "absolute", top: "45%" }}
                onClick={() =>
                  handleClick({ ...game, upVotes: 0, downVotes: 0 })
                }
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

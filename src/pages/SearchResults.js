import { REACT_APP_OMDB_API_KEY } from "../constants/OAK";
import Button from "../components/Button";
import useSelection from "../hooks/useSelection";
import Badge from "../components/Badge";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SearchResults() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const KEY = REACT_APP_OMDB_API_KEY;
  const [selectedId, setSelectedId] = useState("");
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
      showInfo(true, `Add ${game.title} to Your list`, "Add");
      showBadgeNew();
    }
  }

  function showInfo(show, text, type) {
    dispatch({ type: "SHOW_MODAL", payload: { show, text, type } });
  }

  function showBadgeNew() {
    dispatch({
      type: "SHOW_BADGE_NEW",
      listName: "All",
    });
  }

  return (
    <div>
      <h3>
        Found
        <Badge text={`${data.length}`} />
        {data.length > 1 ? " games" : " game"}
      </h3>
      <ul>
        {data.map((game) => (
          <li
            key={game.id}
            onMouseEnter={() => setSelectedId(game.id)}
            onMouseLeave={() => setSelectedId(null)}
            style={{ position: "relative" }}
          >
            <h3 style={{ marginBottom: "4px", marginTop: "32px" }}>
              {game.title}
            </h3>
            <img src={game.cover} alt={game.title} />
            {selectedId === game.id &&
              (allGames.some((game) => game.id === selectedId) ? (
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    width: "200px",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    height: "100%",
                    fontWeight: "800",
                    padding: "8px",
                    margin: "auto",
                  }}
                >
                  <p>You alredy saved this game to your collection</p>
                </div>
              ) : (
                <Button
                  text={"Add Game to Your Collection"}
                  style={{ position: "absolute", top: "45%" }}
                  onClick={() =>
                    handleClick({ ...game, upVotes: 0, downVotes: 0 })
                  }
                />
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

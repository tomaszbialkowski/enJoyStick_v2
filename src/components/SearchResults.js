import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useModalActions from "../hooks/useModalActions";
import Button from "./Button";
import Badge from "./Badge";
import { Loader } from "./Loader";
import { getAllGames } from "../store/selectors/selectors";
import CoverImage from "./CoverImage";
import { coverSize } from "../constants/coverSize";
import { API_URL_WITH_KEY } from "../constants/apiUrl";

export default function SearchResults() {
  const location = useLocation();
  const dispatch = useDispatch();
  const allGames = useSelector(getAllGames);
  const { showModalInfo } = useModalActions();
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const fetchData = async (query) => {
    try {
      const response = await fetch(`${API_URL_WITH_KEY}&type=game&s=${query}`);
      const results = await response.json();

      if (results.Search) {
        setData(
          results.Search.map((res) => ({
            cover: res.Poster,
            title: res.Title,
            year: res.Year,
            id: res.imdbID,
          }))
        );
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [location.search]);

  function handleClick(game) {
    if (!allGames.some((g) => g.id === game.id)) {
      dispatch({ type: "ADD_TO_GAMES", payload: game });
      showModalInfo(true, `Add ${game.title} to Your list`, "Add");
      showBadgeNew();
    }
  }

  function showBadgeNew() {
    dispatch({
      type: "SHOW_BADGE_NEW",
      listName: "All",
    });
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>
            Found
            <Badge text={`${data.length}`} />
            {data.length === 1 ? " game" : " games"}
          </h3>
          {data.length === 0 ? (
            <p>No results found for query: {query}</p>
          ) : (
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
                  <CoverImage
                    src={game.cover}
                    title={game.title}
                    size={coverSize.THUMB}
                  />
                  {selectedId === game.id &&
                    (allGames.some((game) => game.id === selectedId) ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "22px",
                          width: "200px",
                          backgroundColor: "rgba(255,255,255,0.6)",
                          backdropFilter: "blur(2px)",
                          height: "100%",
                          fontWeight: "800",
                          padding: "8px",
                          margin: "auto",
                          color: "#000",
                        }}
                      >
                        <p>You alredy saved this game to your collection</p>
                      </div>
                    ) : (
                      <Button
                        text={"Add Game to Your Collection"}
                        style={{
                          position: "absolute",
                          top: "45%",
                          left: "16px",
                        }}
                        onClick={() =>
                          handleClick({ ...game, upVotes: 0, downVotes: 0 })
                        }
                      />
                    ))}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

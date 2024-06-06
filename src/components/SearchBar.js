import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { REACT_APP_OMDB_API_KEY } from "../constants/OAK";
import Button from "./Button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const resultsRef = useRef("");

  const [fireFetch, setFireFetch] = useState(false);
  const KEY = REACT_APP_OMDB_API_KEY;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSetQuery(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFireFetch((is) => !is);
  }

  useEffect(
    function () {
      async function fetchData() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&type=game&s=${query}`
        );
        const data = await res.json();

        resultsRef.current = data.Search.map((game) => ({
          cover:
            game.Poster === "N/A" ? "img/image-placeholder.jpg" : game.Poster,
          title: game.Title,
          year: game.Year,
          id: game.imdbID,
          upvotes: 0,
          downvotes: 0,
        }));

        dispatch({ type: "ADD_TO_RESULTS", payload: resultsRef.current });
        setQuery("");
        navigate("/search");
      }

      fireFetch && fetchData();
    },
    [fireFetch]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search...."
        value={query}
        onChange={handleSetQuery}
      />
      <Button text="Find" />
    </form>
  );
}

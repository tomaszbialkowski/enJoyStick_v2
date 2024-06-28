import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="searchBar">
      <div className="searchWraper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search new games to your collection..."
          className="search-input"
        />
        <Button
          text={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          className="btn_icon btn_icon--search"
        />
      </div>
    </form>
  );
};

export default SearchBar;

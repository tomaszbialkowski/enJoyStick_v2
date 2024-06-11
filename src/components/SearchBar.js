import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search new games to your collection..."
      />
      <Button text="🔍" />
    </form>
  );
};

export default SearchBar;

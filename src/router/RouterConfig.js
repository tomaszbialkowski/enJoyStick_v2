import { Routes, Route } from "react-router-dom";

import GamesList from "../components/GamesList";
import GameDetails from "../components/GameDetails";
import SearchResults from "../components/SearchResults";
import Error from "../components/Error";

export default function RouterConfig() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GamesList />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/error" element={<Error />} />
        <Route path="/:listName" element={<GamesList />} />
      </Routes>
    </>
  );
}

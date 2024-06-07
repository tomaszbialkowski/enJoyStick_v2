import { Routes, Route } from "react-router-dom";

import GamesList from "../components/GamesList";
import GameDetails from "../components/GameDetails";
import SearchResults from "../pages/SearchResults";
import Error from "../pages/Error";

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<GamesList />} />
      <Route path="/:listName" element={<GamesList />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

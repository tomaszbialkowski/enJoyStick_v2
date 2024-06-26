import { Routes, Route } from "react-router-dom";

import GamesList from "../components/GamesList";
import GameDetails from "../components/GameDetails";
import SearchResults from "../components/SearchResults";
import Error from "../components/Error";

// const CurrentLocation = () => {
//   const location = useLocation();
//   console.log("Current location:", location.pathname);
//   return null;
// };

export default function RouterConfig() {
  return (
    <>
      {/* <CurrentLocation /> */}
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

import { Routes, Route } from "react-router-dom";

import { ListLabel } from "../constants/listLabels";

import GamesList from "../components/GamesList";
// import GameDetails from "../components/GameDetails";
// import Search from "../pages/Search";
// import Egg from "../pages/Egg";
// import Error from "../pages/Error";

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<GamesList />} />
      <Route path="/:listName" element={<GamesList />} />
      {/*<Route path="/search" element={<Search />} />
      <Route path="/game/:title" element={<GameDetails />} />
      <Route path="/egg" element={<Egg />} />
      <Route path="*" element={<Error />} /> */}
    </Routes>
  );
}

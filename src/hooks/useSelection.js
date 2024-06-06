import { useSelector } from "react-redux";

function selectGameById(state, gameId) {
  const game = state.games.find((game) => game.id === gameId);
  if (game) return game;
  return null;
}

export default function useSelection(gameId) {
  const allGames = useSelector((state) => state.games);
  const lists = useSelector((state) => state.lists);

  const gameById = useSelector((state) => selectGameById(state, gameId));
  const modalType = useSelector((state) => state.info.type);

  return {
    allGames,
    lists,
    gameById,
    modalType,
  };
}

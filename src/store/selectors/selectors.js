import { createSelector } from "reselect";

export const getAllGames = (state) => state.games;
export const getBadgesNew = (state) => state.badgeNew;
export const getLists = (state) => state.lists;
export const getModalType = (state) => state.info.type;

export const getGamesInListFromUrl = createSelector(
  [getAllGames, (_, listName) => listName],
  (games, list) => {
    return games.filter((game) => game[`is${list}`]);
  }
);

export const getGameById = createSelector(
  [getAllGames, (_, i) => i],
  (games, i) => {
    return games.find((game) => game.id === i);
  }
);

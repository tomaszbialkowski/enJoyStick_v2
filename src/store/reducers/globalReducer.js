import { ListLabel } from "../../constants/listLabels";

const initialData = [
  {
    title: "Moon Patrol",
    id: "tt0317921",
    year: "1982",
    upVotes: 4,
    downVotes: 4,
    cover: "Moon Patrol.jpg",
    developer: "Irem",
    isFavourite: false,
    isHot: false,
    isLame: false,
    isPlayed: false,
    isFinished: false,
  },
  {
    title: "River Raid",
    upVotes: 8,
    downVotes: 1,
    cover: "River Raid.jpg",
    id: "tt5733396",
    year: "1982",
    developer: "Activision",
    isFavourite: true,
    isHot: false,
    isLame: false,
    isPlayed: true,
    isFinished: true,
  },
  {
    title: "Zorro",
    upVotes: 4,
    downVotes: 5,
    cover: "Zorro.jpg",
    id: "tt1289679",
    year: "1985",
    developer: "Datasoft",
    isFavourite: true,
    isHot: false,
    isLame: false,
    isPlayed: true,
    isFinished: false,
  },
];

const initState = {
  games: initialData,
  info: {
    show: false,
    text: "",
    type: "",
  },
  searchResults: [],
  lists: [
    ListLabel.ALL,
    ListLabel.HOT,
    ListLabel.LAME,
    ListLabel.FAVOURITE,
    ListLabel.PLAYED,
    ListLabel.FINISHED,
  ],
  badgeNew: new Set(),
};

export const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "INCREASE_DOWNVOTES":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload
            ? { ...game, downVotes: game.downVotes + 1 }
            : game
        ),
      };
    case "INCREASE_UPVOTES":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload
            ? { ...game, upVotes: game.upVotes + 1 }
            : game
        ),
      };
    case "ADD_TO_HOT":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isHot: true } : game
        ),
      };
    case "REMOVE_FROM_HOT":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isHot: false } : game
        ),
      };
    case "ADD_TO_LAME":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isLame: true } : game
        ),
      };
    case "REMOVE_FROM_LAME":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isLame: false } : game
        ),
      };
    case "ADD_TO_FAVOURITE":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isFavourite: true } : game
        ),
      };
    case "REMOVE_FROM_FAVOURITE":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isFavourite: false } : game
        ),
      };
    case "ADD_TO_PLAYED":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isPlayed: true } : game
        ),
      };
    case "REMOVE_FROM_PLAYED":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isPlayed: false } : game
        ),
      };
    case "ADD_TO_FINISHED":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isFinished: true } : game
        ),
      };
    case "REMOVE_FROM_FINISHED":
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, isFinished: false } : game
        ),
      };
    case "SHOW_BADGE_NEW":
      return {
        ...state,
        badgeNew: new Set(state.badgeNew).add(action.listName),
      };
    case "HIDE_BADGE_NEW":
      if (state.badgeNew.has(action.listName)) {
        const updatedBadgeNew = new Set(state.badgeNew);
        updatedBadgeNew.delete(action.listName);
        return {
          ...state,
          badgeNew: updatedBadgeNew,
        };
      }
      return state;
    case "SHOW_MODAL":
      return {
        ...state,
        info: {
          show: action.payload.show,
          text: action.payload.text,
          type: action.payload.type,
        },
      };
    case "HIDE_MODAL": {
      return { ...state, info: { ...state.info, show: false } };
    }
    case "ADD_TO_GAMES":
      return {
        ...state,
        games: [...state.games, action.payload],
      };
    case "DELETE_GAME":
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload),
      };
    default:
      return state;
  }
};

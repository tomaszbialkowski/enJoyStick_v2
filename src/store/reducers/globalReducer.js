import { ListLabel } from "../../constants/listLabels";

const initialDataOLD = [
  {
    title: "Moon Patrol",
    id: "tt0317921",
    year: "1982",
    upvotes: 4,
    downvotes: 0,
    cover: "Moon Patrol.jpg",
    developer: "Irem",
  },
  {
    title: "River Raid",
    upvotes: 6,
    downvotes: 0,
    cover: "River Raid.jpg",
    id: "tt5733396",
    year: "1982",
    developer: "Activision",
  },
  {
    title: "Zorro",
    upvotes: 6,
    downvotes: 0,
    cover: "Zorro.jpg",
    id: "tt1289679",
    year: "1985",
    developer: "Datasoft",
  },
  {
    title: "Bruce Lee",
    upvotes: 6,
    downvotes: 0,
    cover: "Bruce Lee.jpg",
    id: "tt0408597",
    year: "1985",
    developer: "Datasoft",
  },
  {
    title: "Frogger",
    upvotes: 6,
    downvotes: 0,
    cover: "Frogger.jpg",
    id: "tt0294586",
    year: "1981",
    developer: "Konami",
  },
  {
    title: "Boulder Dash",
    upvotes: 6,
    downvotes: 0,
    cover: "Boulder Dash.jpg",
    id: "tt0843476",
    year: "1984",
    developer: "Data East",
  },
  {
    title: "The Goonies",
    upvotes: 6,
    downvotes: 0,
    cover: "The Goonies.jpg",
    id: "tt1289573",
    year: "1985",
    developer: "Datasoft",
  },
  {
    title: "Pitfall!",
    upvotes: 6,
    downvotes: 0,
    cover: "Pitfall.jpg",
    id: "tt0186450",
    year: "1982",
    developer: "Activision",
  },
  {
    title: "Jet Set Willy",
    upvotes: 6,
    downvotes: 0,
    cover: "Jet Set Willy.jpg",
    id: "tt0396071",
    year: "1984",
    developer: "Software Projects",
  },
  {
    title: "The Great American Cross-Country Road Race",
    upvotes: 6,
    downvotes: 0,
    cover: "Road Race.jpg",
    id: "tt3253682",
    year: "1985",
    developer: "Activision",
  },
  {
    title: "The Great Giana Sisters",
    upvotes: 6,
    downvotes: 0,
    cover: "Giana Sisters.jpg",
    id: "tt0462319",
    year: "1987",
    developer: "Time Warp",
  },
  {
    title: "Donkey Kong Jr",
    upvotes: 6,
    downvotes: 0,
    cover: "Donkey Kong Jr.jpg",
    id: "tt0176664",
    year: "1981",
    developer: "Nintendo",
  },
  {
    title: "Pong",
    upvotes: 6,
    downvotes: 0,
    cover: "Pong.jpg",
    id: "tt0360891",
    year: "1972",
    developer: "Atari",
  },
  {
    title: "Arkanoid",
    upvotes: 6,
    downvotes: 0,
    cover: "Arkanoid.jpg",
    id: "tt0185887",
    year: "1986",
    developer: "Taito",
  },
  {
    title: "Flashback",
    upvotes: 6,
    downvotes: 0,
    cover: "Flashback.jpg",
    id: "tt0829171",
    year: "1992",
    developer: "Delphine Software International",
  },
  {
    title: "Another World",
    upvotes: 6,
    downvotes: 0,
    cover: "Another World.jpg",
    id: "tt0268516",
    year: "1991",
    developer: "Delphine Software International",
  },
  {
    title: "Prince of Persia",
    upvotes: 6,
    downvotes: 0,
    cover: "Prince of Persia.jpg",
    id: "tt0212448",
    year: "1989",
    developer: "Broderbund",
  },
];

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

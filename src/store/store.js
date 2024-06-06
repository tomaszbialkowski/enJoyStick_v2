import { createStore } from "redux";
import { gameReducer } from "./reducers/globalReducer";

const store = createStore(gameReducer);

export default store;

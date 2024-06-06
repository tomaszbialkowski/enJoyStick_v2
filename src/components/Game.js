import useSelection from "../hooks/useSelection";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useDispatch } from "react-redux";

export default function Game({ id }) {
  const { gameById: game } = useSelection(id);
  const { title, upVotes, downVotes, cover } = game;
  const result = upVotes - downVotes;
  const isFavourite = game.isFavourite;
  const isPlayed = game.isPlayed;
  const isFinished = game.isFinished;
  const isHot = game.isHot;
  const isLame = game.isLame;

  const dispatch = useDispatch();

  if (result > 5 && !isHot) {
    addToHotList();
  }

  if (result < 0 && !isLame) {
    addToLameList();
  }

  function addToHotList() {
    dispatch({
      type: "ADD_TO_HOT",
      payload: id,
    });
  }

  function addToLameList() {
    dispatch({
      type: "ADD_TO_LAME",
      payload: id,
    });
  }

  function handleFavouritesList() {
    if (!isFavourite) {
      dispatch({
        type: "ADD_TO_FAVOURITE",
        payload: id,
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_FAVOURITE",
        payload: id,
      });
    }
  }

  function handlePlayedList() {
    if (!isPlayed) {
      dispatch({
        type: "ADD_TO_PLAYED",
        payload: id,
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_PLAYED",
        payload: id,
      });
    }
  }

  function handleFinishedList() {
    if (!isFinished) {
      dispatch({
        type: "ADD_TO_FINISHED",
        payload: id,
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_FINISHED",
        payload: id,
      });
    }
  }

  return (
    <div>
      <h3 style={{ marginBottom: "4px", marginTop: "32px" }}>{title}</h3>
      <Button
        text={!isFavourite ? "Add to FAV" : "Remove from FAV"}
        onClick={handleFavouritesList}
      />
      <Button text="Played" onClick={handlePlayedList} />
      <Button text="Finished" onClick={handleFinishedList} />
      <Link to={`/game/${title}`}>
        <img src={`/img/covers/${cover}`} alt={`cover of ${title}`} />
      </Link>
      <div>
        <div>
          <Button text={`Downs: ${downVotes}`} />
          <span>{result}</span>
          <Button text={`Likes: ${upVotes}`} />
        </div>
      </div>
    </div>
  );
}

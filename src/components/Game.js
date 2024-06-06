import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import useSelection from "../hooks/useSelection";
import Button from "./Button";

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

  useEffect(() => {
    if (result >= 5 && !isHot) {
      addToHotList();
    }

    if (result < 0 && !isLame) {
      addToLameList();
    }
  }, []);

  function handleDownVotes() {
    dispatch({
      type: "INCREASE_DOWNVOTES",
      payload: id,
    });
    if (result === 0 && !isLame) {
      addToLameList();
    }
    if (result === 5 && isHot) {
      removeFromHotList();
    }
  }

  function handleUpVotes() {
    dispatch({
      type: "INCREASE_UPVOTES",
      payload: id,
    });
    if (result === 4 && !isHot) {
      addToHotList();
    }
    if (result === -1 && isLame) {
      removeFromLameList();
    }
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

  function removeFromHotList() {
    dispatch({
      type: "REMOVE_FROM_HOT",
      payload: id,
    });
  }

  function removeFromLameList() {
    dispatch({
      type: "REMOVE_FROM_LAME",
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
          <Button text={`Downs: ${downVotes}`} onClick={handleDownVotes} />
          <span>{result}</span>
          <Button text={`Likes: ${upVotes}`} onClick={handleUpVotes} />
        </div>
      </div>
    </div>
  );
}

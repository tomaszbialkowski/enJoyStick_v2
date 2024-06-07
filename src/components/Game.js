import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

import useSelection from "../hooks/useSelection";
import Button from "./Button";
import { ListLabel } from "../constants/listLabels";

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

  const gameImage = cover.startsWith("https") ? cover : `/img/covers/${cover}`;
  const [imageSrc, setImageSrc] = useState(gameImage);
  const placeholder = "/img/image-placeholder.jpg";

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
      showBadgeNew(ListLabel.LAME);
      showInfo(true, `Add to ${ListLabel.LAME} list`, "Add");
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
      showBadgeNew(ListLabel.HOT);
      showInfo(true, `Add to ${ListLabel.HOT} list`, "Add");
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
    showInfo(true, `Remove from ${ListLabel.HOT} list`, "Remove");
  }

  function removeFromLameList() {
    dispatch({
      type: "REMOVE_FROM_LAME",
      payload: id,
    });
    showInfo(true, `Remove from ${ListLabel.LAME} list`, "Remove");
  }

  function handleFavouritesList() {
    if (!isFavourite) {
      dispatch({
        type: "ADD_TO_FAVOURITE",
        payload: id,
      });
      showBadgeNew(ListLabel.FAVOURITE);
      showInfo(true, `Add from ${ListLabel.FAVOURITE} list`, "Add");
    } else {
      dispatch({
        type: "REMOVE_FROM_FAVOURITE",
        payload: id,
      });
      showInfo(true, `Remove from ${ListLabel.FAVOURITE} list`, "Remove");
    }
  }

  function handlePlayedList() {
    if (!isPlayed) {
      dispatch({
        type: "ADD_TO_PLAYED",
        payload: id,
      });
      showBadgeNew(ListLabel.PLAYED);
      showInfo(true, `Add from ${ListLabel.PLAYED} list`, "Add");
    } else {
      dispatch({
        type: "REMOVE_FROM_PLAYED",
        payload: id,
      });
      showInfo(true, `Remove from ${ListLabel.PLAYED} list`, "Remove");
    }
  }

  function handleFinishedList() {
    if (!isFinished) {
      dispatch({
        type: "ADD_TO_FINISHED",
        payload: id,
      });
      showBadgeNew(ListLabel.FINISHED);
      showInfo(true, `Add from ${ListLabel.FINISHED} list`, "Add");
    } else {
      dispatch({
        type: "REMOVE_FROM_FINISHED",
        payload: id,
      });
      showInfo(true, `Remove from ${ListLabel.FINISHED} list`, "Remove");
    }
  }

  function showBadgeNew(listName) {
    dispatch({
      type: "SHOW_BADGE_NEW",
      listName,
    });
  }

  function showInfo(show, text, type) {
    dispatch({ type: "SHOW_MODAL", payload: { show, text, type } });
  }

  function handleImageError() {
    console.log("blad ladowania obrazka");
    setImageSrc(placeholder);
  }

  function handleDeleteGame() {
    dispatch({
      type: "DELETE_GAME",
      payload: id,
    });
    showInfo(true, `Delete ${game.title} from Your list`, "Remove");
  }

  return (
    <div>
      <h3 style={{ marginBottom: "4px", marginTop: "32px" }}>{title}</h3>
      <div>
        <Button
          text={!isFavourite ? "Add to FAV" : "Remove from FAV"}
          onClick={handleFavouritesList}
        />
        <Button text="Played" onClick={handlePlayedList} />
        <Button text="Finished" onClick={handleFinishedList} />
      </div>
      <Link to={`/game/${id}`}>
        <img
          src={imageSrc}
          alt={`cover of ${title}`}
          onError={handleImageError}
        />
      </Link>
      <div>
        <div>
          <Button text={`Downs: ${downVotes}`} onClick={handleDownVotes} />
          <span>{result}</span>
          <Button text={`Likes: ${upVotes}`} onClick={handleUpVotes} />
          <Button text="Delete" onClick={handleDeleteGame} />
        </div>
      </div>
    </div>
  );
}

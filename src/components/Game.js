import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import useModalActions from "../hooks/useModalActions";
import Button from "./Button";
import { ListLabel } from "../constants/listLabels";
import { getGameById } from "../store/selectors/selectors";
import CoverImage from "./CoverImage";
import { coverSize } from "../constants/coverSize";

export default function Game({ id }) {
  const game = useSelector((state) => getGameById(state, id));
  const { title, upVotes, downVotes, cover } = game;
  const dispatch = useDispatch();

  const { showModalInfo } = useModalActions();
  const result = upVotes - downVotes;
  const isFavourite = game.isFavourite;
  const isPlayed = game.isPlayed;
  const isFinished = game.isFinished;
  const isHot = game.isHot;
  const isLame = game.isLame;

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
      showModalInfo(true, `Add to ${ListLabel.LAME} list`, "Add");
    }
    if (result === 5 && isHot) {
      removeFromHotList();
    }
    if (isHot) hideBadgeNew(ListLabel.HOT);
  }

  function handleUpVotes() {
    dispatch({
      type: "INCREASE_UPVOTES",
      payload: id,
    });
    if (result === 4 && !isHot) {
      addToHotList();
      showBadgeNew(ListLabel.HOT);
      showModalInfo(true, `Add to ${ListLabel.HOT} list`, "Add");
    }
    if (result === -1 && isLame) {
      removeFromLameList();
    }
    if (isLame) hideBadgeNew(ListLabel.LAME);
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
    showModalInfo(true, `Remove from ${ListLabel.HOT} list`, "Remove");
  }

  function removeFromLameList() {
    dispatch({
      type: "REMOVE_FROM_LAME",
      payload: id,
    });
    showModalInfo(true, `Remove to ${ListLabel.LAME} list`, "Remove");
    if (isLame) hideBadgeNew(ListLabel.LAME);
  }

  function handleFavouritesList() {
    if (!isFavourite) {
      dispatch({
        type: "ADD_TO_FAVOURITE",
        payload: id,
      });
      showBadgeNew(ListLabel.FAVOURITE);
      showModalInfo(true, `Add to  ${ListLabel.FAVOURITE} list`, "Add");
    } else {
      dispatch({
        type: "REMOVE_FROM_FAVOURITE",
        payload: id,
      });
      showModalInfo(true, `Remove from ${ListLabel.FAVOURITE} list`, "Remove");
      if (isFavourite) hideBadgeNew(ListLabel.FAVOURITE);
    }
  }

  function handlePlayedList() {
    if (!isPlayed) {
      dispatch({
        type: "ADD_TO_PLAYED",
        payload: id,
      });
      showBadgeNew(ListLabel.PLAYED);
      showModalInfo(true, `Add to ${ListLabel.PLAYED} list`, "Add");
    } else {
      dispatch({
        type: "REMOVE_FROM_PLAYED",
        payload: id,
      });
      showModalInfo(true, `Remove from ${ListLabel.PLAYED} list`, "Remove");
      if (isPlayed) hideBadgeNew(ListLabel.PLAYED);
    }
  }

  function handleFinishedList() {
    if (!isFinished) {
      dispatch({
        type: "ADD_TO_FINISHED",
        payload: id,
      });
      showBadgeNew(ListLabel.FINISHED);
      showModalInfo(true, `Add to ${ListLabel.FINISHED} list`, "Add");
    } else {
      dispatch({
        type: "REMOVE_FROM_FINISHED",
        payload: id,
      });
      showModalInfo(true, `Remove from ${ListLabel.FINISHED} list`, "Remove");
      if (isFinished) hideBadgeNew(ListLabel.FINISHED);
    }
  }

  function showBadgeNew(listName) {
    dispatch({
      type: "SHOW_BADGE_NEW",
      listName,
    });
  }

  function hideBadgeNew(listName) {
    dispatch({
      type: "HIDE_BADGE_NEW",
      listName,
    });
  }

  function handleDeleteGame() {
    dispatch({
      type: "DELETE_GAME",
      payload: id,
    });
    showModalInfo(true, `Delete ${game.title} from Your list`, "Remove");
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
        <CoverImage src={cover} title={title} size={coverSize.THUMB} />
      </Link>
      <div>
        <div>
          <Button text={`Downs: ${downVotes}`} onClick={handleDownVotes} />
          <span>{result}</span>
          <Button text={`Likes: ${upVotes}`} onClick={handleUpVotes} />
          <Button text="❌" onClick={handleDeleteGame} />
        </div>
      </div>
    </div>
  );
}

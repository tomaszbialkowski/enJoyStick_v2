import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useModalActions from "../hooks/useModalActions";
import Button from "./Button";
import { ListLabel } from "../constants/listLabels";
import { getGameById } from "../store/selectors/selectors";
import CoverImage from "./CoverImage";
import { coverSize } from "../constants/coverSize";
import {
  faCircleXmark,
  faGamepad,
  faHeart,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

export default function Game({ id }) {
  const game = useSelector((state) => getGameById(state, id));
  const { title, upVotes, downVotes, cover } = game;
  const dispatch = useDispatch();

  const { showModalInfo } = useModalActions();
  const result = upVotes - downVotes;
  const { isFavourite, isPlayed, isFinished, isHot, isLame } = game;

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

  function handleListAction(isOnlist, addType, removeType, listName) {
    if (!isOnlist) {
      dispatch({
        type: addType,
        payload: id,
      });
      showBadgeNew(listName);
      showModalInfo(true, `Add to ${listName} list`, "Add");
    } else {
      dispatch({
        type: removeType,
        payload: id,
      });
      showModalInfo(true, `Remove from ${listName} list`, "Remove");
      if (isOnlist) hideBadgeNew(listName);
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
    <div className="container_main--game">
      <Button
        className="btn_icon--delete"
        text={<FontAwesomeIcon icon={faCircleXmark} />}
        onClick={handleDeleteGame}
      />
      <h3 className="game_header">{title}</h3>
      <div className="buttonWrapper">
        <Button
          className={`btn_icon--listHandlers ${!isFavourite ? "" : "fav"}`}
          text={<FontAwesomeIcon icon={faHeart} />}
          onClick={() =>
            handleListAction(
              isFavourite,
              "ADD_TO_FAVOURITE",
              "REMOVE_FROM_FAVOURITE",
              ListLabel.FAVOURITE
            )
          }
        />
        <Button
          className={`btn_icon--listHandlers ${!isPlayed ? "" : "played"}`}
          text={<FontAwesomeIcon icon={faGamepad} />}
          onClick={() =>
            handleListAction(
              isPlayed,
              "ADD_TO_PLAYED",
              "REMOVE_FROM_PLAYED",
              ListLabel.PLAYED
            )
          }
        />
        <Button
          className={`btn_icon--listHandlers ${!isFinished ? "" : "finished"}`}
          text={<FontAwesomeIcon icon={faTrophy} />}
          onClick={() =>
            handleListAction(
              isFinished,
              "ADD_TO_FINISHED",
              "REMOVE_FROM_FINISHED",
              ListLabel.FINISHED
            )
          }
        />
      </div>
      <Link to={`/game/${id}`}>
        <CoverImage src={cover} title={title} size={coverSize.THUMB} />
      </Link>
      <div className="buttonWrapper">
        <Button text={`Downs: ${downVotes}`} onClick={handleDownVotes} />
        <div className="game_score">{result}</div>
        <Button text={`Likes: ${upVotes}`} onClick={handleUpVotes} />
      </div>
    </div>
  );
}

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
  faThumbsDown,
  faThumbsUp,
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
      showModalInfo(
        true,
        `${game.title} was added to ${ListLabel.LAME} list`,
        "Add"
      );
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
      showModalInfo(
        true,
        `${game.title} was added to ${ListLabel.HOT} list`,
        "Add"
      );
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
    showModalInfo(
      true,
      `${game.title} was removed from ${ListLabel.HOT} list`,
      "Remove"
    );
  }

  function removeFromLameList() {
    dispatch({
      type: "REMOVE_FROM_LAME",
      payload: id,
    });
    showModalInfo(
      true,
      `${game.title} was removed to ${ListLabel.LAME} list`,
      "Remove"
    );
    if (isLame) hideBadgeNew(ListLabel.LAME);
  }

  function handleListAction(isOnlist, addType, removeType, listName) {
    if (!isOnlist) {
      dispatch({
        type: addType,
        payload: id,
      });
      showBadgeNew(listName);
      showModalInfo(true, `${game.title} was added to ${listName} list`, "Add");
    } else {
      dispatch({
        type: removeType,
        payload: id,
      });
      showModalInfo(
        true,
        `${game.title} was removed from ${listName} list`,
        "Remove"
      );
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
    showModalInfo(true, `${game.title} was deleted from Your list`, "Remove");
  }

  return (
    <div className="container_main--game">
      <Button
        className="btn_icon btn_icon--delete"
        text={<FontAwesomeIcon icon={faCircleXmark} />}
        onClick={handleDeleteGame}
      />
      <h3 className="game_header">{title}</h3>
      <div className="buttonWrapper">
        <Button
          className={`btn_icon btn_icon--listHandlers ${
            !isFavourite ? "" : "fav"
          }`}
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
          className={`btn_icon btn_icon--listHandlers ${
            !isPlayed ? "" : "played"
          }`}
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
          className={`btn_icon btn_icon--listHandlers ${
            !isFinished ? "" : "finished"
          }`}
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
      <div className="buttonWrapper votes">
        <Button onClick={handleDownVotes} className="btn_icon votes down">
          <FontAwesomeIcon icon={faThumbsDown} />
          <span>{downVotes}</span>
        </Button>
        <div className="game_score">
          {result}
          <span>SCORE</span>
        </div>
        <Button onClick={handleUpVotes} className="btn_icon votes up">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{upVotes}</span>
        </Button>
      </div>
      <div className="gameCard_footer">ENJOYSTICK</div>
    </div>
  );
}

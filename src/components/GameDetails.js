import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";
import { Loader } from "./Loader";
import CoverImage from "./CoverImage";
import { coverSize } from "../constants/coverSize";
import { API_URL_WITH_KEY } from "../constants/apiUrl";
import Badge from "./Badge";

export default function GameDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await fetch(`${API_URL_WITH_KEY}&i=${id}`);
        const data = await response.json();

        const gameImage = data.Poster.startsWith("https")
          ? data.Poster
          : `/img/covers/${data.Title}.jpg`;

        const game = {
          title: data.Title,
          genre: data.Genre,
          plot: data.Plot,
          poster: gameImage,
          released: data.Released,
          writer: data.Writer,
          rating: data.imdbRating,
          actors: data.Actors,
          awards: data.Awards,
          director: data.Director,
          country: data.Country,
        };
        setDetails(game);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGame();
  }, []);

  const renderDetail = (label, value) => {
    if (value === "N/A") return null;
    return (
      // <div style={{ display: "flex", alignItems: "baseline" }}>
      <div className="game_paragraph">
        <Badge text={label} variant="info" />
        <div className="game_paragraph--text">{value}</div>
      </div>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container_games">
      <Button
        text={<FontAwesomeIcon icon={faChevronLeft} />}
        className="btn_icon btn_icon--back"
        onClick={() => navigate(-1)}
      />
      <h1 className="game_title">{details.title}</h1>
      <CoverImage
        src={details.poster}
        title={details.title}
        size={coverSize.LARGE}
        className="game_poster--large"
      />
      {renderDetail("Plot", details.plot)}
      {renderDetail("Genre", details.genre)}
      {renderDetail("Date", details.released)}
      {renderDetail("Production", details.country)}
      {renderDetail("Writer", details.writer)}
      {renderDetail("Director", details.director)}
      {renderDetail("Starring", details.actors)}
      {renderDetail("Awards", details.awards)}
      {renderDetail("Rating", details.rating)}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  );
}

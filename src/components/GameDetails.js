import { useParams, useNavigate } from "react-router-dom";
import { REACT_APP_OMDB_API_KEY } from "../constants/OAK";
import { useEffect, useState } from "react";

import Button from "./Button";

export default function GameDetails() {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const KEY = REACT_APP_OMDB_API_KEY;
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const placeholder = "/img/image-placeholder.jpg";

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
      );
      const data = await response.json();

      const gameImage = data.Poster.startsWith("https")
        ? data.Poster
        : `/img/covers/${data.Title}.jpg`;

      setImageSrc(gameImage);

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
    }
    fetchGame();
  }, []);

  function handleImageError() {
    setImageSrc(placeholder);
  }

  const renderDetail = (label, value) => {
    if (value === "N/A") return null;
    return (
      <p>
        <span>{label}:</span>
        <span>{value}</span>
      </p>
    );
  };

  return (
    <div>
      <Button text="< Back" className="back" onClick={() => navigate(-1)} />
      <h1>{details.title}</h1>
      <img
        src={imageSrc}
        alt={`Poster of ${details.title} game`}
        onError={handleImageError}
        style={{ width: "400px" }}
      />
      {renderDetail("Script", details.plot)}
      {renderDetail("Genre", details.genre)}
      {renderDetail("Date", details.released)}
      {renderDetail("Production", details.country)}
      {renderDetail("Writer", details.writer)}
      {renderDetail("Director", details.director)}
      {renderDetail("Starring", details.actors)}
      {renderDetail("Awards", details.awards)}
      {renderDetail("Rating", details.rating)}
    </div>
  );
}

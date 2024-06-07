import { useParams, useNavigate } from "react-router-dom";
import { REACT_APP_OMDB_API_KEY } from "../constants/OAK";
import { useEffect, useState } from "react";

import Button from "./Button";

export default function GameDetails() {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const KEY = REACT_APP_OMDB_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
      );
      const data = await response.json();
      const game = {
        title: data.Title,
        genre: data.Genre,
        plot: data.Plot,
        poster: data.Poster,
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

  return (
    <div>
      <Button text="< Back" className="back" onClick={() => navigate(-1)} />
      <h1>{details.title}</h1>
      <img src={`${details.poster}`} alt={`Poster of ${details.title} game`} />
      <p>{details.plot}</p>
      <p>{details.genre}</p>
      <p>
        {details.released}
        {details.country}
      </p>
      <p>Writer: {details.writer}</p>
      <p>Director: {details.director}</p>
      <p>Starring: {details.actors}</p>
      <p>Awards: {details.awards}</p>
      <p>Rating: {details.rating}</p>
    </div>
  );
}

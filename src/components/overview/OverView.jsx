import "./OverView.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const OverView = () => {
  const { id } = useParams(); // Obtener el id de la película desde la URL
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]); // Estado para almacenar los actores
  const apikey = "23da33353d9197e847bc2815258c3994";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=es-ES`
        );
        const data = await response.json();
        setMovie(data);
        console.log(data);

        // Obtener los créditos (actores)
        const responseActors = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=es-ES`
        );
        const actorsData = await responseActors.json();
        setActors(actorsData.cast.slice(0, 5)); // Guarda los primeros 5 actores en el estado
        console.log(actorsData); // Muestra la información de los actores en consola
      } catch (error) {
        console.error("Error al obtener los detalles de la película", error);
      }
    };

    fetchMovie();
  }, [id]); // Se ejecuta cada vez que cambia el id

  if (!movie) {
    return <p>Cargando detalles de la película...</p>;
  }

  return (
    <>
      <div className="overview-container">
        <img
          className="overview-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="overview-content">
          <h1 className="overview-title">{movie.title}</h1>
          <p className="overview-description">{movie.overview}</p>
          <p className="overview-geners">
            <strong>Géneros: </strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="overview-actors">
            <strong>Actores: </strong>
            {actors.length > 0
              ? actors.map((actor) => actor.name).join(", ")
              : "No disponible"}
          </p>
        </div>
        <div className="back-button-container">
          <button className="back-button" onClick={() => window.history.back()}>
            Volver
          </button>
        </div>
      </div>
    </>
  );
};

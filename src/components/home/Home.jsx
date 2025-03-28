import "./Home.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const apikey = "23da33353d9197e847bc2815258c3994";
  const url = `https://api.themoviedb.org/3/search/movie`;
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate(); // Hook para redireccionar

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    fetchMovies();
    setSearch("");
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${url}?api_key=${apikey}&query=${search}&language=es-ES`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container">
      <h1>Buscador de películas</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>

      {movies.length > 0 ? (
        //Contenedor de todas las cartas de las películas
        <div className="movie-list">
          {movies.map((movie) => (
            //Carta de una película
            <div className="movie-card" key={movie.id}>
              <button
                className="movie-button"
                onClick={() => navigate(`/movie/${movie.id}`)} // Redirige a la página de detalles
              >
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </button>

              {/* {movie.overview.length > 100 && (
                  <button
                    className="toggle-button"
                    onClick={() => toggleExpand(movie.id)}
                  >
                    {expanded[movie.id] ? "Ver menos" : "Ver más"}
                  </button>
                )} */}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay películas para mostrar</p>
      )}
    </div>
  );
};

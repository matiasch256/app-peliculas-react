import "./Home.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const apikey = "23da33353d9197e847bc2815258c3994";
  const url = `https://api.themoviedb.org/3/search/movie`;
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState(""); // Estado para controlar la búsqueda real
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetchMovies();
    }
  }, [currentPage, query]); // Solo ejecuta la búsqueda si query tiene un valor

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search); // Guardamos el término de búsqueda real
    setCurrentPage(1);
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${url}?api_key=${apikey}&query=${query}&page=${currentPage}&language=es-ES`
      );
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); // Cambiar la página actual
    }
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
        <>
          <div className="movie-list">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <button
                  className="movie-button"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Paginación: solo se muestra si hay resultados */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      ) : (
        <p>No hay películas para mostrar</p>
      )}
    </div>
  );
};

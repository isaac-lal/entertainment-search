import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './index.css';
import SearchIcon from './search.svg';

const API_URL = `https://www.omdbapi.com?apikey=${
  import.meta.env.VITE_OMDB_API_KEY
}`;

{
  /*}
const movie1 = {
  Title: 'Inception',
  Year: '2014',
  imdbID: 'tt7321322',
  Type: 'movie',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BYWJmYWJmNWMtZTBmNy00M2MzLTg5ZWEtOGU5ZWRiYTE0ZjVmXkEyXkFqcGdeQXVyNzkyOTM2MjE@._V1_SX300.jpg',
};
*/
}
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async title => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies('Inception');
  }, []);

  return (
    <>
      <div className='app'>
        <h1>Entertainment Search</h1>

        <div className='search'>
          <input
            type='text'
            placeholder='Search for some movies!'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt='search'
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className='container'>
            {movies.map(movie => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

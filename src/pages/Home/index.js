import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'

//https://api.themoviedb.org/3/movie/550?api_key=ca1e97b5004933d7a699ea4443c48570

function Home () {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadMovies() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: 'ca1e97b5004933d7a699ea4443c48570',
                    language: 'pt-BR',
                    page: 1
                }
            })

            setMovies(response.data.results.slice(0,10));
            setLoading(false);
        }

        loadMovies();
    }, [])

    if(loading) {
        return (
            <div className="loading">
                <h2>Carregando....</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="list-movies">
                {movies.map((movie) => {
                    return(
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Movie Illustration"/>
                            <Link to={`/movie/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}


export default Home;
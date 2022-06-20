import './favorites.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favorites() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const listFavorites = localStorage.getItem("@primeflix");

        setMovies(JSON.parse(listFavorites) || []);
    }, [])

   function deleteMovie(id) {
    
    let filterMovies = movies.filter((item) => {
        return(item.id !== id)
    })

    setMovies(filterMovies);

    const listFavorites = localStorage.setItem("@primeflix", JSON.stringify(filterMovies));
    toast.success("Item deletado com sucesso!")
   }


    return (
        <div className='my-movies'>
            <h1>Meus Filmes</h1>

            {movies.length === 0 && <span>Nenhum filme salvo :(</span>}

            <ul>
                {movies.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/movie/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favorites;
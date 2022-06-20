import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

import { toast } from "react-toastify";

import './movie.css';

function Movie () {

    const { id } = useParams();

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`,{
                params: {
                    api_key: 'ca1e97b5004933d7a699ea4443c48570',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", {replace: true})
                return;
            })
        }

        loadMovie();

        return () => {
            console.log("compobnente desmontado")
        }
    }, [navigate,id])


    function saveMovie() {
        const myList = localStorage.getItem("@primeflix");

        let moviesSaved = JSON.parse(myList) || [];

        const hasMovie = moviesSaved.some((moviesSaved) => moviesSaved.id == movie.id)

        if(hasMovie){
            toast.warn("Este filme já está salvo!");
            return;
        }

        moviesSaved.push(movie);
        localStorage.setItem("@primeflix", JSON.stringify(moviesSaved));

        toast.success("Filme salvo com sucesso!");
    }

    if(loading) {
        return (
            <div className="movie-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>

            <h3>Sinopse</h3>
            <span>{movie.overview}</span> 

            <strong>Avaliação: {movie.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}


export default Movie;
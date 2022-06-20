import axios from "axios";

//Base URL: https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/550?api_key=ca1e97b5004933d7a699ea4443c48570


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})


export default api;



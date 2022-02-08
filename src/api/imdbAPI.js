import axios from "axios";

export default axios.create({
    method: "POST",
    baseURL: "https://imdb-api.com/en/API/",
})
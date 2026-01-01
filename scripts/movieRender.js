const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const API_KEY = "52dc8baf03d31421eb118edb33d5d038";
const URL_BASE = "https://api.themoviedb.org/3";

async function obtenerPeliculaPorId(id) {

    try {
        const response = await fetch(
            `${URL_BASE}/movie/${id}?api_key=${API_KEY}&language=es-ES`
        );

        if (!response.ok) {
            throw new Error("No se pudo obtener la película");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

// RENDERIZAR PELICULA

function renderizarPelicula(movie) {

    document.querySelector(".selected-movie__bg-img").src =
        `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    document.querySelector(".selected-movie__poster").src =
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    document.querySelector(".selected-movie__title h2").textContent =
        movie.title;

    document.querySelector(".selected-movie__title h3").textContent =
        `${movie.release_date} • ${movie.genres.map(g => g.name).join(" - ")} • Duración: ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

    document.querySelector(".selected-movie__description p").textContent =
        movie.overview;
}

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    if(!movieId) return;

    const movie = await obtenerPeliculaPorId(movieId);
    
    if(movie) {
        renderizarPelicula(movie);
    }
    else{
        alert("No se pudo obtener la pelicula");
    }
});
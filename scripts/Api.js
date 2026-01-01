const API_KEY = "52dc8baf03d31421eb118edb33d5d038";
const URL_BASE = "https://api.themoviedb.org/3";

document.addEventListener("DOMContentLoaded", async () => {

// PETICION A LA API
    async function obtenerDatos() {

    try{
    const response = await fetch(`${URL_BASE}/movie/popular?api_key=${API_KEY}&language=es-ES`);

    if(!response.ok) {
        throw new Error("Error al obtener los datos");
    }

    const data = await response.json();
    console.log(data);
    return data.results;

    } catch (error) {
        console.log(error);
    }
}

    const movies = await obtenerDatos();


// INSERTAR PELICULAS EN LA PAGINA

document.getElementsByClassName("movies__list")[0].innerHTML = movies.map((movie) => `
    <div class="movies__list-item">
        <a href="page/movie.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h2 class="movies__list-item-title">${movie.title}</h2>
        </a>
    </div>
`).join("");


// BUSCADOR

const searchInput = document.querySelector(".search__input");
const moviesList = document.querySelector(".movies__list");

    async function buscarPeliculas(query) {

        try {
            const response = await fetch(`${URL_BASE}/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES`);

            if(!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            return data.results;
        
            }catch (error) {
            console.log(error);
            return [];
        }
    }

    function renderMovies(movies) {

        moviesList.innerHTML = "";

        movies.forEach(movie => {
            if(!movie.poster_path) return;

            moviesList.innerHTML += `
            <div class="movies__list-item">
                <a href="page/movie.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h2 class="movies__list-item-title">${movie.title}</h2>
                </a>
            </div>
            `;
        })
    }

// Escuchar mientras el usuario escribe

    searchInput.addEventListener("input", async () => {
        const query = searchInput.value.trim();

        if(query.length < 2) {
            moviesList.innerHTML = "";
            return;
        }

        const movies = await buscarPeliculas(query);
        renderMovies(movies);
    });

if(!searchInput.value == "") {
    const movies = await obtenerDatos();
    renderMovies(movies);
}


// PELICULAS ACLAMADAS 


async function obtenerAclamadas() {
    
    try{
        const response = await fetch(`${URL_BASE}/movie/top_rated?api_key=${API_KEY}&language=es-ES`);
    
        if(!response.ok) {
            throw new Error("Error al obtener los datos");
        }
    
        const data = await response.json();
        console.log(data);
        return data.results;
    
        } catch (error) {
            console.log(error);
        }
}

    const aclamadas = await obtenerAclamadas();

    document.getElementsByClassName("aclamadas__list")[0].innerHTML = aclamadas.map((aclamada) => `
        <div class="aclamadas__list-item">
                        <a href="page/movie.html?id=${aclamada.id}">
                        <img src="https://image.tmdb.org/t/p/w300${aclamada.poster_path}">
                        </a>
                    </div>
        `).join("");
});

